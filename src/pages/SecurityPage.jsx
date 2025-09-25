import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LockHero from '../img/ewnisordseir9ahpqjkq.png';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  DocumentTextIcon,
  CameraIcon,
  KeyIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

// رسومات SVG توضيحية عصرية
const Illustrations = {
  shield: (
    <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-2" fill="none">
      <rect width="64" height="64" rx="16" fill="#F0F6FF"/>
      <ShieldCheckIcon className="w-10 h-10 mx-auto text-khuta-primary" />
    </svg>
  ),
  pdf: (
    <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-2" fill="none">
      <rect width="64" height="64" rx="16" fill="#F9F5FF"/>
      <DocumentTextIcon className="w-10 h-10 mx-auto text-purple-500" />
    </svg>
  ),
  camera: (
    <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-2" fill="none">
      <rect width="64" height="64" rx="16" fill="#FFF5F5"/>
      <CameraIcon className="w-10 h-10 mx-auto text-pink-500" />
    </svg>
  ),
  lock: (
    <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-2" fill="none">
      <rect width="64" height="64" rx="16" fill="#F5FFF8"/>
      <LockClosedIcon className="w-10 h-10 mx-auto text-green-500" />
    </svg>
  ),
  key: (
    <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-2" fill="none">
      <rect width="64" height="64" rx="16" fill="#FFFDF5"/>
      <KeyIcon className="w-10 h-10 mx-auto text-yellow-500" />
    </svg>
  ),
};

const SECURITY_FEATURES = [
  {
    id: 'f1',
    icon: Illustrations.shield,
    title: 'منع النسخ والتنزيل',
    desc: 'حماية متقدمة تمنع نسخ أو تنزيل المحتوى الحصري، لضمان حقوقك الفكرية.',
  },
  {
    id: 'f2',
    icon: Illustrations.pdf,
    title: 'منع تحويل ملفات PDF',
    desc: 'تقنيات ذكية تمنع تحويل ملفات PDF إلى صيغ قابلة للتوزيع أو الطباعة.',
  },
  {
    id: 'f3',
    icon: Illustrations.camera,
    title: 'حماية من لقطات الشاشة',
    desc: 'آليات تفاعلية تقلل من إمكانية التقاط الشاشة أثناء عرض المواد الحساسة.',
  },
  {
    id: 'f4',
    icon: Illustrations.lock,
    title: 'تشفير وحماية البيانات',
    desc: 'تشفير شامل للبيانات الشخصية وملفاتك، مع سياسات خصوصية صارمة.',
  },
  {
    id: 'f5',
    icon: Illustrations.key,
    title: 'مصادقة قوية متعددة العوامل',
    desc: 'تسجيل دخول آمن عبر المصادقة الثنائية، لضمان وصولك وحدك فقط.',
  },
];

const FAQS = [
  {
    id: 'q1',
    q: 'كيف تضمن المنصة سرية معلوماتي الشخصية؟',
    a: 'نستخدم أحدث تقنيات التشفير (SSL/TLS) وسياسات وصول مشددة، ولا يتم مشاركة بياناتك مع أي طرف ثالث.',
  },
  {
    id: 'q2',
    q: 'هل يمكن لأي شخص نسخ أو تنزيل محتواي؟',
    a: 'لا، جميع المحتويات محمية ضد النسخ والتنزيل غير المصرح به، مع مراقبة مستمرة لأي محاولة اختراق.',
  },
  {
    id: 'q3',
    q: 'ما هي إجراءات حماية الحساب؟',
    a: 'نوفر مصادقة ثنائية، وإشعارات فورية عند أي محاولة دخول مشبوهة، مع إمكانية استعادة الحساب بسهولة.',
  },
  {
    id: 'q4',
    q: 'هل يمكن تحويل ملفات PDF إلى صيغ أخرى؟',
    a: 'يتم عرض ملفات PDF عبر واجهات آمنة تمنع التحويل أو الطباعة أو التوزيع غير المصرح به.',
  },
];

function SecurityFeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      className="bg-white dark:bg-khuta-neutral-900 rounded-2xl shadow-md p-6 flex flex-col items-center text-center border border-khuta-primary/10 hover:shadow-lg transition"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {icon}
      <h3 className="font-bold text-lg text-khuta-primary mb-1">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
    </motion.div>
  );
}

function FAQCard({ faq, isOpen, onToggle }) {
  return (
    <motion.div
      className={`rounded-2xl shadow-md border border-khuta-primary/10 bg-white dark:bg-khuta-neutral-900 transition overflow-hidden`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-right focus:outline-none"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="font-semibold text-khuta-primary">{faq.q}</span>
        <ChevronDownIcon className={`w-6 h-6 text-khuta-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {isOpen && (
          <div className="px-5 pb-4 text-gray-600 dark:text-gray-300 text-sm">
            {faq.a}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function SecurityTips() {
  const tips = [
    'استخدم كلمة مرور قوية وفريدة.',
    'فعّل المصادقة الثنائية لحسابك.',
    'لا تشارك بيانات الدخول مع أي جهة.',
    'حدّث تطبيقاتك باستمرار.',
    'تجنب الشبكات العامة عند استخدام المنصة.',
  ];
  return (
    <section className="mt-8 bg-khuta-primary-50 dark:bg-khuta-primary-900/10 p-6 rounded-2xl shadow-sm">
      <h3 className="font-bold text-khuta-primary mb-4 text-lg">نصائح سريعة لتعزيز أمانك</h3>
      <ul className="space-y-3 text-sm text-khuta-neutral-700 dark:text-khuta-neutral-200">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-khuta-primary text-white font-bold text-base">✓</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SecurityPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="container mx-auto px-4 py-10 text-right font-sans space-y-10">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-6"
      >
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-full rounded-2xl overflow-hidden border border-khuta-neutral mb-4">
            <div className="relative w-full aspect-[21/9]">
              <img
                src={LockHero}
                alt="أمان وحماية بيانات المستخدم"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 960px, 1200px"
              />
            </div>
          </div>
          <ShieldCheckIcon className="w-14 h-14 text-khuta-primary mb-2 drop-shadow" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-khuta-primary leading-relaxed flex items-center gap-2">
            أمانك وحقوقك الفكرية في أيدٍ أمينة
            <span className="text-xs px-2 py-1 rounded-full bg-white border border-khuta-neutral text-khuta-secondary">معايير مؤسسة</span>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
            نلتزم بحماية خصوصيتك وحقوقك الفكرية عبر أحدث تقنيات الأمان، لتتعلم وتبدع بثقة واطمئنان في بيئة رقمية عصرية وآمنة.
          </p>
        </div>
      </motion.header>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {SECURITY_FEATURES.map((feature, idx) => (
            <SecurityFeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
              delay={idx * 0.12}
            />
          ))}
        </div>
      </section>

      <SecurityTips />

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-khuta-primary mb-6 text-center">الأسئلة الأكثر شيوعًا حول الأمان</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS.map((faq) => (
            <FAQCard
              key={faq.id}
              faq={faq}
              isOpen={openFaq === faq.id}
              onToggle={() => setOpenFaq((prev) => (prev === faq.id ? null : faq.id))}
            />
          ))}
        </div>
      </section>

      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 text-center"
      >
        <p className="text-sm text-gray-400">
          جميع إجراءات الحماية مدعومة بتقنيات متقدمة وواجهة عصرية تعكس هوية منصتنا وحرصنا على أمانك وحقوقك.
        </p>
      </motion.footer>
    </div>
  );
}