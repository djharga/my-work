import React from 'react';
import { motion } from 'framer-motion';

export default function VideoSection({ title, subtitle, videoSrc, poster }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-12">
      <motion.div
        className="order-1 lg:order-0"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-h2 md:text-h1 font-bold text-khuta-primary-700 mb-3">{title}</h2>
        <p className="text-body-base text-khuta-neutral-700">{subtitle}</p>
        <div className="mt-4">
          <button className="px-6 py-3 rounded-xl bg-khuta-accent-500 text-white font-semibold shadow hover:bg-khuta-accent-600 transition-colors">
            تعرف علينا أكثر
          </button>
        </div>
      </motion.div>
      <motion.div
        className="order-0 lg:order-1"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <video
          src={videoSrc}
          controls
          playsInline
          muted
          loop
          poster={poster}
          className="w-full rounded-xl shadow-xl object-cover bg-khuta-neutral-100"
        />
      </motion.div>
    </section>
  );
}
