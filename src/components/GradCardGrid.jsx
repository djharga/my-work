import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GradCard from './GradCard';

const GradCardGrid = ({ 
  cards, 
  columns = 3, 
  gap = 'default',
  animated = true,
  className = '' 
}) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = gridRef.current?.querySelectorAll('.grad-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [animated]);

  const gapClasses = {
    sm: 'gap-4',
    default: 'gap-6',
    lg: 'gap-8'
  };

  const columnClasses = {
    1: 'grad-grid-cols-1',
    2: 'grad-grid-cols-1 md:grad-grid-cols-2',
    3: 'grad-grid-cols-1 md:grad-grid-cols-2 lg:grad-grid-cols-3',
    4: 'grad-grid-cols-1 md:grad-grid-cols-2 lg:grad-grid-cols-4'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={gridRef}
      variants={animated ? containerVariants : {}}
      initial={animated ? "hidden" : false}
      animate={animated ? "visible" : false}
      className={`grad-grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id || index}
          variants={animated ? cardVariants : {}}
          className="scroll-reveal"
        >
          <GradCard
            hover={true}
            shadow="default"
            className="h-full"
          >
            {card.image && (
              <div className="grad-image mb-4 overflow-hidden rounded-lg">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            )}
            
            <GradCard.Title className="mb-3">
              {card.title}
            </GradCard.Title>
            
            <GradCard.Description className="mb-4">
              {card.description}
            </GradCard.Description>
            
            {card.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {card.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-xs font-medium bg-grad-gray-100 text-grad-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {card.action && (
              <GradCard.Footer>
                <button className="grad-btn grad-btn-primary w-full">
                  {card.action.text}
                </button>
              </GradCard.Footer>
            )}
          </GradCard>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GradCardGrid;