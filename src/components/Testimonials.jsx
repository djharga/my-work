import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials({ items = [] }) {
  return (
    <section className="py-10 bg-gradient-to-b from-khuta-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-khuta-primary-700 mb-7 text-center">قصص نجاح المتعلمين</h2>
        {items.length === 0 ? (
          <div className="text-center text-khuta-neutral-400 py-10">لا توجد قصص حالياً.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {items.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ scale: 1.025, boxShadow: "0 8px 30px rgba(43,108,176,0.10)" }}
                className="p-6 bg-white rounded-2xl shadow-md border border-khuta-neutral-100"
              >
                {t.type === 'video' ? (
                  <video src={t.src} poster={t.poster} controls className="w-full rounded-xl mb-4 shadow" />
                ) : (
                  <>
                    <div className="font-bold text-khuta-primary-700 text-lg">{t.name}</div>
                    <div className="text-base text-khuta-neutral-700 mt-2">{t.text}</div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
