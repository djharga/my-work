import React, { useState } from 'react';

// يمكنك تغيير الصور والنصوص بحرية هنا
const panelsData = [
  {
    bg: 'https://images.unsplash.com/photo-1523633589114-88eaf4b4f1a8?w=800&q=80',
    title: 'دوراتنا',
    subtitle: 'اكتشف مسارات تعليمية متكاملة'
  },
  {
    bg: 'https://images.unsplash.com/photo-1488330890490-c291ecf62571?w=800&q=80',
    title: 'الزمالة',
    subtitle: 'انضم لنخبة المحترفين'
  },
  {
    bg: 'https://images.unsplash.com/photo-1511800453077-8c0afa94175f?w=800&q=80',
    title: 'الأدوات',
    subtitle: 'استخدم الذكاء الاصطناعي'
  },
  {
    bg: 'https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=800&q=80',
    title: 'الأسعار',
    subtitle: 'اختر الخطة المناسبة'
  },
];

const ExpandingPanels = () => {
  const [activePanel, setActivePanel] = useState(0);

  return (
    <div className="w-full h-[70vh] flex gap-4 px-2 py-4">
      {panelsData.map((panel, i) => (
        <div
          key={i}
          className={`
            relative rounded-2xl cursor-pointer overflow-hidden
            transition-all duration-700 ease-in-out bg-cover bg-center flex
            shadow-lg
            ${activePanel === i ? 'flex-grow-[10] scale-[1.01]' : 'flex-grow border border-khuta-neutral-100'}
          `}
          style={{ backgroundImage: `url(${panel.bg})` }}
          onClick={() => setActivePanel(i)}
        >
          {/* طبقة غامقة للتمييز عند التفعيل */}
          <div className={`
            absolute inset-0 z-10
            ${activePanel === i
              ? 'bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-100'
              : 'bg-black/20 opacity-50'}
            transition-all duration-700 ease-in-out
          `}></div>

          {/* نص اللوح */}
          <div className="absolute bottom-7 left-7 z-20 flex flex-col">
            <h3 className="text-white text-3xl font-extrabold drop-shadow mb-2">{panel.title}</h3>
            <p className={`
              text-white text-lg font-bold transition-all duration-700 ease-in-out
              ${activePanel === i ? 'max-w-xs opacity-100 delay-300' : 'max-w-0 opacity-0'}
            `}>
              {panel.subtitle}
            </p>
          </div>

          {/* تأثير شاشة لو اللوح غير نشط */}
          {activePanel !== i &&
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none z-30 rounded-2xl"></div>
          }
        </div>
      ))}
    </div>
  );
};

export default ExpandingPanels;
