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

  const cardBaseStyles = "w-80 md:w-96 bg-white rounded-2xl shadow-lg border border-khuta-neutral-200 p-6 text-right transition-shadow duration-300 relative";
  const cardHoverStyles = "hover:shadow-xl";
  const decorativeElementStyles = "before:absolute before:left-6 before:top-6 before:w-5 before:h-5 before:bg-gradient-to-br before:from-khuta-accent-100 before:to-khuta-primary-50 before:rounded-full before:blur-lg before:opacity-30";

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
        <h3 className="font-bold text-lg mb-2 text-khuta-primary-700">{item.title}</h3>
        <p className="text-base text-khuta-neutral-700">{item.subtitle}</p>
      </div>
    </motion.div>
  );
}
