import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DemoControls from '../components/DemoControls';
import GenerativeBackground from '../components/GenerativeBackground';
import { useBackground } from '../context/BackgroundContext';
import Button from '../components/Button';

export default function MainLayout({ children }) {
  const { enabled } = useBackground();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-khuta-neutral-50 text-khuta-primary relative" dir="rtl">
      {/* رابط تخطي للمحتوى لتحسين الوصول */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:bg-white focus:text-khuta-primary focus:border focus:border-khuta-primary focus:px-3 focus:py-2 focus:rounded-lg">تخطي إلى المحتوى</a>
      {/* خلفية مولدة ديناميكيًا إذا فعّلتها */}
      {enabled && <GenerativeBackground />}
      
      {/* شريط التنقل أعلى الصفحة */}
      <Navbar />
      
      {/* محتوى التطبيق الأساسي وسط الصفحة */}
      <div id="main-content" className="flex-1 container mx-auto px-4 py-8">
        {children}
      </div>
      
      {/* الفوتر (محتوى أسفل الصفحة) */}
      <Footer />

      {/* زر تواصل سريع يظهر أسفل يسار الصفحة في الوضع RTL */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button variant="accent" size="md" onClick={() => setContactOpen(true)} ariaLabel="تواصل سريع">
          تواصل سريع
        </Button>
      </div>

      {/* عناصر خاصة للتطوير فقط (تظهر في وضع التطوير) */}
      {process.env.NODE_ENV === 'development' && <DemoControls />}

      {/* يمكنك هنا إضافة مكون نافذة التواصل السريع إذا أردت فتح نافذة (مودال) عند الضغط! */}
      {/* contactOpen && <ContactModal onClose={() => setContactOpen(false)} /> */}
    </div>
  );
}
