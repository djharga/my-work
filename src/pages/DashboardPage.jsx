import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useCourses } from '../context/CourseContext';
import Button from '../components/Button';
import FallbackImage from '../components/placeholders/FallbackImage';
import DataFallback from '../components/placeholders/DataFallback';

// يمكنك إضافة أي صور/أيقونات أو تعريف HeroIllustration هنا

function HeroIllustration() {
  return (
    <svg width="100" height="100">
      {/* رسم عشوائي للتجميل، عدّله كما تشاء */}
      <circle cx="50" cy="50" r="45" fill="#38bdf8" opacity="0.09" />
      <rect x="30" y="35" width="40" height="30" rx="8" fill="#9333ea" opacity="0.15" />
    </svg>
  );
}

function AnimatedProgressBar({ value = 0, color = "bg-blue-500" }) {
  return (
    <div className="w-full h-2.5 bg-blue-100 dark:bg-khuta-neutral-800 rounded-lg overflow-hidden">
      <div
        className={`h-2.5 ${color} transition-all rounded-lg`}
        style={{ width: `${value}%` }} />
    </div>
  );
}

export default function DashboardPage() {
  const { courses } = useCourses();
  const [user, setUser] = useState({ name: 'زائر' });
  const [registered, setRegistered] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('khuta_user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch (e) {}
    }
    // simulate registered courses (use first 2 from context as example)
    const regs = (courses || []).slice(0, 2).map((c, idx) => ({
      id: c.id, title: c.title, image: c.image, progress: idx === 0 ? 75 : 40,
    }));
    setRegistered(regs);
  }, [courses]);

  // عدد الشهادات والإنجازات (محاكاة)
  const certificates = 3;
  const points = 1500;
  const completedCount = registered.filter((r) => r.progress >= 100).length;

  return (
    <div className="container mx-auto px-4 py-8 text-right font-[Cairo] dark:bg-khuta-neutral-950 min-h-screen transition-colors">
      {/* هيرو ترحيبي ديناميكي */}
      <motion.section
        className="relative bg-gradient-to-l from-blue-50 to-blue-100 dark:from-khuta-primary-900/30 dark:to-khuta-primary-900/10 rounded-3xl p-7 mb-8 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1 z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-khuta-primary mb-2 leading-relaxed">
            أهلاً بعودتك، <span className="text-blue-600">{user.name}</span>! 🚀
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
            رحلة نجاحك تبدأ من هنا — واصل التقدم وحقق أهدافك التعليمية معنا.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <Button to="/profile" className="px-4 py-2 text-base font-semibold button-glow">
              <UserCircleIcon className="w-5 h-5 inline ml-1" />
              الملف المهني
            </Button>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              نقاطك: <span className="font-bold text-blue-600">{points}</span>
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              شهاداتك: <span className="font-bold text-yellow-500">{certificates}</span>
            </span>
          </div>
        </div>
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 z-0">
          <HeroIllustration />
        </div>
      </motion.section>

      {/* شبكة البطاقات الرئيسية */}
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-4 lg:auto-rows-[minmax(120px,auto)]">
        {/* دوراتي المسجلة */}
        <motion.section
          className="lg:col-span-2 lg:row-span-2 bg-white dark:bg-khuta-neutral-900 rounded-2xl shadow-md p-6 flex flex-col"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-khuta-primary text-lg">دوراتي المسجلة</h2>
            <Button to="/courses" className="text-sm" variant="secondary">
              استعرض كل الدورات
            </Button>
          </div>
          {registered.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <p className="text-gray-500 dark:text-gray-300 mb-3">لم تشترك في أي دورة بعد.</p>
              <Button to="/courses" className="px-5 py-2 text-base button-glow">
                استكشف الدورات الآن
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {registered.slice(0, 3).map((course, idx) => (
                <motion.div
                  key={course.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-blue-100 dark:border-khuta-primary-900 bg-gradient-to-l from-blue-50/40 to-white dark:from-khuta-primary-900/30 dark:to-khuta-neutral-900 hover:shadow-lg transition"
                  initial={{ opacity: 0, x: 30 * (idx + 1) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 + idx * 0.1 }}
                >
                  <FallbackImage
                    src={course.image}
                    alt={course.title}
                    className="w-24 h-16 object-cover rounded-lg border border-blue-200"
                    size={96}
                    initials={course.title?.[0] || "د"}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-khuta-primary">{course.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{course.progress}%</div>
                    </div>
                    <AnimatedProgressBar value={course.progress} color="bg-blue-500" />
                    <div className="mt-2 flex justify-end">
                      <Button to={`/courses/${course.id}`} className="px-3 py-1 text-sm" variant="primary">
                        فتح الدورة
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
        {/* ...أضف المزيد من الأقسام والبطاقات هنا حسب حاجتك (شهادات، إنجازات، إحصائيات...) */}
      </div>
    </div>
  );
}
