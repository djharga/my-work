import React, { useState } from 'react';

export default function FallbackImage({
  src,
  alt = '',
  className = '',
  size = 64,
  initials,
  bgColor = 'var(--muted-accent)'
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const initialsText = initials ? initials.slice(0, 2).toUpperCase() : 'خ';

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center rounded-full overflow-hidden ${className}`}
        style={{ width: size, height: size, background: bgColor }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
          <circle cx={size / 2} cy={size / 2} r={size / 2} fill="rgba(255,255,255,0.06)" />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#fff"
            fontSize={Math.floor(size / 2.8)}
            fontFamily="Tajawal, Cairo, sans-serif"
          >
            {initialsText}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      {!loaded && !error && (
        <div className="w-full h-full bg-gray-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover ${loaded ? '' : 'hidden'}`}
        draggable={false}
      />
    </div>
  );
}
