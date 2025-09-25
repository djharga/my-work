import React from 'react';
import FallbackImage from './placeholders/FallbackImage';
import DataFallback from './placeholders/DataFallback';

export default function InstructorsGrid({ instructors = [] }) {
  return (
    <section className="py-9 bg-khuta-neutral-50">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-khuta-primary-700 mb-6 text-center">تعرف على المدربين</h3>
        {instructors.length === 0 ? (
          <div className="text-center py-10 text-khuta-neutral-500 font-medium">
            لا يوجد مدربين حالياً.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {instructors.map(i => (
              <div key={i.id} className="p-5 bg-white rounded-2xl shadow border border-khuta-neutral-200 text-center flex flex-col items-center">
                <FallbackImage
                  src={i.photo}
                  alt={i.name}
                  className="w-24 h-24 rounded-full shadow-sm border border-khuta-neutral-100 object-cover bg-khuta-neutral-100"
                  size={96}
                  initials={i.name?.slice(0,2)}
                />
                <div className="mt-3 font-bold text-khuta-primary-800">{i.name}</div>
                <div className="text-sm text-khuta-neutral-600 font-medium">
                  <DataFallback value={i.specialty} placeholder="تخصص غير متوفر" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
