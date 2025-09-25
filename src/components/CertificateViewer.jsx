import React from 'react';
import Button from './Button';

export default function CertificateViewer({
  name = 'أحمد المتدرب',
  course = 'دورة: أساسيات المراجعة الداخلية',
  date = '2025-09-23',
  id = 'CERT-20250923-001'
}) {
  function downloadPDF() {
    // simulate by opening print dialog
    window.print();
  }

  function shareLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`تلقيت شهادة ${course} — ${name}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  }

  return (
    <div className="p-7 bg-khuta-neutral-50 rounded-2xl shadow-xl max-w-3xl mx-auto text-center my-10">
      <div className="border border-khuta-primary-100 p-8 rounded-xl bg-white shadow-sm">
        <h2 className="text-3xl font-bold text-khuta-primary-700 mb-3">شهادة إتمام</h2>
        <div className="text-lg mb-5 text-khuta-accent-700">تُمنح هذه الشهادة لـ</div>
        <div className="text-2xl font-semibold text-khuta-primary-900 mb-2">{name}</div>
        <div className="text-base text-khuta-neutral-700 mb-5">لإتمامه بنجاح: <span className="font-semibold">{course}</span></div>
        <div className="flex justify-center gap-6 mb-5">
          <div className="text-xs text-khuta-neutral-700">التاريخ: {date}</div>
          <div className="text-xs text-khuta-neutral-700">الرقم المرجعي: {id}</div>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <Button onClick={downloadPDF} className="px-5 py-2 rounded bg-khuta-accent-500 text-white font-bold hover:bg-khuta-accent-700 transition">تحميل PDF</Button>
          <Button onClick={shareLinkedIn} className="px-5 py-2 rounded bg-white border border-khuta-primary-300 text-khuta-primary-700 font-semibold hover:bg-khuta-neutral-100 transition" variant="secondary">مشاركة على LinkedIn</Button>
        </div>
      </div>
    </div>
  );
}
