import React from 'react';

export default function TestimonialCard({ name, title, text, rating = 5 }) {
  const stars = '★★★★★'.slice(0, Math.max(0, Math.min(5, rating)));
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col border border-khuta-neutral-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-khuta-primary-50 flex items-center justify-center text-khuta-primary-600 font-bold text-lg">
            {name?.charAt(0) || '؟'}
          </span>
          <span className="font-semibold text-khuta-primary-700">{name}</span>
        </div>
        <span className="text-yellow-500 text-lg">{stars}</span>
      </div>
      <div className="text-base text-khuta-neutral-700 mt-2">{text}</div>
      <div className="mt-3 text-xs text-khuta-neutral-500 font-medium">{title}</div>
    </div>
  );
}
