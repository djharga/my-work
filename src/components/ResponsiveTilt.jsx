import React, { useState, useEffect } from 'react';
import { Tilt } from 'react-tilt';

// تستخدم العنوان أو أي عنصر child لإضافة تأثير الميل فقط في الشاشات الكبيرة
export default function ResponsiveTilt({ children, options = { max: 15, scale: 1.02, perspective: 1000 } }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const handleChange = (e) => setEnabled(e.matches ?? mq.matches);
    setEnabled(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', handleChange);
    else mq.addListener(handleChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handleChange);
      else mq.removeListener(handleChange);
    };
  }, []);

  // على الموبايل/صغير: يرجع العنصر بدون ميل
  if (!enabled) return <>{children}</>;

  // PC/Desktop: ميل تفاعلي
  return <Tilt options={options}>{children}</Tilt>;
}
