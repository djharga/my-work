import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo3D from '../components/Logo3D';
import VideoSection from '../components/VideoSection';
import { BookOpen, FileText, Briefcase, ClipboardCheck, Award, UserCheck, PlayCircle, ArrowRight, Mail } from 'lucide-react';
import Button from '../components/Button';
import fellowshipPageData from '../data/fellowshipPageData.json';

const { stages, benefits, faqs } = fellowshipPageData;

const iconMap = {
  BookOpen,
  FileText,
  Briefcase,
  ClipboardCheck,
  Award,
  UserCheck,
  PlayCircle,
};

export default function FellowshipPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleToggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 text-right space-y-12 bg-khuta-neutral-50 py-10 min-h-screen" dir="rtl">

      {/* Banner تدرج هادئ */}
      <header className="rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-khuta-primary-100 to-khuta-accent-100" />
        <div className="relative z-10 py-14 px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex items-center gap-4">
            <Logo3D size={120} />
          </div>
          <div className="flex-1 text-khuta-primary-900">
            <motion.h1 initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-3xl lg:text-4xl font-extrabold leading-tight">زمالة المراجعين الداخليين — برنامج متكامل ومهني</motion.h1>
            <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="mt-3 text-sm lg:text-base text-khuta-neutral-700 max-w-3xl">انضم إلى برنامج يتضمن محتوى معتمد، تدريب عملي، ودعم للترشيح لشهادات مهنية رائدة.</motion.p>
            <div className="mt-6 flex gap-3">
              <Button to="/fellowship/enroll" leftIcon={<ArrowRight className="w-4 h-4" />} className="px-6 py-3 rounded-full bg-khuta-accent-500 text-white font-bold shadow hover:bg-khuta-accent-700">التحق بالبرنامج الآن</Button>
              <Button to="/contact" leftIcon={<Mail className="w-4 h-4" />} className="px-4 py-3 rounded-full border border-khuta-primary-300 bg-white text-khuta-primary-700">اسأل فريق البرنامج</Button>
            </div>
          </div>
        </div>
        {/* موجات زخرفية */}
        <div className="absolute -bottom-4 left-0 right-0 opacity-30 pointer-events-none">
          <svg viewBox="0 0 1440 100" className="w-full h-16" preserveAspectRatio="none">
            <path fill="rgba(76,116,185,0.08)" d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </header>

      {/* Timeline */}
      <section className="rounded-2xl p-6 bg-white shadow-sm border border-khuta-neutral-200">
        <h2 className="font-semibold mb-4 text-khuta-primary-700">مراحل الزمالة</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-6 items-start py-4">
            {stages.map((s, idx) => {
              const Icon = iconMap[s.icon];
              return (
                <motion.div key={s.id} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }} className="min-w-[200px] bg-khuta-neutral-100 rounded-2xl p-4 shadow border border-khuta-neutral-200 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-khuta-primary-50 flex items-center justify-center text-khuta-primary-600">{Icon && <Icon className="w-6 h-6" />}</div>
                    <div>
                      <div className="font-semibold text-khuta-primary-700">{s.title}</div>
                      <div className="text-xs text-khuta-neutral-600">{s.desc}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-khuta-neutral-500">الخطوة {idx + 1} من {stages.length}</div>
                    <div className="text-sm text-khuta-accent-600 font-semibold">{idx < 2 ? 'مبتدئ' : idx === 2 ? 'متوسط' : 'متقدم'}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial/Video section + Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <VideoSection
            title="تجربة خريجينا"
            subtitle="استمع لقصص نجاح الملتحقين وكيف ساهم البرنامج في مسيرتهم المهنية"
            videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
            poster="/assets/hero-1600.avif"
          />
        </div>

        <aside className="bg-khuta-neutral-100 rounded-2xl p-4 shadow border border-khuta-neutral-200">
          <h3 className="font-semibold mb-4 text-khuta-primary-700">مزايا الاشتراك</h3>
          <div className="space-y-4">
            {benefits.map(b => {
              const Icon = iconMap[b.icon];
              return (
                <motion.div key={b.id} whileHover={{ scale: 1.025 }} className="p-3 bg-white rounded-lg shadow-sm border border-khuta-neutral-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-khuta-primary-50 flex items-center justify-center text-khuta-primary-600">{Icon && <Icon className="w-5 h-5" />}</div>
                  <div>
                    <div className="font-medium text-khuta-accent-700">{b.title}</div>
                    <div className="text-xs text-khuta-neutral-600">{b.text}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-4">
            <Button to="/fellowship/enroll" leftIcon={<ArrowRight className="w-4 h-4" />} className="w-full px-4 py-3 rounded-full bg-khuta-accent-500 text-white">سجل في الزمالة وابدأ الآن</Button>
          </div>
        </aside>
      </section>

      {/* CTA + FAQ + Contact */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-khuta-primary-50 to-khuta-primary-100 shadow-md border border-khuta-neutral-100">
          <h3 className="text-xl font-bold text-khuta-primary-700">هل أنت مستعد للارتقاء بمسيرتك المهنية؟</h3>
          <p className="mt-2 text-khuta-neutral-700">انضم الآن واستفد من محتوى معمق، دعم مهني، وفرص توظيف مميزة.</p>
          <div className="mt-4 flex gap-3">
            <Button to="/fellowship/enroll" leftIcon={<ArrowRight className="w-4 h-4" />} className="px-6 py-3 rounded-full bg-khuta-accent-500 text-white font-bold">ابدأ رحلتك الآن</Button>
            <Button to="/contact" leftIcon={<Mail className="w-4 h-4" />} className="px-4 py-3 rounded-full border border-khuta-primary-300 bg-white text-khuta-primary-700 font-semibold">تواصل معنا</Button>
          </div>
        </div>
        <div className="rounded-2xl p-6 bg-white shadow-sm border border-khuta-neutral-100">
          <h4 className="font-semibold mb-3 text-khuta-primary-700">الأسئلة المتكررة</h4>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <button
                  className="w-full text-right flex items-center justify-between px-3 py-2 rounded-md bg-khuta-neutral-50 font-bold"
                  onClick={() => handleToggleFAQ(faq.id)}
                >
                  {faq.question}
                  <span className="text-sm">{openFAQ === faq.id ? '-' : '+'}</span>
                </button>
                {openFAQ === faq.id && (
                  <div className="mt-2 text-sm text-khuta-neutral-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h5 className="font-medium mb-2 text-khuta-accent-700">تواصل سريع</h5>
            <form onSubmit={(e) => { e.preventDefault(); alert('تم إرسال الطلب'); }} className="flex gap-2">
              <input required placeholder="بريدك الإلكتروني" className="flex-1 p-2 rounded-md border border-khuta-neutral-200" />
              <button type="submit" className="px-4 py-2 rounded-md bg-khuta-primary-400 text-white font-bold">أرسل</button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
