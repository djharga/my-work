import React from 'react';
import { motion } from 'framer-motion';

export default function LearningJourney({ steps = [] }) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-khuta-primary-900 mb-4">رحلة التعلم</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-6 items-start">
            {steps.map((s, i) => (
              <motion.div key={s.id} whileInView={{ y: 0, opacity: 1 }} initial={{ y: 10, opacity: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="min-w-[180px] bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-[var(--muted-accent)] text-white mb-3">
                  {s.icon && <s.icon className="w-6 h-6" />}
                </div>
                <div className="font-semibold text-khuta-primary-900">{s.title}</div>
                <div className="text-xs text-khuta-neutral-600 mt-1">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 