import React from 'react';
import CourseCard from '../components/CourseCard';
import { useCourses } from '../context/CourseContext';
import AIProcessingIndicator from '../components/AIProcessingIndicator'; // استيراد مؤشر المعالجة

export default function CoursesPage() {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return <AIProcessingIndicator text="جاري تحميل الدورات..." />;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">حدث خطأ أثناء تحميل الدورات.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">جميع الدورات</h1>
      {courses.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد دورات متاحة حاليًا.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      )}
    </div>
  );
}