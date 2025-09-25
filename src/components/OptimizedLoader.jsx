import React from 'react';

const OptimizedLoader = ({ 
  size = 'medium', 
  message = 'جاري تحميل الصفحة...', 
  minimal = false 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  if (minimal) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className={`${sizeClasses[size]} border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
      </div>
    );
  }

  return (
    <div 
      style={{
        minHeight: "60vh", 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center", 
        direction: "rtl",
        gap: "1rem"
      }}
    >
      <div className={`${sizeClasses[size]} border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
      <span style={{
        background: "var(--modern-gradient,linear-gradient(90deg,#38bdf8,#9333ea))",
        color: "#fff",
        padding: "0.75em 1.5em",
        borderRadius: "1.5em",
        fontWeight: 600,
        fontSize: "0.95em",
        boxShadow: "0 4px 12px rgba(38,64,175,0.15)",
        opacity: 0.9
      }}>
        {message}
      </span>
    </div>
  );
};

export default React.memo(OptimizedLoader);