import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Star, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

// شهادات العملاء التجريبية
const TESTIMONIALS = [
  { id: 't1', name: 'أميرة', quote: 'منصة ممتازة حسّنت من أدائي الوظيفي.', role: 'خريجة' },
  { id: 't2', name: 'خالد', quote: 'الدورات مركزة وعملية جداً.', role: 'متدرب' },
  { id: 't3', name: 'ليلى', quote: 'خدمة عملاء سريعة ودعم فعّال.', role: 'مدير عمليات' }
];

// الخطط
const BASE_PLANS = [
  {
    id: 'basic',
    name: 'الخطة الأساسية',
    monthly: 199,
    desc: 'مناسبة للمبتدئين والأفراد الذين يبدأون مسارهم المهني.',
    features: ['وصول محدود للأدوات', 'مساحة تخزين 5GB', 'دورات أساسية'],
  },
  {
    id: 'pro',
    name: 'الخطة الاحترافية',
    monthly: 399,
    desc: 'للمحترفين الذين يحتاجون وصولاً كاملاً لأدواتنا وموارد متقدمة.',
    features: ['وصول كامل للأدوات الذكية', 'مساحة تخزين 50GB', 'دورات متقدمة', 'تقارير وتحليلات'],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'خطة الشركات',
    monthly: null,
    desc: 'حلول مخصصة للمؤسسات: تكامل، دعم وأمن مخصص.',
    features: ['White Labeling', 'تكامل سسستمز', 'دعم مخصص', 'سعة تخزين مرنة'],
  }
];

export default function PricingPage() {
  const [yearly, setYearly] = React.useState(true);

  const plans = React.useMemo(() => {
    return BASE_PLANS.map(p => {
      if (p.monthly == null) return { ...p, priceLabel: 'اتفاق مخصص' };
      const monthly = p.monthly;
      const yearlyPrice = Math.round(monthly * 12 * 0.83); // خصم ~17%
      const label = yearly ? `${yearlyPrice} ر.س / سنة` : `${monthly} ر.س / شهر`;
      return { ...p, priceLabel: label };
    });
  }, [yearly]);

  return (
    <div className="container mx-auto px-4 text-right py-8 space-y-8">
      {/* رأس الصفحة */}
      <header className="text-right">
        <h1 className="text-2xl sm:text-3xl font-bold text-khuta-primary">اختر الخطة التي تناسب أهدافك المهنية</h1>
        <p className="mt-2 text-khuta-neutral-700">جميع الخطط تأتي مع وصول كامل لأدواتنا الذكية، اختر ما يناسبك وابدأ فورًا.</p>
      </header>

      {/* قسم الخطط والتوصيات */}
      <section>
        {/* تبديل شهري / سنوي */}
        <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-2 bg-white border border-khuta-neutral rounded-full px-2 py-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-3 py-1 rounded-full text-sm ${!yearly ? 'bg-khuta-primary text-white' : 'text-khuta-primary'}`}
              aria-pressed={!yearly}
            >
              شهري
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-3 py-1 rounded-full text-sm ${yearly ? 'bg-khuta-primary text-white' : 'text-khuta-primary'}`}
              aria-pressed={yearly}
            >
              سنوي (خصم)
            </button>
          </div>
          <span className="ml-3 text-sm text-khuta-secondary">ادفع سنوياً ووفر 17%</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* خطط الاشتراك */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map(plan => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.035 }}
                  transition={{ type: 'spring', stiffness: 350 }}
                  className={`relative p-6 rounded-xl shadow-sm border bg-white ${plan.popular ? 'ring-2 ring-khuta-primary/20' : 'border-gray-200'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-4 bg-khuta-primary text-white text-xs px-4 py-1 rounded-full shadow-md">الأكثر شيوعًا</div>
                  )}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="text-lg font-bold text-khuta-primary">{plan.name}</div>
                      <div className="text-sm text-khuta-neutral-700 mt-1">{plan.desc}</div>
                    </div>
                    <div className="text-2xl font-extrabold text-khuta-primary">{plan.priceLabel}</div>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckIcon className="w-5 h-5 text-khuta-success" />
                        <span className="text-khuta-neutral-800">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <Button to="#" leftIcon={<ArrowRight className="w-4 h-4" />} className={`inline-block w-full text-center px-4 py-2 rounded font-bold`} ariaLabel={`اشترك في ${plan.name}`} variant={plan.popular ? 'primary' : 'secondary'}>
                      {plan.popular ? 'اشترك الآن' : 'اختر هذه الخطة وابدأ'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* التوصيات وثقة العملاء */}
          <aside className="bg-khuta-neutral-100 p-4 rounded-xl shadow space-y-4">
            <h3 className="font-bold mb-3 text-khuta-secondary">ثقة العملاء</h3>
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-khuta-neutral-500">{t.role}</div>
                  </div>
                  <div className="text-yellow-400">{Star && <Star className="w-5 h-5" />}</div>
                </div>
                <div className="text-sm text-khuta-neutral-700">“{t.quote}”</div>
              </div>
            ))}
            <div className="mt-4">
              <div className="text-xs text-khuta-neutral-600 mb-2">شركاؤنا وعمائلنا</div>
              <div className="flex items-center gap-2">
                {[...Array(3)].map((_, idx) => <div key={idx} className="w-10 h-6 bg-gray-200 rounded" />)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* الأسئلة الشائعة أسفل البطاقات */}
      <section className="bg-khuta-neutral-50 dark:bg-khuta-neutral-800 p-6 rounded-xl shadow-sm">
        <h3 className="font-bold mb-4 text-khuta-primary-800">أسئلة حول الأسعار</h3>
        <FAQAccordion />
      </section>

      {/* جدول مقارنة الخطط */}
      <section className="bg-khuta-neutral-100 dark:bg-khuta-neutral-900 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-khuta-primary">مقارنة تفصيلية بين الخطط</h2>
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse text-right text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">الميزة</th>
                <th className="px-4 py-2 border-b">الخطة الأساسية</th>
                <th className="px-4 py-2 border-b">الخطة الاحترافية</th>
                <th className="px-4 py-2 border-b">خطة الشركات</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-khuta-neutral-50 dark:bg-khuta-neutral-800 font-medium">
                <td colSpan={4} className="px-4 py-2">الميزات الأساسية</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-t">مساحة التخزين</td>
                <td className="px-4 py-3 border-t">5GB</td>
                <td className="px-4 py-3 border-t">50GB</td>
                <td className="px-4 py-3 border-t">مرنة حسب الاتفاق</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-t">عدد الدورات</td>
                <td className="px-4 py-3 border-t">محدود</td>
                <td className="px-4 py-3 border-t">غير محدود</td>
                <td className="px-4 py-3 border-t">حسب الاتفاق</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800 font-medium">
                <td colSpan={4} className="px-4 py-2">أدوات الذكاء الاصطناعي</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-t">المراجع الآلي</td>
                <td className="px-4 py-3 border-t">❌</td>
                <td className="px-4 py-3 border-t">✅</td>
                <td className="px-4 py-3 border-t">✅</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-t">محلل المخاطر الذكي</td>
                <td className="px-4 py-3 border-t">❌</td>
                <td className="px-4 py-3 border-t">✅</td>
                <td className="px-4 py-3 border-t">✅</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800 font-medium">
                <td colSpan={4} className="px-4 py-2">الدعم والمساندة</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-t">دعم العملاء</td>
                <td className="px-4 py-3 border-t">بريد إلكتروني</td>
                <td className="px-4 py-3 border-t">دردشة حية + بريد</td>
                <td className="px-4 py-3 border-t">دعم مخصص (SLA)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-t">White Labeling</td>
                <td className="px-4 py-3 border-t">—</td>
                <td className="px-4 py-3 border-t">—</td>
                <td className="px-4 py-3 border-t">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* حلول الشركات */}
      <section className="bg-khuta-neutral-100 dark:bg-khuta-neutral-900 p-6 rounded-xl shadow">
        <h2 className="font-bold text-khuta-secondary-700">White Labeling وحلول الشركات</h2>
        <p className="mt-2 text-khuta-neutral-700 dark:text-gray-300">نقدم حلول White Labeling مخصصة للمنظمات التي تحتاج إلى منصة تحت اسمها وعلامتها التجارية مع تحكم كامل في المظهر والتكاملات.</p>
        <p className="mt-2 text-khuta-neutral-700 dark:text-gray-300">هذه الخدمة تتضمن نطاقات مخصصة، تخصيص واجهة المستخدم، ودعم تكامل أنظمة المؤسسات.</p>
        <div className="mt-4">
          <Button to="/contact" leftIcon={<Mail className="w-4 h-4" />} className="px-4 py-2 rounded glow-button font-bold" ariaLabel="تواصل مع المبيعات">
            تواصل سريع مع المبيعات
          </Button>
        </div>
      </section>

      {/* الأسئلة الشائعة (أكوردون) */}
      <section className="bg-khuta-neutral-50 dark:bg-khuta-neutral-800 p-6 rounded-xl shadow">
        <h3 className="font-bold mb-4 text-khuta-primary-800">الأسئلة الشائعة حول الأسعار</h3>
        <FAQAccordion />
      </section>
    </div>
  );
}

// أكوردون الأسئلة الشائعة - احترافي وديناميكي
function FAQAccordion() {
  const items = [
    { q: 'هل يمكنني الترقية أو التخفيض في أي وقت؟', a: 'نعم، يمكنك الترقية أو التخفيض في أي وقت عبر لوحة التحكم وستُحتسب التغييرات وفق سياسة الحسابات.' },
    { q: 'هل يوجد فترة تجريبية مجانية؟', a: 'نقدم عروضًا تجريبية محددة بحسب الحملات الحالية، راجع صفحة العروض أو تواصل مع المبيعات.' },
    { q: 'ما مميزات خطة الشركات؟', a: 'خطة الشركات تتضمن White Labeling، تكامل أنظمة، دعم مخصص واتفاقيات مستوى خدمة SLA.' }
  ];
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={idx} className="border rounded-xl overflow-hidden bg-white dark:bg-khuta-neutral-900">
          <button
            onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
            className="w-full text-right px-5 py-3 flex items-center justify-between font-semibold text-khuta-primary-800"
          >
            <span>{it.q}</span>
            <span className="text-sm text-khuta-secondary">{openIdx === idx ? '−' : '+'}</span>
          </button>
          {openIdx === idx && (
            <div className="px-5 pb-3 text-sm text-khuta-neutral-700 dark:text-gray-300">{it.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// أزيل تأثير glow-button الديناميكي للحفاظ على هدوء الهوية
