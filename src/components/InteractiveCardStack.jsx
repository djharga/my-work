import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Card from './Card';

const INITIAL_CARDS = [
  { id: 1, title: 'أساسيات المراجعة', subtitle: 'مقدمة عملية لمهارات المراجعة.' },
  { id: 2, title: 'مهارات القيادة', subtitle: 'بناء مهارات قيادة الفرق وإدارة الأداء.' },
  { id: 3, title: 'إدارة المخاطر', subtitle: 'استراتيجيات لتحديد وتخفيف المخاطر.' },
  { id: 4, title: 'التحقيقات الداخلية', subtitle: 'منهجيات التحقيق وجمع الأدلة.' },
  { id: 5, title: 'حوكمة الشركات', subtitle: 'أُطر الحوكمة والضوابط الداخلية.' }
];

export default function InteractiveCardStack({ initial = INITIAL_CARDS }) {
  const [cards, setCards] = useState(initial);

  function handleFlick(id) {
    setCards(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div className="relative w-full h-96 flex items-center justify-center bg-khuta-neutral-50 rounded-2xl shadow-inner">
      <AnimatePresence>
        {cards.map((card, idx) => {
          const pos = cards.length - 1 - idx; // 0 = top
          const scale = 1 - pos * 0.03;
          const y = pos * 12;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: scale - 0.02, y: y + 8 }}
              animate={{ opacity: 1, scale, y }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ duration: 0.35 }}
              className="absolute w-[300px] max-w-sm"
              style={{ zIndex: idx }}
            >
              <Card item={card} onFlick={handleFlick} />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {cards.length === 0 && (
        <div className="text-center text-khuta-neutral-600 font-medium">
          لا توجد بطاقات حالياً — أعد تحميل الصفحة لإعادة الحالة الافتراضية.
        </div>
      )}
    </div>
  );
}
