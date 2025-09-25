import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import InteractiveTimeline from '../components/InteractiveTimeline';
import SecureView from '../components/SecureView';
import ContentViewer from '../components/ContentViewer';
import Button from '../components/Button';

export default function CourseDetailPage() {
  const course = {
    id: 101,
    title: 'دورة: أساسيات المراجعة الداخلية',
    instructor: 'د. محمد أحمد السعدي',
    duration: '6 أسابيع'
  };

  return (
    <div className="container mx-auto px-4 py-8 text-right space-y-6">
      <header className="bg-khuta-neutral-100 dark:bg-khuta-neutral-900 p-6 rounded shadow">
        <div className="mb-4">
          <Link to="/courses" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-khuta-neutral-50 hover:bg-khuta-neutral-100 text-khuta-primary">
            <ArrowLeftIcon className="w-5 h-5" />
            العودة
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-khuta-primary-700">{course.title}</h1>
        <div className="text-md text-gray-600 mt-2">المدرّب: <span className="font-semibold">{course.instructor}</span> · المدة: <span className="font-semibold">{course.duration}</span></div>
        <div className="mt-6 flex items-center gap-3">
          <Button className="px-8 py-3 text-lg" ariaLabel="سجّل الآن">سجّل الآن</Button>
          <Link to={`/quiz/${course.id}`} className="px-4 py-2 bg-white border rounded">ابدأ الاختبار الآن</Link>
        </div>
      </header>

      <main className="space-y-6">
        {/* Tabs: Curriculum / Content Library */}
        <div className="bg-khuta-neutral-100 dark:bg-khuta-neutral-900 p-4 rounded shadow">
          <Tabs />
        </div>
      </main>

      {/* Local tab component */}
      
      {/* Inline Tabs implementation */}
      
    </div>
  );
} 

function Tabs() {
  const [active, setActive] = useState('curriculum');

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button variant={active === 'curriculum' ? 'primary' : 'secondary'} onClick={() => setActive('curriculum')} className="px-4 py-2">منهج الدورة</Button>
        <Button variant={active === 'content' ? 'primary' : 'secondary'} onClick={() => setActive('content')} className="px-4 py-2">مكتبة المحتوى</Button>
      </div>

      <div>
        {active === 'curriculum' && (
          <div>
            <h3 className="font-semibold mb-3">مخطط الدورة ومراحله</h3>
            <SecureView>
              <InteractiveTimeline />
            </SecureView>
          </div>
        )}

        {active === 'content' && (
          <div>
            <h3 className="font-semibold mb-3">مكتبة المحتوى</h3>
            <ContentViewer />
          </div>
        )}
      </div>
    </div>
  );
}