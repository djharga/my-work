import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, value, label, suffix = '', animated = true }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!animated || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateValue();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [animated, hasAnimated]);

  const animateValue = () => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, numericValue);
      setDisplayValue(Math.floor(current));

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(numericValue);
      }
    }, duration / steps);
  };

  const formattedValue = animated && hasAnimated ? displayValue : parseInt(value.replace(/[^0-9]/g, ''));

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grad-card text-center p-6 hover:shadow-xl transition-all duration-300 group"
    >
      {icon && (
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-grad-primary/10 text-grad-primary group-hover:bg-grad-primary group-hover:text-white transition-all duration-300">
          {icon}
        </div>
      )}
      
      <div className="text-3xl md:text-4xl font-bold text-grad-primary mb-2 group-hover:scale-110 transition-transform duration-300">
        {formattedValue.toLocaleString()}{suffix}
      </div>
      
      <div className="text-grad-gray-600 font-medium">
        {label}
      </div>
    </motion.div>
  );
};

const GradStats = ({ 
  stats, 
  title, 
  subtitle, 
  columns = 4,
  animated = true,
  className = '' 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const columnClasses = {
    2: 'grad-grid-cols-1 md:grad-grid-cols-2',
    3: 'grad-grid-cols-1 md:grad-grid-cols-3',
    4: 'grad-grid-cols-1 md:grad-grid-cols-2 lg:grad-grid-cols-4'
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="grad-container">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-grad-primary mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-grad-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        <motion.div
          variants={animated ? containerVariants : {}}
          initial={animated ? "hidden" : false}
          animate={animated ? "visible" : false}
          className={`grad-grid ${columnClasses[columns]} gap-6`}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              animated={animated}
            />
          ))}
        </motion.div>
      </div>
      
      {/* خلفية زخرفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-grad-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-grad-accent/10 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default GradStats;