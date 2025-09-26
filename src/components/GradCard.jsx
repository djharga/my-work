import React from 'react';
import { motion } from 'framer-motion';

const GradCard = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'default',
  shadow = 'default',
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const baseClasses = `
    grad-card
    bg-white 
    rounded-xl 
    border border-grad-gray-200 
    transition-all duration-300 ease-in-out
    ${shadowClasses[shadow]}
    ${paddingClasses[padding]}
    ${hover ? 'hover:shadow-xl hover:-translate-y-1 hover:border-grad-gray-300' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { scale: 1.02 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// مكونات فرعية للبطاقة
const GradCardHeader = ({ children, className = '' }) => (
  <div className={`grad-card-header pb-4 mb-4 border-b border-grad-gray-200 ${className}`}>
    {children}
  </div>
);

const GradCardBody = ({ children, className = '' }) => (
  <div className={`grad-card-body ${className}`}>
    {children}
  </div>
);

const GradCardFooter = ({ children, className = '' }) => (
  <div className={`grad-card-footer pt-4 mt-4 border-t border-grad-gray-200 bg-grad-gray-50 -m-6 mt-4 p-6 rounded-b-xl ${className}`}>
    {children}
  </div>
);

const GradCardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-grad-primary mb-2 ${className}`}>
    {children}
  </h3>
);

const GradCardDescription = ({ children, className = '' }) => (
  <p className={`text-grad-gray-600 leading-relaxed ${className}`}>
    {children}
  </p>
);

// تصدير المكونات
GradCard.Header = GradCardHeader;
GradCard.Body = GradCardBody;
GradCard.Footer = GradCardFooter;
GradCard.Title = GradCardTitle;
GradCard.Description = GradCardDescription;

export default GradCard;