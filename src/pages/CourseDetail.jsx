import React from 'react';
import { useParams } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import FileTreeViewer from '../components/FileTreeViewer';
import Button from '../components/Button';
import FallbackImage from '../components/placeholders/FallbackImage';
import DataFallback from '../components/placeholders/DataFallback';

export default function CourseDetail() {
  const { id } = useParams();
  const { courses, createUserCopy } = useCourses();
  const course = courses.find(c => String(c.id) === String(id));

  if (!course) return <div>الدورة غير موجودة</div>;

  function handleMakeCopy() {
    const key = createUserCopy(course.id, 'guest');
    if (key) alert('تم إنشاء نسختك المحلية: ' + key);
    else alert('فشل إنشاء النسخة');
  }

  return (
    <div className="space-y-6">
      <div className="bg-khuta-neutral-100 p-4 rounded shadow-sm flex gap-4 items-start">
        <div className="flex-shrink-0">
          <FallbackImage src={course.image} alt={course.title} size={120} className="rounded-md" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-sm text-gray-600 mt-2">{course.description}</p>
          <div className="mt-4 flex gap-3 items-center">
            <Button onClick={handleMakeCopy} className="px-4 py-2 shadow-md" ariaLabel="احصل على نسختي">احصل على نسختي</Button>
            <Button onClick={() => alert('اشتراك (محاكاة)')} className="px-4 py-2 border rounded shadow-md hover:shadow-lg transition-shadow duration-300" ariaLabel="اشترك">اشترك الآن</Button>
          </div>
        </div>
      </div>

      <div className="bg-khuta-neutral-100 p-4 rounded shadow-sm">
        <h2 className="font-semibold mb-2">شجرة الملفات</h2>
        <FileTreeViewer files={course.files} />
      </div>

      <div className="bg-khuta-neutral-100 p-4 rounded shadow-sm">
        <h3 className="font-semibold">معلومات إضافية</h3>
        <div className="mt-2 text-sm text-gray-600">المدرب: {course.instructor} — المستوى: {course.level} — السعر: {course.price} ر.س</div>
      </div>
    </div>
  );
} 