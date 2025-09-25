import React, { useEffect, useState } from 'react';
import { useCourses } from '../context/CourseContext';
import StudentTimeline from '../components/StudentTimeline';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [used, setUsed] = useState('1.2GB');
  const [copies, setCopies] = useState([]);
  const { listUserCopies } = useCourses();

  // التقدّم الزمني الوهمي
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const raw = localStorage.getItem('khuta_user');
    if (raw) setUser(JSON.parse(raw));
    setCopies(listUserCopies('guest'));
  }, []);

  const stages = [
    { id: 's1', title: 'المحاضرة 1', desc: 'مقدمة ومفاهيم أساسية' },
    { id: 's2', title: 'المحاضرة 2', desc: 'مهارات متقدمة' },
    { id: 's3', title: 'المحاضرة 3', desc: 'مشروع عملي' },
    { id: 's4', title: 'الاختبار',   desc: 'اختبار نهائي والتقييم' },
    { id: 's5', title: 'الشهادة',     desc: 'الحصول على الشهادة واعتمادها' }
  ];

  function handleAdvance(newStep) {
    setCurrentStep(newStep);
  }

  // حساب مساحة التخزين (ديناميكي)
  const usedPercent = Number(used.replace('GB','')) / 5 * 100;

  return (
    <div className="space-y-5 max-w-2xl mx-auto my-6">
      {/* بطاقة معلومات المستخدم الأساسية */}
      <div className="surface flex flex-col gap-1">
        <h2 className="font-bold text-xl text-khuta-primary mb-2">الملف الشخصي</h2>
        <div className="flex items-center gap-2">
          <span className="font-medium text-khuta-primary-800">الاسم:</span>
          <span className="text-khuta-neutral-700">{user?.name || 'زائر'}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-medium text-khuta-primary-800">البريد الإلكتروني:</span>
          <span className="text-khuta-neutral-700">{user?.email || '-'}</span>
        </div>
      </div>

      {/* بطاقة مساحة التخزين */}
      <div className="surface">
        <h3 className="font-semibold text-khuta-primary-800 mb-1">مساحة التخزين</h3>
        <div className="mt-2 text-sm text-khuta-neutral-700">مستخدم <b>{used}</b> من 5GB</div>
        <div className="w-full bg-khuta-neutral-200 h-3 rounded-lg mt-2 overflow-hidden">
          <div className="bg-khuta-primary h-3 transition-all" style={{ width: `${usedPercent}%` }} />
        </div>
        <div className="text-xs mt-1 text-khuta-success">{Math.round(usedPercent)}% مستخدم</div>
      </div>

      {/* بطاقة النسخ المحلية */}
      <div className="surface">
        <h3 className="font-semibold text-khuta-primary-800 mb-3">النسخ المحلية</h3>
        {copies.length === 0 ? (
          <div className="text-sm text-khuta-neutral-600">لم يتم العثور على نسخ</div>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {copies.map(c => (
              <li key={c.key} className="flex items-center justify-between p-3 bg-khuta-neutral-50 rounded-lg border">
                <div>
                  <div className="font-medium text-khuta-primary">{c.data.title}</div>
                  <div className="text-xs text-khuta-neutral-600">إنشئت: {new Date(c.data.createdAt).toLocaleString()}</div>
                </div>
                <button
                  onClick={() => alert(JSON.stringify(c.data))}
                  className="button-glow px-3 py-1 rounded text-sm bg-khuta-accent-500 hover:bg-khuta-primary text-white shadow"
                  aria-label="عرض النسخة"
                  style={{minWidth:70}}
                >عرض</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* محور التقدّم */}
      <div className="surface">
        <h3 className="font-semibold text-khuta-primary-800 mb-4">التقدّم في المسار</h3>
        <StudentTimeline
          stages={stages}
          currentStep={currentStep}
          onAdvance={handleAdvance}
          onComplete={() => alert('مبروك! أنهيت المسار')}
        />
      </div>
    </div>
  );
}
