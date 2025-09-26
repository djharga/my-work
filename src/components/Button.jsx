import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ConfirmationModal from './ConfirmationModal';

// ألوان Grad School + تأثيرات محسّنة
const VARIANTS = {
  primary: 'grad-btn-primary bg-grad-primary text-white hover:bg-grad-primary-dark hover:shadow-lg hover:-translate-y-0.5 focus:ring-2 focus:ring-grad-primary focus:ring-opacity-50',
  secondary: 'grad-btn-secondary bg-white border border-grad-primary text-grad-primary hover:bg-grad-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5',
  accent: 'grad-btn-accent bg-grad-accent text-white hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5',
  danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5',
  ghost: 'bg-transparent text-grad-primary hover:bg-grad-gray-50 hover:text-grad-primary-dark'
};

const SIZES = {
  sm: 'px-4 py-2 text-sm font-medium',
  md: 'px-6 py-2.5 text-base font-medium',
  lg: 'px-8 py-3 text-lg font-medium',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  onClick,
  type = 'button',
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ariaLabel,
  skipConfirm = false,
  ...rest
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingTo, setPendingTo] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();

  const handleInternalClick = (e) => {
    if (onClick) onClick(e);

    if (variant === 'primary' && to && !skipConfirm) {
      e.preventDefault?.();
      setPendingTo(to);
      setModalOpen(true);
      return;
    }
  };

  const handleProceed = () => {
    setModalOpen(false);
    if (pendingTo) navigate(pendingTo);
  };

  const base = `
    grad-btn relative inline-flex items-center justify-center gap-2.5 
    rounded-lg font-semibold 
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    select-none
    overflow-hidden
    transform
  `;
  
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  const classes = [base, variantClass, sizeClass, widthClass, disabledClass, className]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ');

  const content = (
    <>
      {leftIcon && (
        <span className="flex items-center text-current opacity-80">
          {leftIcon}
        </span>
      )}
      <span className="whitespace-nowrap">{children}</span>
      {rightIcon && (
        <span className="flex items-center text-current opacity-80">
          {rightIcon}
        </span>
      )}
    </>
  );

  const renderAsLink = to && !disabled;

  const buttonOrLink = renderAsLink ? (
    <Link 
      to={to} 
      className={classes} 
      aria-label={ariaLabel} 
      onClick={handleInternalClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      {...rest}
    >
      <motion.span 
        animate={{ 
          scale: isPressed ? 0.98 : 1 
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className="flex items-center gap-2.5 relative z-10"
      >
        {content}
      </motion.span>
    </Link>
  ) : (
    <button
      type={type}
      onClick={handleInternalClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      aria-label={ariaLabel}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      <motion.span 
        animate={{ 
          scale: isPressed ? 0.98 : 1 
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className="flex items-center gap-2.5 relative z-10"
      >
        {content}
      </motion.span>
    </button>
  );

  return (
    <>
      {buttonOrLink}
      <ConfirmationModal
        open={modalOpen}
        title="تأكيد التنقل"
        message="أنت على وشك مغادرة هذه الصفحة. هل أنت متأكد أنك تريد المتابعة؟"
        onClose={() => setModalOpen(false)}
        onProceed={handleProceed}
      />
    </>
  );
}