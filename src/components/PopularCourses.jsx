import React from 'react';
import Button from './Button';
import FallbackImage from './placeholders/FallbackImage';
import DataFallback from './placeholders/DataFallback';

export default function PopularCourses({ courses = [] }) {
  return (
    <section className="py-10 bg-khuta-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-khuta-primary-700 mb-7 text-center">الدورات الأكثر شعبية هذا الشهر</h2>
        {courses.length === 0 ? (
          <div className="text-center text-khuta-neutral-500 py-8">لا توجد دورات حاليا.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map(c => (
              <div key={c.id} className="p-5 bg-white rounded-2xl shadow border border-khuta-neutral-100 flex flex-col items-center">
                <FallbackImage
                  src={c.image}
                  alt={c.title}
                  className="w-full h-40 rounded-xl object-cover mb-4 bg-khuta-neutral-100"
                  size={160}
                />
                <div className="font-bold text-khuta-primary-800 text-lg mb-1">{c.title}</div>
                <div className="text-sm text-khuta-neutral-600 mb-2">
                  <DataFallback value={c.meta} placeholder="تفاصيل المسار ستظهر قريباً" />
                </div>
                <div className="mt-3 w-full">
                  <Button to={`/courses/${c.id}`} className="w-full px-4 py-2 rounded-full bg-khuta-accent-500 text-white font-semibold hover:bg-khuta-accent-700 transition">
                    عرض الدورة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
