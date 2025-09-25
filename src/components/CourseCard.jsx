import React from 'react';
// import { Link } from 'react-router-dom'; // تم التعليق على الاستيراد لأننا نستخدم زرًا عاديًا
// import { motion } from 'framer-motion'; // تم إزالة framer-motion
import Button from './Button';
import FallbackImage from './placeholders/FallbackImage';
// import ResponsiveTilt from './ResponsiveTilt'; // تم إزالة ResponsiveTilt

export default function CourseCard({ course, onDetailsClick }) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow bg-white border border-khuta-neutral group">
      {/* Background for glassmorphism effect on hover */}
      <div className="absolute inset-0 bg-transparent backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

      <FallbackImage src={course.image} alt={`Course: ${course.title}`} className="w-full h-48 rounded-md" size={192} />
      <div className="p-4 relative z-10 min-h-[210px] flex flex-col"> {/* ارتفاع ثابت */}
        { (course.level || course.duration) && (
          <div className="text-xs text-[#008080] mb-1">{course.level || ''} {course.duration ? `• ${course.duration}` : ''}</div>
        )}
        <h3 className="text-base font-bold text-khuta-primary mb-2">
          {course.title}
        </h3>
        <p className="text-sm text-khuta-neutral-700 mb-3 line-clamp-2">
          {course.description}
        </p>
        <div className="mt-auto flex justify-between items-center">
          <span className="font-semibold text-khuta-primary">
            {course.price === 0 ? 'مجاني' : `${course.price} ر.س`}
          </span>
          <Button variant="secondary" size="sm" onClick={() => onDetailsClick && onDetailsClick(course.id)} ariaLabel={`عرض تفاصيل الدورة ${course.title}`}>
            تفاصيل
          </Button>
        </div>
      </div>
    </div>
  );
} 