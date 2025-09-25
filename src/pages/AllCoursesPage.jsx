import React, { useMemo, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { Link } from 'react-router-dom';
import BooksBanner from '../img/khatty_books_closeup.png';

const MOCK_COURSES = [
  { id: 301, title: 'أساسيات المراجعة الداخلية', description: 'مقدمة عملية لمهارات المراجعة والمنهجيات الأساسية.', imageUrl: 'https://picsum.photos/seed/301/600/400', price: '750 ر.س', studentsCount: 1250 },
  { id: 302, title: 'التحليل المالي للمراجعين', description: 'مفاهيم تحليل القوائم الماليّة لتدعيم عمليات المراجعة.', imageUrl: 'https://picsum.photos/seed/302/600/400', price: '800 ر.س', studentsCount: 820 },
  { id: 303, title: 'مهارات القيادة والإدارة', description: 'بناء مهارات قيادة الفرق واتخاذ القرارات الاستراتيجية.', imageUrl: 'https://picsum.photos/seed/303/600/400', price: '950 ر.س', studentsCount: 980 },
  { id: 304, title: 'إدارة المخاطر المؤسسية', description: 'استراتيجيات تحديد وتقييم المخاطر وتطوير خطط الاستجابة.', imageUrl: 'https://picsum.photos/seed/304/600/400', price: '1200 ر.س', studentsCount: 654 },
  { id: 305, title: 'حوكمة الشركات', description: 'أُطر الحوكمة والضوابط الداخلية لتحسين الأداء المؤسسي.', imageUrl: 'https://picsum.photos/seed/305/600/400', price: '680 ر.س', studentsCount: 410 },
  { id: 306, title: 'التحقيقات الداخلية', description: 'منهجيات التحقيق وتقنيات جمع الأدلة بشكل مهني.', imageUrl: 'https://picsum.photos/seed/306/600/400', price: '990 ر.س', studentsCount: 540 },
  { id: 307, title: 'التدقيق التقني (IT Audit)', description: 'مبادئ تدقيق نظم المعلومات وتأمين البنية التحتية.', imageUrl: 'https://picsum.photos/seed/307/600/400', price: '1150 ر.س', studentsCount: 710 },
  { id: 308, title: 'الامتثال والتنظيم', description: 'متطلبات الامتثال وأفضل الممارسات المؤسسية.', imageUrl: 'https://picsum.photos/seed/308/600/400', price: '720 ر.س', studentsCount: 360 }
];

export default function AllCoursesPage() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent | popular

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = MOCK_COURSES.filter(c => c.title.toLowerCase().includes(q));

    if (sortBy === 'recent') {
      list = list.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'popular') {
      list = list.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
    }

    return list;
  }, [query, sortBy]);

  return (
    <div className="container mx-auto px-4 text-right space-y-6">
      <div className="rounded-kh overflow-hidden border border-khuta-neutral">
        <div className="relative w-full aspect-[21/9]">
          <img
            src={BooksBanner}
            alt="كتب ومراجع تعليمية"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 960px, 1200px"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-extrabold text-khuta-primary">اكتشف مكتبة دوراتنا</h1>
        <div className="flex flex-wrap items-center gap-2">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث باسم الدورة..." className="border border-khuta-neutral rounded-full px-4 py-2 text-sm" aria-label="بحث في الدورات" />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-khuta-neutral rounded-full px-3 py-2 text-sm" aria-label="فرز حسب">
            <option value="recent">الأحدث</option>
            <option value="popular">الأكثر شيوعًا</option>
          </select>
          <button className="px-3 py-1 rounded-full text-sm bg-white border border-khuta-neutral text-khuta-primary">الكل</button>
          <button className="px-3 py-1 rounded-full text-sm bg-white border border-khuta-neutral text-khuta-primary">مبتدئ</button>
          <button className="px-3 py-1 rounded-full text-sm bg-white border border-khuta-neutral text-khuta-primary">متوسط</button>
          <button className="px-3 py-1 rounded-full text-sm bg-white border border-khuta-neutral text-khuta-primary">متقدم</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(c => (
          <Link key={c.id} to={`/courses/${c.id}`} className="block transform hover:scale-105 transition-transform duration-300" aria-label={`عرض دورة ${c.title}`}>
            <CourseCard course={{ id: c.id, title: c.title, description: c.description, image: c.imageUrl, price: c.price, level: 'مبتدئ', duration: '8h' }} />
          </Link>
        ))}
      </div>
    </div>
  );
}