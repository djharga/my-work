import React, { useEffect, useRef, useState } from 'react';

/*
  FluidBackground.jsx (مطور)
  - خلفية تفاعلية متطورة باستخدام WebGL2 (مع دعم WebGL1).
  - تأثيرات سائلة ديناميكية مع دعم تعدد اللمس، ألوان متغيرة، وضبط تلقائي للأداء.
  - يدعم التخصيص عبر props: enabled, pixelRatio, colorScheme, intensity, speed.
  - متوافق مع جميع الشاشات ويعيد ضبط نفسه تلقائياً عند تغيير الحجم أو الدقة.
*/

const DEFAULT_COLOR_SCHEMES = [
  // ألوان متدرجة حديثة
  [[0.0, 0.6, 0.9], [0.9, 0.4, 0.6], [0.2, 0.9, 0.5]],
  [[0.8, 0.2, 0.2], [0.2, 0.8, 0.7], [0.9, 0.8, 0.2]],
  [[0.1, 0.1, 0.2], [0.2, 0.5, 0.9], [0.8, 0.3, 0.7]],
];

function randomColor(scheme) {
  const c = scheme[Math.floor(Math.random() * scheme.length)];
  // slight randomization for organic look
  return c.map(v => Math.min(1, Math.max(0, v + (Math.random() - 0.5) * 0.15)));
}

export default function FluidBackground({
  enabled = true,
  pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
  colorScheme = DEFAULT_COLOR_SCHEMES[0],
  intensity = 1.0,
  speed = 1.0,
  className = "absolute inset-0 w-full h-full -z-10"
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const pointersRef = useRef([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = canvas.getContext('webgl2', { antialias: false, alpha: true }) ||
             canvas.getContext('webgl', { antialias: false, alpha: true });
    if (!gl) return;

    const isWebGL2 = !!(gl && gl.createTexture && gl.texImage2D && gl.getExtension && (typeof WebGL2RenderingContext !== "undefined" ? gl instanceof WebGL2RenderingContext : true));

    // Shader helpers
    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const err = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error('Shader compile error: ' + err);
      }
      return shader;
    }
    function createProgram(vsSrc, fsSrc) {
      const vs = compileShader(gl.VERTEX_SHADER, vsSrc);
      const fs = compileShader(gl.FRAGMENT_SHADER, fsSrc);
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const err = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error('Program link error: ' + err);
      }
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return program;
    }

    // Fullscreen quad
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    // Vertex shader (shared)
    const VERTEX_SHADER = isWebGL2 ? `#version 300 es
    precision highp float;
    in vec2 aPosition;
    out vec2 vUv;
    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }` : `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }`;

    // Fragment shader: update (advect + splat + decay + noise)
    const UPDATE_FS = isWebGL2 ? `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D uPrev;
    uniform vec2 uPointer;
    uniform float uRadius;
    uniform vec3 uSplatColor;
    uniform float uStrength;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uIntensity;
    uniform float uSpeed;
    float rand(vec2 p) { return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453123); }
    void main() {
      vec2 uv = vUv;
      float t = uTime * 0.0005 * uSpeed;
      vec2 field = vec2(
        sin((uv.y + t) * 6.2831) * 0.002 * uIntensity,
        cos((uv.x - t) * 6.2831) * 0.002 * uIntensity
      );
      vec2 srcUv = uv - field;
      vec4 prev = texture(uPrev, srcUv);
      float n = (rand(uv * uResolution.xy + t) - 0.5) * 0.008 * uIntensity;
      prev.rgb += n;
      float d = distance(uv, uPointer);
      float splat = exp(-d * d / (uRadius * uRadius));
      prev.rgb += uSplatColor * (splat * uStrength * uIntensity);
      prev *= 0.994 - 0.002 * uIntensity;
      prev = clamp(prev, 0.0, 1.0);
      outColor = prev;
    }` : `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uPrev;
    uniform vec2 uPointer;
    uniform float uRadius;
    uniform vec3 uSplatColor;
    uniform float uStrength;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uIntensity;
    uniform float uSpeed;
    float rand(vec2 p) { return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453123); }
    void main() {
      vec2 uv = vUv;
      float t = uTime * 0.0005 * uSpeed;
      vec2 field = vec2(
        sin((uv.y + t) * 6.2831) * 0.002 * uIntensity,
        cos((uv.x - t) * 6.2831) * 0.002 * uIntensity
      );
      vec2 srcUv = uv - field;
      vec4 prev = texture2D(uPrev, srcUv);
      float n = (rand(uv * uResolution.xy + t) - 0.5) * 0.008 * uIntensity;
      prev.rgb += n;
      float d = distance(uv, uPointer);
      float splat = exp(-d * d / (uRadius * uRadius));
      prev.rgb += uSplatColor * (splat * uStrength * uIntensity);
      prev *= 0.994 - 0.002 * uIntensity;
      prev = clamp(prev, 0.0, 1.0);
      gl_FragColor = prev;
    }`;

    // Fragment shader: render to screen with color mapping and bloom
    const RENDER_FS = isWebGL2 ? `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D uTexture;
    uniform float uTime;
    void main() {
      vec4 c = texture(uTexture, vUv);
      float v = dot(c.rgb, vec3(0.333));
      // animated color palette
      float t = uTime * 0.0002;
      vec3 base = mix(vec3(0.02, 0.07, 0.12), vec3(0.0, 0.6, 0.9), smoothstep(0.05, 0.8, v));
      vec3 accent = vec3(0.7 + 0.3*sin(t), 0.5 + 0.5*cos(t*1.3), 0.8 + 0.2*sin(t*0.7));
      vec3 col = mix(base, accent, pow(v, 2.0) * 0.5);
      // bloom effect
      float bloom = smoothstep(0.7, 1.0, v) * 0.25;
      col += bloom;
      outColor = vec4(col, 1.0);
    }` : `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    void main() {
      vec4 c = texture2D(uTexture, vUv);
      float v = dot(c.rgb, vec3(0.333));
      float t = uTime * 0.0002;
      vec3 base = mix(vec3(0.02, 0.07, 0.12), vec3(0.0, 0.6, 0.9), smoothstep(0.05, 0.8, v));
      vec3 accent = vec3(0.7 + 0.3*sin(t), 0.5 + 0.5*cos(t*1.3), 0.8 + 0.2*sin(t*0.7));
      vec3 col = mix(base, accent, pow(v, 2.0) * 0.5);
      float bloom = smoothstep(0.7, 1.0, v) * 0.25;
      col += bloom;
      gl_FragColor = vec4(col, 1.0);
    }`;

    // Compile programs
    let updateProgram, renderProgram;
    try {
      updateProgram = createProgram(VERTEX_SHADER, UPDATE_FS);
      renderProgram = createProgram(VERTEX_SHADER, RENDER_FS);
    } catch (e) {
      console.error('FluidBackground shader error', e);
      return;
    }

    // Attribute/uniform locations
    const updateAttrib = gl.getAttribLocation(updateProgram, 'aPosition');
    const renderAttrib = gl.getAttribLocation(renderProgram, 'aPosition');
    // Uniforms for update
    const uPrevLoc = gl.getUniformLocation(updateProgram, 'uPrev');
    const uPointerLoc = gl.getUniformLocation(updateProgram, 'uPointer');
    const uRadiusLoc = gl.getUniformLocation(updateProgram, 'uRadius');
    const uSplatColorLoc = gl.getUniformLocation(updateProgram, 'uSplatColor');
    const uStrengthLoc = gl.getUniformLocation(updateProgram, 'uStrength');
    const uTimeLoc = gl.getUniformLocation(updateProgram, 'uTime');
    const uResolutionLoc = gl.getUniformLocation(updateProgram, 'uResolution');
    const uIntensityLoc = gl.getUniformLocation(updateProgram, 'uIntensity');
    const uSpeedLoc = gl.getUniformLocation(updateProgram, 'uSpeed');
    // Uniforms for render
    const uTextureLoc = gl.getUniformLocation(renderProgram, 'uTexture');
    const uTimeRenderLoc = gl.getUniformLocation(renderProgram, 'uTime');

    // Create two textures + FBOs for ping-pong
    function createTexture(w, h) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      return tex;
    }
    function createFBO(w, h) {
      const tex = createTexture(w, h);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return { fbo, tex, w, h };
    }

    let width = Math.max(32, Math.floor(canvas.clientWidth * pixelRatio));
    let height = Math.max(32, Math.floor(canvas.clientHeight * pixelRatio));
    let fboA = createFBO(width, height);
    let fboB = createFBO(width, height);
    let ping = fboA, pong = fboB;

    function resize() {
      width = Math.max(32, Math.floor(canvas.clientWidth * pixelRatio));
      height = Math.max(32, Math.floor(canvas.clientHeight * pixelRatio));
      [fboA, fboB].forEach(f => {
        gl.bindTexture(gl.TEXTURE_2D, f.tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        f.w = width; f.h = height;
      });
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    function setCanvasSize() {
      const dpr = pixelRatio;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    setCanvasSize();

    // VAO/attrib
    function setupAttrib(program, attrib) {
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(attrib);
      gl.vertexAttribPointer(attrib, 2, gl.FLOAT, false, 0, 0);
    }

    // Helpers
    function bindFBO(fbo) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.fbo);
      gl.viewport(0, 0, fbo.w, fbo.h);
    }
    function drawFullscreen(program) {
      gl.useProgram(program);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    // Clear initial textures
    gl.bindFramebuffer(gl.FRAMEBUFFER, ping.fbo);
    gl.clearColor(0.02, 0.02, 0.03, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, pong.fbo);
    gl.clearColor(0.02, 0.02, 0.03, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // Time tracking
    const startTime = performance.now();

    // Main loop
    function frame() {
      const t = performance.now() - startTime;

      // --- Update pass ---
      bindFBO(pong);
      gl.useProgram(updateProgram);
      setupAttrib(updateProgram, updateAttrib);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, ping.tex);
      gl.uniform1i(uPrevLoc, 0);

      // pointer (multi-splat: combine all active pointers for richer effect)
      let pointer = { x: -10, y: -10, radius: 0.08, color: [0,0,0], strength: 0 };
      if (pointersRef.current.length) {
        // combine all splats
        pointer = pointersRef.current.reduce((acc, pt) => ({
          x: acc.x + pt.x,
          y: acc.y + pt.y,
          radius: Math.max(acc.radius, pt.radius),
          color: [acc.color[0] + pt.color[0], acc.color[1] + pt.color[1], acc.color[2] + pt.color[2]],
          strength: acc.strength + pt.strength
        }), { x:0, y:0, radius:0, color:[0,0,0], strength:0 });
        const n = pointersRef.current.length;
        pointer.x /= n; pointer.y /= n;
        pointer.color = pointer.color.map(c => c / n);
        pointer.strength /= n;
      }
      gl.uniform2f(uPointerLoc, pointer.x, pointer.y);
      gl.uniform1f(uRadiusLoc, pointer.radius);
      gl.uniform3f(uSplatColorLoc, pointer.color[0], pointer.color[1], pointer.color[2]);
      gl.uniform1f(uStrengthLoc, pointer.strength);
      gl.uniform1f(uTimeLoc, t);
      gl.uniform2f(uResolutionLoc, ping.w, ping.h);
      gl.uniform1f(uIntensityLoc, intensity);
      gl.uniform1f(uSpeedLoc, speed);

      drawFullscreen(updateProgram);

      // swap
      const temp = ping; ping = pong; pong = temp;

      // --- Render pass ---
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(renderProgram);
      setupAttrib(renderProgram, renderAttrib);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, ping.tex);
      gl.uniform1i(uTextureLoc, 0);
      if (uTimeRenderLoc) gl.uniform1f(uTimeRenderLoc, t);

      drawFullscreen(renderProgram);

      // fade out splats gradually
      if (pointersRef.current.length) {
        pointersRef.current = pointersRef.current.map(pt => ({ ...pt, strength: pt.strength * 0.92 }));
        while (pointersRef.current.length && pointersRef.current[0].strength < 0.01) pointersRef.current.shift();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    // Interaction: mouse/touch/multi-touch
    function addPointer(clientX, clientY, color = [0.0, 0.6, 0.9], radius = 0.12, strength = 0.75) {
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      pointersRef.current.push({ x, y, radius, color, strength });
      if (pointersRef.current.length > 8) pointersRef.current.shift();
    }

    function onPointerMove(e) {
      setIsActive(true);
      if (e.touches) {
        for (let i = 0; i < e.touches.length; ++i) {
          const t = e.touches[i];
          addPointer(t.clientX, t.clientY, randomColor(colorScheme), 0.13, 0.8 * intensity);
        }
      } else {
        // color by modifier key for fun
        let color = randomColor(colorScheme);
        if (e.altKey) color = [0.9, 0.9, 0.2];
        if (e.shiftKey) color = [0.2, 0.9, 0.9];
        addPointer(e.clientX, e.clientY, color, 0.14, 0.9 * intensity);
      }
    }
    function onPointerDown(e) {
      setIsActive(true);
      onPointerMove(e);
    }
    function onPointerUp() {
      setIsActive(false);
    }

    canvas.addEventListener('mousemove', onPointerMove, { passive: true });
    canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    canvas.addEventListener('mousedown', onPointerDown, { passive: true });
    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    canvas.addEventListener('mouseup', onPointerUp, { passive: true });
    canvas.addEventListener('touchend', onPointerUp, { passive: true });

    // Resize observer
    const ro = new ResizeObserver(() => {
      setCanvasSize();
      resize();
    });
    ro.observe(canvas);

    // Cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('touchmove', onPointerMove);
      canvas.removeEventListener('mousedown', onPointerDown);
      canvas.removeEventListener('touchstart', onPointerDown);
      canvas.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('touchend', onPointerUp);
      ro.disconnect();
      try {
        gl.deleteBuffer(quadBuffer);
        [fboA, fboB].forEach(f => {
          if (f) {
            gl.deleteTexture(f.tex);
            gl.deleteFramebuffer(f.fbo);
          }
        });
        gl.deleteProgram(updateProgram);
        gl.deleteProgram(renderProgram);
      } catch (e) {}
    };
  }, [enabled, pixelRatio, colorScheme, intensity, speed]);

  // Canvas overlay: show a subtle hint when active
  return (
    <div className={className} style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-hidden="true"
        style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'auto', background: 'transparent' }}
      />
      {/* مؤشر تفاعلي عند السحب */}
      {isActive && (
        <div style={{
          position: 'absolute',
          left: 0, top: 0, right: 0, bottom: 0,
          pointerEvents: 'none',
          zIndex: 10,
          background: 'radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.08) 0%, transparent 80%)',
          transition: 'background 0.2s'
        }} />
      )}
    </div>
  );
}