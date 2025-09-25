import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useComponentExporter } from '../hooks/useComponentExporter';
import './AchievementsPanel.css';

function CertificateCard({ cert, highlight, onDownloadImg, onDownloadPDF }) {
  const cardRef = useRef(null);

  return (
    <motion.div
      key={cert.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative perspective-1000"
    >
      <div
        ref={cardRef}
        className={`certificate-card transform-style-preserve-3d relative rounded-2xl overflow-hidden shadow-2xl`}
      >
        <div className={`card-face front p-6 rounded-2xl ${highlight ? 'highlight' : ''}`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-khuta-neutral-200">{cert.issuer}</div>
              <div className="text-xl font-bold text-white mt-2">{cert.title}</div>
              <div className="text-xs text-white/80 mt-1">{cert.level} — {cert.date}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-xs text-white/70">مصدق</div>
            </div>
          </div>
          <div className="mt-6 flex gap-3 justify-end">
            <button onClick={() => onDownloadImg(cardRef.current)} className="px-3 py-2 rounded-lg bg-white/20 text-white">
              حفظ كصورة
            </button>
            <button onClick={() => onDownloadPDF(cardRef.current)} className="px-3 py-2 rounded-lg bg-white/30 text-white">
              حفظ كـ PDF
            </button>
          </div>
        </div>
        <div className="card-face back absolute inset-0 rounded-2xl" aria-hidden="true" />
        {highlight && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="sparkles" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AchievementsPanel({ initialCertificates = [] }) {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [highlightId, setHighlightId] = useState(null);
  const { downloadAsImage, downloadAsPDF } = useComponentExporter();

  useEffect(() => {
    if (highlightId) {
      const timer = setTimeout(() => setHighlightId(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [highlightId]);

  function awardCertificate() {
    const id = `cert_${Date.now()}`;
    const newCert = {
      id,
      title: 'دورة في المراجعة الداخلية',
      issuer: 'منصة خطى',
      date: new Date().toLocaleDateString(),
      level: 'ممتاز'
    };
    setCertificates(prev => [newCert, ...prev]);
    setHighlightId(id);
  }

  return (
    <div className="achievements-panel space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">لوحة الشهادات والإنجازات</h3>
        <div className="flex items-center gap-3">
          <button onClick={awardCertificate} className="px-3 py-2 rounded-md bg-khuta-accent-500 text-white hover:shadow-[0_12px_36px_rgba(245,101,101,0.25)] transition-shadow">
            امنح شهادة
          </button>
          <button onClick={() => { navigator.clipboard && navigator.clipboard.writeText(JSON.stringify(certificates)); }} className="px-3 py-2 rounded-md bg-khuta-neutral-100">
            نسخ JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {certificates.length === 0 ? (
          <div className="p-6 rounded-xl bg-white/30 text-khuta-neutral-700">لا توجد شهادات بعد. اضغط "امنح شهادة" لإنشاء واحدة.</div>
        ) : certificates.map(cert => (
          <CertificateCard
            key={cert.id}
            cert={cert}
            highlight={highlightId === cert.id}
            onDownloadImg={downloadAsImage}
            onDownloadPDF={downloadAsPDF}
          />
        ))}
      </div>
    </div>
  );
}
