import React from 'react';

export default function GenerativeBackground({ className = '' }) {
  return (
    <div
      className={`absolute inset-0 -z-20 pointer-events-none overflow-hidden ${className}`}
      aria-hidden
    >
      {/* مبتكر: طبقات هادئة من التدرجات الدائرية مع حركة عصرية ناعمة */}
      <div
        className="absolute -left-24 -top-32 w-[110rem] h-[70rem] rounded-full"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 30% 40%, #b6eada 0%, #f7fafc 80%, transparent 100%)',
          opacity: 0.55,
          filter: 'blur(8px)',
          animation: 'gentleMove1 22s ease-in-out infinite alternate',
          willChange: 'transform, opacity',
        }}
      />
      <div
        className="absolute right-[-10rem] top-16 w-[80rem] h-[60rem] rounded-full"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 70% 30%, #aee2ff 0%, #e9f0fa 70%, transparent 100%)',
          opacity: 0.45,
          filter: 'blur(10px)',
          animation: 'gentleMove2 28s ease-in-out infinite alternate',
          willChange: 'transform, opacity',
        }}
      />
      <div
        className="absolute left-1/3 bottom-[-8rem] w-[90rem] h-[38rem] rounded-full"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% 80%, #f7fafc 0%, #b6eada 60%, transparent 100%)',
          opacity: 0.38,
          filter: 'blur(12px)',
          animation: 'gentleMove3 32s ease-in-out infinite alternate',
          willChange: 'transform, opacity',
        }}
      />

      {/* عصرية: خطوط ضبابية خفيفة لإضفاء طابع هادئ */}
      <div
        className="absolute left-1/2 top-1/3 w-[60rem] h-32 rounded-full"
        style={{
          background: 'linear-gradient(90deg, #e9f0fa 0%, #b6eada 100%)',
          opacity: 0.13,
          filter: 'blur(18px)',
          transform: 'translateX(-50%) rotate(-8deg)',
          animation: 'gentleLine 18s ease-in-out infinite alternate',
        }}
      />

      {/* هادئ: طبقة حبيبات ناعمة جداً */}
      <div
        className="absolute inset-0"
        style={{
          background: 'url(/assets/noise-light.png), linear-gradient(transparent, transparent)',
          opacity: 0.10,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* حركات CSS مخصصة */}
      <style>{`
        @keyframes gentleMove1 {
          0% { transform: translateY(0) scale(1); opacity: 0.55; }
          100% { transform: translateY(30px) scale(1.04); opacity: 0.60; }
        }
        @keyframes gentleMove2 {
          0% { transform: translateY(0) scale(1); opacity: 0.45; }
          100% { transform: translateY(-24px) scale(1.03); opacity: 0.50; }
        }
        @keyframes gentleMove3 {
          0% { transform: translateY(0) scale(1); opacity: 0.38; }
          100% { transform: translateY(18px) scale(1.06); opacity: 0.43; }
        }
        @keyframes gentleLine {
          0% { transform: translateX(-50%) rotate(-8deg) scaleX(1); opacity: 0.13; }
          100% { transform: translateX(-50%) rotate(-6deg) scaleX(1.04); opacity: 0.18; }
        }
      `}</style>
    </div>
  );
}