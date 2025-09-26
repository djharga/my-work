import React, { useEffect, useState } from 'react';

const ResponsiveOptimizer = ({ children }) => {
  const [screenSize, setScreenSize] = useState('lg');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else setScreenSize('xl');
    };

    const checkTouchDevice = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    updateScreenSize();
    checkTouchDevice();

    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // إضافة classes للـ body بناءً على حجم الشاشة ونوع الجهاز
  useEffect(() => {
    document.body.className = `grad-theme screen-${screenSize} ${isTouch ? 'touch-device' : 'no-touch'}`;
  }, [screenSize, isTouch]);

  return (
    <div className={`responsive-container screen-${screenSize} ${isTouch ? 'touch-enabled' : ''}`}>
      {children}
    </div>
  );
};

export default ResponsiveOptimizer;