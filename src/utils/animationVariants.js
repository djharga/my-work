// متحركات إبداعية للانتقالات والعرض والحضور (Framer Motion)

export const sectionVariants = {
  initial:      { opacity: 0, y: 64, scale: 0.97, rotate: -2 },   // يبدأ بتدوير بسيط من تحت
  whileInView:  { opacity: 1, y: 0, scale: 1, rotate: 0 },        // يدخل بسلاسة ويثبت مكانه
  viewport:     { once: true, amount: 0.33 },
  transition:   { duration: 0.68, ease: "easeOut" },
};

// ظهور item بإبداع: نبضة + ركزة خفيفة
export const itemVariants = {
  initial:      { opacity: 0, scale: 0.92, y: 16 },
  whileInView:  { opacity: 1, scale: 1, y: 0, boxShadow: "0 6px 32px rgba(43,108,176,0.09)" },
  viewport:     { once: true, amount: 0.32 },
  transition:   { duration: 0.47, type: "spring", stiffness: 380, damping: 26 }
};

// Fade In Line من تحت أو فوق
export const fadeLine = {
  initial:      { opacity: 0, scaleX: 0.8, x: -32 },
  whileInView:  { opacity: 1, scaleX: 1, x: 0 },
  viewport:     { once: true, amount: 0.18 },
  transition:   { duration: 0.62, ease: "easeOut" },
};

// الدخول مع قفز bounce (عنصر رئيسي أو زر)
export const bounceIn = {
  initial:      { opacity: 0, y: -42, scale: 0.85 },
  whileInView:  { opacity: 1, y: 0, scale: 1 },
  viewport:     { once: true, amount: 0.36 },
  transition:   { duration: 0.62, type: "spring", bounce: 0.44 },
};

// دوران فريد مع Scale وOpacity (للبطاقات/أزرار)
export const rotateScale = {
  initial:      { opacity: 0, scale: 0.85, rotate: -11 },
  whileInView:  { opacity: 1, scale: 1, rotate: 0 },
  viewport:     { once: true, amount: 0.26 },
  transition:   { duration: 0.73, ease: "backOut" },
};

// ظهور بسيط مع نبض داخلي خفيف
export const pulseIn = {
  initial:      { opacity: 0, scale: 0.91 },
  whileInView:  { opacity: 1, scale: [1.05, 0.98, 1], boxShadow: "0 8px 32px rgba(43,108,176,0.08)" },
  viewport:     { once: true, amount: 0.22 },
  transition:   { duration: 0.61, type: "spring", stiffness: 330 }
};

// حركة Slide مع التلاشي من الجنبين (يمين/يسار)
export const creativeSlideRight = {
  initial:      { opacity: 0, x: 80, skew: -7 },
  whileInView:  { opacity: 1, x: 0, skew: 0 },
  viewport:     { once: true, amount: 0.24 },
  transition:   { duration: 0.58, ease: "easeOut" },
};

export const creativeSlideLeft = {
  initial:      { opacity: 0, x: -80, skew: 7 },
  whileInView:  { opacity: 1, x: 0, skew: 0 },
  viewport:     { once: true, amount: 0.24 },
  transition:   { duration: 0.58, ease: "easeOut" },
};

// تأثير border ينبض في الدخول (مناسب للبطاقات المهمة)
export const borderPulse = {
  initial:      { boxShadow: "0 0 0 0 rgba(43,108,176,0.20)", opacity: 0 },
  whileInView:  { boxShadow: ["0 0 0 0 rgba(43,108,176,0.24)", "0 0 0 8px rgba(43,108,176,0.09)", "0 0 0 0 rgba(43,108,176,0.28)"], opacity: 1 },
  viewport:     { once: true, amount: 0.11 },
  transition:   { duration: 0.88, ease: "easeOut" },
};

// حركة كلمة شبيهة animate typing سريعة  
export const creativeType = {
  initial: { opacity: 0, letterSpacing: "-0.2em" },
  animate: { opacity: 1, letterSpacing: "0.04em" },
  transition: { duration: 0.62, ease: "easeOut" },
};


/*
طريقة الاستخدام الإبداعية الجديدة:
<motion.section
  variants={bounceIn}
  initial="initial"
  whileInView="whileInView"
  viewport={bounceIn.viewport}
  transition={bounceIn.transition}
/>
*/
