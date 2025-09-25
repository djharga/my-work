import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Circle, Star, Medal } from 'lucide-react';

export default function StudentTimeline({
  stages = [],
  currentStep = 0,
  onAdvance = () => {},
  onComplete = () => {},
  className = ''
}) {
  useEffect(() => {
    if (currentStep > 0 && currentStep <= stages.length) {
      // encouragement voice
      if ('speechSynthesis' in window) {
        const msg = new window.SpeechSynthesisUtterance(`تهانينا! أنت الآن في مرحلة ${stages[currentStep - 1]?.title || currentStep}`);
        msg.lang = 'ar-SA';
        msg.rate = 0.95;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
      }
    }
    if (currentStep >= stages.length) {
      try { onComplete(); } catch (e) {}
    }
  }, [currentStep]);

  const progressPct = stages.length ? Math.min(100, Math.round((currentStep / stages.length) * 100)) : 0;

  return (
    <div className={`student-timeline ${className}`}>
      <div className="timeline-header flex items-center justify-between mb-4">
        <h4 className="font-semibold text-khuta-primary-700">مسار الطالب</h4>
        <div className="text-sm text-khuta-neutral-600">التقدم: {progressPct}%</div>
      </div>

      <div className="relative my-6">
        {/* bar background */}
        <div className="h-2 bg-khuta-neutral-200 rounded-full" />
        {/* bar fill */}
        <motion.div
          className="absolute left-0 top-0 h-2 rounded-full bg-khuta-accent-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ zIndex: 1 }}
        />

        {/* stage dots */}
        <div className="absolute left-0 top-0 w-full flex items-center justify-between mt-[-6px] pointer-events-none">
          {stages.map((s, i) => {
            const completed = i < currentStep;
            const active = i === Math.max(0, currentStep - 1);
            return (
              <div key={s.id || i} className="flex flex-col items-center w-1/6 min-w-[48px] text-center">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  animate={{ scale: active ? 1.13 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${completed
                    ? 'bg-khuta-accent-500 border-khuta-accent-500 text-white shadow-lg'
                    : 'bg-white border-khuta-neutral-300 text-khuta-neutral-700'}`}
                  style={{ zIndex: 3 }}
                >
                  {completed ? (<Check className="w-6 h-6" />) : (<Circle className="w-4 h-4" />)}
                </motion.div>

                <div className="mt-2 text-xs w-20 text-right text-khuta-primary-700">{s.title}</div>
                {/* badge popup */}
                <AnimatePresence>
                  {completed && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: -12 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="mt-2">
                      <div className="px-2 py-1 bg-white rounded-full shadow text-xs flex items-center gap-2 border border-khuta-neutral-100">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-khuta-neutral-700">متفوق</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* تفاصيل كل مرحلة */}
      <div className="timeline-details grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {stages.map((s, i) => {
          const completed = i < currentStep;
          return (
            <motion.div
              key={s.id || i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`p-4 rounded-xl border ${completed
                ? 'bg-white border-khuta-accent-100 shadow'
                : 'bg-khuta-neutral-100 border-khuta-neutral-100'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-khuta-primary-700">{s.title}</div>
                  <div className="text-xs text-khuta-neutral-700 mt-1">{s.desc}</div>
                </div>
                <div>
                  {completed ? (
                    <div className="text-sm text-khuta-accent-500 flex items-center gap-2 font-bold">
                      <Medal className="w-5 h-5" /> <span>مكتمل</span>
                    </div>
                  ) : (
                    <div className="text-sm text-khuta-neutral-500">قادم</div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 flex gap-3 justify-end">
        <button onClick={() => onAdvance(Math.max(0, currentStep - 1))} className="px-4 py-2 rounded bg-khuta-neutral-100 font-bold text-khuta-primary-700 hover:bg-khuta-neutral-200 transition">تراجع</button>
        <button onClick={() => onAdvance(Math.min(stages.length, currentStep + 1))} className="px-4 py-2 rounded bg-khuta-accent-500 text-white font-bold hover:bg-khuta-accent-600 transition">تقدّم</button>
      </div>
    </div>
  );
}
