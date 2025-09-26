import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import SmartImage from './SmartImage';

const GradHero = ({ 
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta, 
  image, 
  layout = 'default' 
}) => {
  const heroRef = useRef(null);

  useEffect(() => {
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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={heroRef}
      className="scroll-reveal py-16 md:py-24 bg-gradient-to-br from-grad-bg-secondary to-white"
    >
      <div className="grad-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grad-grid grad-grid-cols-1 lg:grad-grid-cols-2 gap-12 items-center"
        >
          {/* المحتوى النصي */}
          <motion.div 
            variants={itemVariants}
            className="text-right lg:order-1 order-2"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-grad-primary leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-grad-gray-600 mb-8 leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              {primaryCta && (
                <Button 
                  to={primaryCta.link} 
                  variant="primary" 
                  size="lg" 
                  className="min-w-[200px] pulse-glow"
                >
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button 
                  to={secondaryCta.link} 
                  variant="secondary" 
                  size="lg" 
                  className="min-w-[200px]"
                >
                  {secondaryCta.text}
                </Button>
              )}
            </motion.div>
          </motion.div>
          
          {/* الصورة */}
          <motion.div 
            variants={itemVariants}
            className="lg:order-2 order-1"
          >
            <div className="grad-image relative floating-animation">
              <SmartImage 
                src={image.src} 
                alt={image.alt} 
                ratio="16:9" 
                priority 
                className="shadow-2xl rounded-2xl"
              />
              {/* تأثير الإضاءة */}
              <div className="absolute inset-0 bg-gradient-to-tr from-grad-primary/10 to-grad-accent/10 rounded-2xl"></div>
              {/* نقاط زخرفية */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-grad-accent rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-grad-primary rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* خلفية زخرفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-grad-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-grad-accent/5 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default GradHero;