import React, { useEffect, useState } from 'react';

// مكوّن صورة ذكي يفرض نسب ثابتة وتنسيق موحّد
export default function SmartImage({
  src,
  alt,
  ratio = '21:9', // 21:9 | 16:9 | 4:3 | 1:1
  priority = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 960px, 1200px',
  ...rest
}) {
  const ratioClass =
    ratio === '16:9' ? 'ar-16-9' :
    ratio === '4:3'  ? 'ar-4-3'  :
    ratio === '1:1'  ? 'ar-1-1'  : 'ar-21-9';

  const [imageSrc, setImageSrc] = useState(src);
  const webpSrc = src.replace(/\.(png|jpe?g)$/i, '.webp');

  useEffect(() => {
    const checkWebPSupport = async () => {
      const webpSupported = await supportsWebP();
      if (webpSupported) {
        // Check if the webp version of the image exists (this might require a server-side check or a more robust asset pipeline)
        // For now, we'll assume if the .webp path exists, it's valid.
        // In a real application, you'd likely have a build step that generates .webp and a manifest, or a server that serves it.
        // Here, we'll just try to use the .webp extension if it's a png or jpg.
        setImageSrc(webpSrc);
      } else {
        setImageSrc(src);
      }
    };
    checkWebPSupport();
  }, [src, webpSrc]);

  // Function to check WebP support (modern browsers usually support it)
  const supportsWebP = async () => {
    if (!self.createImageBitmap) return false;

    const webpData = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAsAAAAAADnAuwrinXCO4H9o+Kz4Q==';
    return createImageBitmap(await fetch(webpData).then(r => r.blob())).then(() => true, () => false);
  };

  return (
    <div className={["media-frame", ratioClass, className].filter(Boolean).join(' ')}>
      <img
        src={imageSrc} // Use the potentially WebP source
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : undefined}
        decoding="async"
        sizes={sizes}
        className="media-img"
        {...rest}
      />
    </div>
  );
}


