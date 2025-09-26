import React from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';

const FLICK_OFFSET_THRESHOLD = 140;
const FLICK_VELOCITY_THRESHOLD = 600;

export default function Card({ item, onFlick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useTransform(x, [-300, 300], [18, -18]);
  const rotateX = useTransform(y, [-150, 150], [7, -7]);
  const controls = useAnimation();

  async function handleDragEnd(_, info) {
    const offsetX = info.offset.x || 0;
    const velocityX = info.velocity.x || 0;
    const shouldFlick = Math.abs(offsetX) > FLICK_OFFSET_THRESHOLD || Math.abs(velocityX) > FLICK_VELOCITY_THRESHOLD;

    if (shouldFlick) {
      const dir = Math.sign(offsetX || velocityX) || 1;
      await controls.start({ x: dir * 1300, opacity: 0, transition: { duration: 0.4 } });
      if (typeof onFlick === 'function') onFlick(item.id);
    } else {
      controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 240, damping: 30 } });
    }
  }

  const cardBaseStyles = "grad-card w-80 md:w-96 bg-white rounded-xl shadow-md border border-grad-gray-200 p-6 text-right transition-all duration-300 relative";
  const cardHoverStyles = "hover:shadow-xl hover:-translate-y-1 hover:border-grad-gray-300";
  const decorativeElementStyles = "before:absolute before:left-6 before:top-6 before:w-4 before:h-4 before:bg-gradient-to-br before:from-grad-accent before:to-grad-primary before:rounded-full before:blur-sm before:opacity-20";

  const combinedClasses = [
    cardBaseStyles,
    cardHoverStyles,
    decorativeElementStyles
  ].join(' ');

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ x, y, rotateY, rotateX }}
      drag="x"
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.16}
      onDragEnd={handleDragEnd}
      animate={controls}
      whileTap={{ scale: 0.97 }}
      role="article"
      aria-label={item.title}
    >
      <div className={combinedClasses}>
        <h3 className="font-bold text-xl mb-3 text-grad-primary">{item.title}</h3>
        <p className="text-base text-grad-gray-600 leading-relaxed">{item.subtitle}</p>
      </div>
    </motion.div>
  );
}
