import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DemoControls from '../components/DemoControls';
import GenerativeBackground from '../components/GenerativeBackground';
import ResponsiveOptimizer from '../components/ResponsiveOptimizer';
import { useBackground } from '../context/BackgroundContext';
import Button from '../components/Button';

export default function MainLayout({ children }) {
  const { enabled } = useBackground();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <ResponsiveOptimizer>
      <div className="grad-theme min-h-screen flex flex-col bg-grad-bg-secondary text-grad-gray-900 relative" dir="rtl">
        {/* رابط تخطي للمحتوى لتحسين الوصول */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:bg-white focus:text-grad-primary focus:border focus:border-grad-primary focus:px-3 focus:py-2 focus:rounded-lg focus:z-50">تخطي إلى المحتوى</a>
        
        {/* خلفية مولدة ديناميكيًا إذا فعّلتها */}
        {enabled && <GenerativeBackground />}
        
        {/* شريط التنقل أعلى الصفحة */}
        <Navbar />
        
        {/* محتوى التطبيق الأساسي وسط الصفحة */}
        <div id="main-content" className="flex-1">
          {children}
        </div>
        
        {/* الفوتر (محتوى أسفل الصفحة) */}
        <Footer />

        {/* زر تواصل سريع يظهر أسفل يسار الصفحة في الوضع RTL */}
        <div className="fixed bottom-6 left-6 z-40">
          <Button 
            variant="accent" 
            size="md" 
            onClick={() => setContactOpen(true)} 
            ariaLabel="تواصل سريع"
            className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            تواصل سريع
          </Button>
        </div>

        {/* عناصر خاصة للتطوير فقط (تظهر في وضع التطوير) */}
        {process.env.NODE_ENV === 'development' && <DemoControls />}

        {/* يمكنك هنا إضافة مكون نافذة التواصل السريع إذا أردت فتح نافذة (مودال) عند الضغط! */}
        {/* contactOpen && <ContactModal onClose={() => setContactOpen(false)} /> */}
      </div>
    </ResponsiveOptimizer>
  );
}
