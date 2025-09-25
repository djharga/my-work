import React, { useEffect, useState, useRef } from 'react';

// هوك مخصص للعد التصاعدي عند رؤية العنصر
function useCountUpOnInView(to, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const startTime = performance.now();

          const tick = (now) => {
            const t = Math.min(1, (now - startTime) / duration);
            const currentCount = Math.round(t * (to - start) + start);
            setCount(currentCount);

            if (t < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
          observer.disconnect(); // أوقف المراقبة بعد بدء الرسوم المتحركة
        }
      },
      { threshold: 0.5 } // ابدأ عندما يكون 50% من العنصر مرئيًا
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [to, duration]);

  return { ref, count };
}

function Counter({ value, label }) {
  const { ref, count } = useCountUpOnInView(value, 1400);

  return (
    <div ref={ref} className="p-7 bg-white rounded-2xl shadow border border-khuta-neutral-100 text-center flex flex-col items-center">
      <div className="text-3xl font-extrabold text-khuta-accent-500 tracking-wide transition">
        {count.toLocaleString()}
      </div>
      <div className="text-base text-khuta-primary-700 font-medium mt-2">{label}</div>
    </div>
  );
}

export default function AnimatedCounters({ stats = [] }) {
  return (
    <section className="py-10 bg-khuta-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
          {stats.map((s) => <Counter key={s.id} value={s.value} label={s.label} />)}
        </div>
      </div>
    </section>
  );
}
