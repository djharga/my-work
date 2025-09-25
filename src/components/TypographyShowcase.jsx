import React from 'react';

export default function TypographyShowcase() {
  return (
    <section className="container mx-auto px-4 py-8 text-right">
      <h2 className="text-2xl font-bold mb-6 text-khuta-primary-700">نماذج الخطوط المعتمدة في Khuta</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* Arabic example: Tajawal */}
        <div className="p-5 rounded-xl shadow bg-khuta-neutral-100">
          <div style={{ fontFamily: 'Tajawal, Cairo, Poppins, sans-serif' }}>
            <h3 className="text-3xl font-extrabold text-khuta-primary-700">عنوان بالعربية — Tajawal</h3>
            <p className="mt-3 text-lg text-khuta-neutral-700">هذا مثال لنص عربي يستخدم خط Tajawal، مناسب للعناوين والنص الأساسي لقراءة مريحة وواضحة.</p>
            <p className="mt-2 text-sm text-khuta-neutral-500">وزن مقترح: 700 للعناوين، 400 للنصوص.</p>
          </div>
        </div>

        {/* English example: Poppins */}
        <div className="p-5 rounded-xl shadow bg-khuta-neutral-100">
          <div style={{ fontFamily: 'Poppins, Tajawal, Cairo, sans-serif' }}>
            <h3 className="text-3xl font-extrabold text-khuta-secondary-700">English Heading — Poppins</h3>
            <p className="mt-3 text-lg text-khuta-neutral-700">This demonstrates Poppins as the complementary English typeface — geometric, clean, and modern.</p>
            <p className="mt-2 text-sm text-khuta-neutral-500">Recommended weights: 700 for headings, 400 for body.</p>
          </div>
        </div>
      </div>

      <div className="mt-7 p-5 rounded-xl bg-khuta-neutral-50 shadow">
        <span className="text-lg" style={{ fontFamily: 'Tajawal, Cairo, Poppins, sans-serif' }}>
          مثال دمج: منصة <span style={{ fontFamily: 'Poppins, Tajawal, Cairo, sans-serif' }}>Khuta Platform</span> — خطوط عربية وإنجليزية تناسب التصميم الحديث.
        </span>
      </div>
    </section>
  );
}
