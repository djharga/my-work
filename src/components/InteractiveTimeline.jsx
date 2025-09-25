import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const EVENTS = [
  { id: 1, title: 'إطلاق المنصة', date: 'يناير 2024', desc: 'الإصدار الأولي لمنصة Khuta مع الميزات الأساسية.' },
  { id: 2, title: 'إضافة الزمالة', date: 'أبريل 2024', desc: 'إطلاق برنامج الزمالة التجريبي للمراجعين الداخليين.' },
  { id: 3, title: 'أدوات AI', date: 'سبتمبر 2024', desc: 'دمج أدوات AI للمساعدة في التحليل وإنشاء المحتوى.' },
  { id: 4, title: 'شراكات الشركات', date: 'فبراير 2025', desc: 'بدء شراكات White-label وخطط الشركات.' }
];

export default function InteractiveTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  // map scroll progress to line scale (0..1)
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8 text-right">خريطة الطريق</h2>

      <div ref={containerRef} className="relative">
        {/* vertical line (animated fill) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true">
          <motion.div
            className="origin-top w-full bg-khuta-primary"
            style={{ scaleY: lineScale }}
          />
        </div>

        <div className="space-y-12">
          {EVENTS.map((ev, idx) => (
            <TimelineItem key={ev.id} event={ev} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, index }) {
  const itemRef = useRef(null);
  const inView = useInView(itemRef, { once: true, margin: '-20%' });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div ref={itemRef} className="relative flex items-start gap-6 md:gap-10">
      {/* spacer to position content to right (RTL) */}
      <div className="flex-1 md:flex-none md:w-1/2 text-right">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="bg-khuta-neutral-100 dark:bg-khuta-neutral-900 p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-lg">{event.title}</div>
              <div className="text-xs text-gray-500 mt-1">{event.date}</div>
            </div>
            <div className="hidden md:block text-sm text-gray-500">{/* placeholder for spacing */}</div>
          </div>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{event.desc}</p>
        </motion.div>
      </div>

      {/* timeline marker */}
      <div className="w-12 flex flex-col items-center">
        <div className="h-6 flex items-center justify-center">
          <motion.div
            className={`w-6 h-6 rounded-full border-2 border-khuta-primary bg-khuta-neutral-100`}
            animate={{ backgroundColor: inView ? '#0A2E5B' : '#ffffff', scale: inView ? 1.05 : 1 }}
            transition={{ duration: 0.45 }}
            aria-hidden="true"
          />
        </div>
        {/* connector spacing */}
        <div className="flex-1 w-px" aria-hidden="true" />
      </div>

      {/* small screens: show content below marker */}
      <div className="md:hidden flex-1 text-right">
        {/* duplicate content for mobile if needed (kept simple) */}
      </div>
    </div>
  );
} 