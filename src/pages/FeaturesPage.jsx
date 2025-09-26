import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, Grid, BookOpen, Briefcase, ClipboardCheck, Lightbulb, Lock, Zap, ArrowRight, Mail, Award } from '../utils/icons';
import Button from '../components/Button';
import SmartImage from '../components/SmartImage';
import HeroCardsImg from '../img/130cba99-7494-4a47-bff0-a6336f363dc4.png';
import I1 from '../img/icone1.png';
import I2 from '../img/icone2.png';
import I3 from '../img/icone3.png';
import I4 from '../img/icone4.png';
import I5 from '../img/icone5.png';
import I6 from '../img/icone6.png';

// بيانات الميزات
const features = [
  { id: 'f1', title: 'مراجع آلي ذكي', desc: 'تحليل أوتوماتيكي للمحتوى لتسريع المراجعات وتقليل الأخطاء.', img: I1 },
  { id: 'f2', title: 'منشئ ملخصات', desc: 'جيل ملخصات ذكي يجعل مراجعتك أسرع وأكثر تركيزاً.', img: I2 },
  { id: 'f3', title: 'تتبع التقدم', desc: 'لوحات قيادة توضح تقدمك ومؤشرات الأداء بدقة.', img: I3 },
  { id: 'f4', title: 'تعاون فرقي', desc: 'مساحات عمل مشتركة لتنسيق الفرق وتبادل الملاحظات.', img: I4 },
  { id: 'f5', title: 'محتوى تفاعلي', desc: 'اختبارات ومهام قابلة للقياس لتحسين التعلم.', img: I5 },
  { id: 'f6', title: 'شهادات معتمدة', desc: 'احصل على شهادات معتمدة عند إتمام المسارات بنجاح.', img: I6 }
];

const timelineSteps = [
  { id: 't1', title: 'تسجيل', icon: LogIn },
  { id: 't2', title: 'اختيار مسار', icon: Grid },
  { id: 't3', title: 'التعلم', icon: BookOpen },
  { id: 't4', title: 'التطبيق', icon: Briefcase },
  { id: 't5', title: 'التقييم', icon: ClipboardCheck },
  { id: 't6', title: 'الشهادة', icon: Award }
];

const reasons = [
  { id: 'r1', title: 'ابتكار مستمر', desc: 'نعتمد أحدث أبحاث الذكاء الاصطناعي في تصميم المحتوى.', icon: Lightbulb },
  { id: 'r2', title: 'أمن وخصوصية', desc: 'حماية بياناتك أولوية بممارسات أمنية صارمة.', icon: Lock },
  { id: 'r3', title: 'استعمال سهل ونتائج ملموسة', desc: 'منصة بسيطة، نتائج عملية في وقت قياسي.', icon: Zap }
];

// كارت ميزة بظل وألوان هادئة
function FeatureCard({ feature }) {
  return (
    <motion.div
      whileHover={{ translateY: -4, boxShadow: "0 10px 24px rgba(43,108,176,0.13)" }}
      transition={{ type: 'spring', stiffness: 260 }}
      className="feature-card bg-white rounded-2xl p-5 shadow hover:shadow-lg border border-khuta-neutral-200"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-khuta-background border border-khuta-neutral">
          {feature.img && <img src={feature.img} alt="" className="w-7 h-7 object-contain" loading="lazy" decoding="async" />}
        </div>
        <div className="text-right flex-1">
          <div className="font-bold text-khuta-primary-700 text-base">{feature.title}</div>
          <div className="text-sm text-khuta-neutral-700 mt-2">{feature.desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesPage() {
  return (
    <div className="py-8 bg-khuta-neutral-50 min-h-screen" dir="rtl" style={{ fontFamily: 'Cairo, Tajawal, Poppins, sans-serif' }}>
      
      {/* هيدر بتدرج هادئ */}
      <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl overflow-hidden p-8 bg-white border border-khuta-neutral">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-khuta-primary-700">مزايا منصة خطى — تعليم رقمي مبتكر</h1>
                <p className="mt-3 text-khuta-neutral-800 max-w-2xl text-lg">منصة تربط بين أفضل الممارسات والأدوات الذكية لتمكين المتعلم بسرعة وفعالية.</p>
                <div className="mt-6 flex gap-3">
                  <Button to="/pricing" leftIcon={<ArrowRight className="w-4 h-4" />} className="px-6 py-3 rounded-full bg-khuta-accent-500 text-white font-bold shadow hover:bg-khuta-accent-700">ابدأ خطة تجريبية</Button>
                  <Button to="/contact" leftIcon={<Mail className="w-4 h-4" />} variant="secondary" className="px-5 py-3 rounded-full border border-khuta-primary-400 text-khuta-primary-700 bg-white">تواصل مع الفريق</Button>
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <SmartImage src={HeroCardsImg} alt="بطاقات مزايا خطى" ratio="4:3" />
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar هادئ */}
        <aside className="lg:col-span-3 hidden lg:block">
          <nav className="sticky top-24 bg-white p-4 rounded-2xl shadow border border-khuta-neutral-200">
            <ul className="space-y-2 text-right">
              <li><a href="#features" className="block px-3 py-2 rounded hover:bg-khuta-neutral-100 font-medium text-khuta-primary-700">المميزات</a></li>
              <li><a href="#journey" className="block px-3 py-2 rounded hover:bg-khuta-neutral-100 font-medium text-khuta-primary-700">رحلة المستخدم</a></li>
              <li><a href="#why" className="block px-3 py-2 rounded hover:bg-khuta-neutral-100 font-medium text-khuta-primary-700">لماذا نحن</a></li>
              <li><a href="#cta" className="block px-3 py-2 rounded hover:bg-khuta-neutral-100 font-medium text-khuta-primary-700">انضم الآن</a></li>
            </ul>
          </nav>
        </aside>
        
        {/* محتوى رئيسي خلفية فاتحة وبطاقات بيضاء وظلال خفيفة */}
        <main className="lg:col-span-9">
          
          {/* Features section */}
          <section id="features" className="mb-10 bg-white p-6 rounded-2xl border border-khuta-neutral">
            <h2 className="text-2xl font-bold text-khuta-primary-700 mb-6">مميزاتنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map(f => (
                <a key={f.id} href="#cta" className="group block">
                  <FeatureCard feature={f} />
                  <span className="text-xs text-khuta-secondary opacity-0 group-hover:opacity-100 transition-opacity">تعرّف أكثر</span>
                </a>
              ))}
            </div>
          </section>
          
          {/* Journey / Timeline section */}
          <section id="journey" className="mb-10 p-6 rounded-2xl bg-khuta-neutral-200">
            <h3 className="text-xl font-semibold text-khuta-accent-700 mb-4">رحلة المستخدم</h3>
            <div className="overflow-x-auto">
              <div className="flex gap-4 py-4">
                {timelineSteps.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.id} className="min-w-[160px] text-center p-4 bg-white rounded-lg shadow border border-khuta-neutral-200">
                      <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#e5e7eb] to-[#cbd5e1] text-khuta-primary-400 mb-3">
                        {Icon && <Icon className="w-5 h-5" />}
                      </div>
                      <div className="font-medium text-khuta-primary-700">{s.title}</div>
                      <div className="text-xs text-khuta-neutral-600 mt-1">مرحلة {idx + 1}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          
          {/* Why us section */}
          <section id="why" className="mb-10 bg-white p-6 rounded-2xl shadow border border-khuta-neutral-200">
            <h3 className="text-2xl font-semibold text-khuta-primary-700 mb-4">لماذا نحن؟</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reasons.map(r => {
                const Icon = r.icon;
                return (
                  <motion.div key={r.id} whileHover={{ scale: 1.03 }} className="p-4 bg-khuta-neutral-100 rounded-lg shadow border border-khuta-neutral-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-khuta-accent-50 flex items-center justify-center text-khuta-accent-700">{Icon && <Icon className="w-5 h-5" />}</div>
                      <div>
                        <div className="font-semibold text-khuta-primary-700">{r.title}</div>
                        <div className="text-sm text-khuta-neutral-700 mt-1">{r.desc}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
          
          {/* CTA section بتدرج هادئ */}
          <section id="cta" className="mb-10 text-center">
            <div className="inline-block rounded-3xl px-8 py-8" style={{ background: 'linear-gradient(90deg,#d1e3db,#7ea0cf)', boxShadow: '0 18px 48px rgba(43,108,176,0.10)' }}>
              <h3 className="text-2xl font-bold text-khuta-primary-700 mb-1">الآن هو وقت التعلّم العملي</h3>
              <p className="mt-2 text-khuta-neutral-700 mb-3">انضم الآن لآلاف الطلبة وابدأ رحلتك نحو الاحتراف والتميز.</p>
              <div className="mt-4 flex justify-center gap-3">
                <Button to="/pricing" leftIcon={<ArrowRight className="w-4 h-4" />} className="px-6 py-3 rounded-full bg-khuta-accent-500 text-white font-bold hover:bg-khuta-accent-700 transition">ابدأ تجربتك الآن</Button>
                <Button to="/contact" leftIcon={<Mail className="w-4 h-4" />} className="px-5 py-3 rounded-full bg-white border border-khuta-primary-300 text-khuta-primary-700 font-semibold hover:bg-khuta-neutral-100 transition">تواصل معنا</Button>
              </div>
            </div>
          </section>
          
        </main>
      </div>
    </div>
  );
}
