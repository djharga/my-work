import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLazyLoad } from '../hooks/usePerformanceMonitor';

// مكوّن صورة ذكي يفرض نسب ثابتة وتنسيق موحّد مع تحميل مؤجل
const SmartImage = React.memo(({
  src,
  alt,
  ratio = '21:9', // 21:9 | 16:9 | 4:3 | 1:1
  priority = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 960px, 1200px',
  lazy = true,
  ...rest
}) => {
  const ratioClass =
    ratio === '16:9' ? 'ar-16-9' :
    ratio === '4:3'  ? 'ar-4-3'  :
    ratio === '1:1'  ? 'ar-1-1'  : 'ar-21-9';

  const [imageSrc, setImageSrc] = useState(priority || !lazy ? src : null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const webpSrc = src.replace(/\.(png|jpe?g)$/i, '.webp');

  // Function to check WebP support (modern browsers usually support it)
  const supportsWebP = useCallback(async () => {
    if (!self.createImageBitmap) return false;
    const webpData = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAsAAAAAADnAuwrinXCO4H9o+Kz4Q==';
    try {
      await createImageBitmap(await fetch(webpData).then(r => r.blob()));
      return true;
    } catch {
      return false;
    }
  }, []);

  const loadImage = useCallback(async () => {
    if (!imageSrc) {
      const webpSupported = await supportsWebP();
      const targetSrc = webpSupported ? webpSrc : src;
      
      const img = new Image();
      img.onload = () => {
        setImageSrc(targetSrc);
        setIsLoaded(true);
      };
      img.onerror = () => {
        if (webpSupported && targetSrc === webpSrc) {
          // Fallback to original format
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
          };
          fallbackImg.onerror = () => setHasError(true);
          fallbackImg.src = src;
        } else {
          setHasError(true);
        }
      };
      img.src = targetSrc;
    }
  }, [src, webpSrc, imageSrc, supportsWebP]);

  const lazyRef = useLazyLoad(loadImage, { rootMargin: '100px' });

  useEffect(() => {
    if (priority || !lazy) {
      loadImage();
    }
  }, [loadImage, priority, lazy]);

  return (
    <div 
      ref={lazy && !priority ? lazyRef : null}
      className={["media-frame", ratioClass, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {hasError ? (
        <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500 text-sm">
          فشل في تحميل الصورة
        </div>
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="media-img"
          style={{
            opacity: isLoaded ? 1 : 0.7,
            transition: 'opacity 0.3s ease-in-out',
          }}
          onLoad={() => setIsLoaded(true)}
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
});

SmartImage.displayName = 'SmartImage';

export default SmartImage;