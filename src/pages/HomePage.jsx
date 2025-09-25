import React from 'react';
import CallToActionSection from '../components/CallToActionSection';
import SmartImage from '../components/SmartImage';
import HeroSection from '../components/HeroSection';
import CoursesBannerSection from '../components/CoursesBannerSection';
import FeaturesSection from '../components/FeaturesSection';
import KPIsSection from '../components/KPIsSection';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8" dir="rtl">
      <HeroSection />

      {/* KPIs */}
      <KPIsSection />

      <FeaturesSection />

      <CoursesBannerSection />

      <CallToActionSection />
    </main>
  );
}
