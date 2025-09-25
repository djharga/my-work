import React from 'react';
import { motion } from 'framer-motion';

// تعريف الطبقات كبيانات لتسهيل الإدارة والتخصيص
const layers = [
  {
    id: 'layer1',
    className: "absolute -left-20 -top-16 w-[60rem] h-[40rem] bg-gradient-to-r from-[rgba(58,142,196,0.35)] via-[rgba(123,65,255,0.28)] to-[rgba(99,102,241,0.2)] rounded-full blur-3xl opacity-70 animate-aurora-slow",
    initial: { x: 0, y: 0 },
    animate: { x: [0, 20, -10, 20, 0], y: [0, -15, 10, -15, 0] },
    transition: { duration: 40, repeat: Infinity, ease: 'easeInOut' }
  },
  {
    id: 'layer2',
    className: "absolute right-0 top-10 w-[48rem] h-[36rem] bg-gradient-to-r from-[rgba(99,102,241,0.18)] via-[rgba(6,182,212,0.22)] to-[rgba(34,197,94,0.12)] rounded-full blur-3xl opacity-60 animate-aurora-slower",
    initial: { x: 0, y: 0 },
    animate: { x: [0, -15, 10, -15, 0], y: [0, 20, -10, 20, 0] },
    transition: { duration: 55, repeat: Infinity, ease: 'easeInOut' }
  },
  {
    id: 'layer3',
    className: "absolute left-1/4 bottom-0 w-[80rem] h-[28rem] bg-gradient-to-r from-[rgba(255,183,197,0.06)] via-[rgba(147,51,234,0.06)] to-[rgba(6,182,212,0.06)] rounded-full blur-2xl opacity-50 animate-aurora-subtle",
    initial: { x: 0, y: 0 },
    animate: { x: [0, 10, -5, 10, 0], y: [0, -10, 5, -10, 0] },
    transition: { duration: 70, repeat: Infinity, ease: 'linear' }
  }
];

/**
 * مكون لعرض خلفية أورورا متحركة وقابلة للتخصيص.
 * @param {object} props - الخصائص.
 * @param {string} [props.className] - فئات CSS إضافية للحاوية.
 * @param {Array<object>} [props.customLayers=layers] - مصفوفة من كائنات الطبقات المخصصة.
 */
export default function AuroraBackground({ className = '', customLayers = layers }) {
  return (
    <div aria-hidden className={`absolute inset-0 -z-10 pointer-events-none overflow-hidden ${className}`}>
      {customLayers.map(layer => (
        <motion.div
          key={layer.id}
          className={layer.className}
          initial={layer.initial}
          animate={layer.animate}
          transition={layer.transition}
        />
      ))}
    </div>
  );
}