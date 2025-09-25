import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { ArrowRight } from 'lucide-react';
import FallbackImage from './placeholders/FallbackImage';

export default function HeroBanner() {
  return (
    <header className="relative overflow-hidden rounded-3xl p-8"
      style={{
        background: "linear-gradient(90deg, #e9eff7 0%, #d1e3db 100%)",
        boxShadow: "0 8px 32px rgba(43,108,176,0.08)",
        backdropFilter: "blur(3px) saturate(102%)"
      }}
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-7">
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-khuta-primary-700">منصة خطى — تعلم عملي واحترافي</h2>
            <p className="mt-2 text-lg text-khuta-neutral-700">مسارات مركزة ومحتوى تطبيقي لتسريع تقدمك الوظيفي.</p>
            <div className="mt-6">
              <Button to="/courses" leftIcon={<ArrowRight className="w-4 h-4" />} className="px-7 py-3 rounded-full bg-khuta-accent-500 text-white font-bold shadow hover:bg-khuta-accent-700 transition">
                ابدأ رحلتك الآن
              </Button>
            </div>
          </div>
          <div className="w-48">
            <FallbackImage 
              src="/assets/hero-400.webp" 
              alt="صورة تعليمية للمنصة" 
              className="rounded-xl shadow object-cover w-full h-32 bg-khuta-neutral-100"
              size={128}
              initials="خ"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
