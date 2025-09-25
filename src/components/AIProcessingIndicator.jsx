import React from 'react';
import { motion } from 'framer-motion';

// تعريف الرسوم المتحركة الافتراضية لتحسين القابلية للقراءة
const defaultPulseAnimation = {
  scale: [1, 1.25, 1, 1.12, 1],
  boxShadow: [
    '0 0 0 0 rgba(91,107,128,0.10)',
    '0 0 0 16px rgba(91,107,128,0.12)',
    '0 0 0 0 rgba(91,107,128,0.18)',
    '0 0 0 8px rgba(91,107,128,0.15)',
    '0 0 0 0 rgba(91,107,128,0.13)'
  ],
  rotate: [0, -10, 10, -6, 0],
  opacity: [1, 0.85, 1, 0.94, 1]
};

// تعريف الانتقال الافتراضي
const defaultTransition = {
  duration: 2.6,
  repeat: Infinity,
  ease: 'easeInOut'
};

/**
 * مكون مرن لعرض مؤشر معالجة الذكاء الاصطناعي.
 * @param {object} props - الخصائص.
 * @param {object} [props.animate=defaultPulseAnimation] - كائن الرسوم المتحركة لـ framer-motion.
 * @param {object} [props.transition=defaultTransition] - كائن الانتقال لـ framer-motion.
 * @param {string} [props.text='...جاري التحليل بالذكاء الاصطناعي'] - النص الذي سيتم عرضه.
 * @param {number} [props.size=16] - حجم المؤشر (يؤثر على العرض والارتفاع).
 * @param {string} [props.className] - فئات CSS إضافية للحاوية.
 */
export default function AIProcessingIndicator({ 
  animate = defaultPulseAnimation, 
  transition = defaultTransition,
  text = '...جاري التحليل بالذكاء الاصطناعي',
  size = 16,
  className = ''
}) {
  const sizeClasses = `w-${size} h-${size}`;

  return (
    <div className={`flex flex-col items-center justify-center space-y-5 py-7 ${className}`}>
      <motion.div
        animate={animate}
        transition={transition}
        className={`${sizeClasses} bg-gradient-to-br from-khuta-secondary-400 via-khuta-secondary-200 to-khuta-secondary-600 rounded-full shadow-lg`}
      />
      <p className="text-khuta-neutral-600 text-lg font-medium">{text}</p>
    </div>
  );
}
