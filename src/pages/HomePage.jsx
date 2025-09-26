import React from 'react';
import CallToActionSection from '../components/CallToActionSection';
import SmartImage from '../components/SmartImage';
import HeroSection from '../components/HeroSection';
import CoursesBannerSection from '../components/CoursesBannerSection';
import FeaturesSection from '../components/FeaturesSection';
import KPIsSection from '../components/KPIsSection';

export default function HomePage() {
  return (
    <main className="grad-theme bg-grad-bg-secondary min-h-screen" dir="rtl">
      <div className="grad-container max-w-7xl mx-auto px-4 py-8">
        <HeroSection />

        {/* KPIs */}
        <KPIsSection />

        <FeaturesSection />

        <CoursesBannerSection />

        <CallToActionSection />
      </div>
    </main>
  );
}
