import React, { useState } from 'react';
import ProtectedFileView from './ProtectedFileView';
import Button from './Button';

export default function FileTreeViewer({ files = [] }) {
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dummyFiles = files.length ? files : [
    { id: 'f1', name: 'دليل المراجعة.pdf', type: 'pdf', protected: true },
    { id: 'f2', name: 'ملاحظات-المحاضر.docx', type: 'docx', protected: false },
    { id: 'f3', name: 'محاضرة-1.mp4', type: 'video', protected: false }
  ];

  function handleOpenFile(file) {
    if (file.protected) {
      alert('تحذير: هذا الملف محمي. لا يمكن تنزيل هذا الملف من الواجهة فقط.');
      return;
    }
    setPreview(file);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setShowModal(false);
    setPreview(null);
    document.body.style.overflow = '';
  }

  return (
    <div className="max-w-2xl mx-auto py-9">
      <div className="space-y-2">
        {dummyFiles.map(file => (
          <div
            key={file.id}
            className={`flex items-center justify-between p-3 rounded-xl shadow border ${file.protected ? 'bg-yellow-50 border-yellow-200' : 'bg-khuta-neutral-100 border-khuta-neutral-200'}`}
            aria-label={`ملف ${file.name}`}
            onContextMenu={(e) => { e.preventDefault(); }}
          >
            <div className="flex items-center gap-3 select-none">
              <span className="w-8 h-8 flex items-center justify-center bg-khuta-neutral-200 rounded-lg font-bold text-khuta-primary-700">
                {file.type === 'pdf' ? 'PDF' : file.type === 'video' ? 'VID' : 'DOC'}
              </span>
              <div>
                <div className="font-bold text-khuta-primary-700">{file.name}</div>
                {file.protected && <div className="text-xs text-yellow-800 font-semibold">محمي - تنزيل غير متاح</div>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => handleOpenFile(file)} className="px-3 py-1 rounded text-sm shadow hover:bg-khuta-accent-100 transition" ariaLabel={`فتح ${file.name}`}>
                فتح
              </Button>
              <button onClick={() => alert('تتبع التعديلات (محاكاة)')} className="px-3 py-1 border rounded text-sm bg-white shadow hover:bg-khuta-neutral-50 transition" aria-label={`تتبع ${file.name}`}>
                تتبع
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {showModal && preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30" role="dialog" aria-modal="true">
          <div className="bg-white rounded-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-auto shadow-xl p-5">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-khuta-primary-700">معاينة: {preview.name}</h3>
              <Button onClick={closeModal} ariaLabel="إغلاق المعاينة" className="px-3 py-1 border rounded shadow hover:bg-khuta-neutral-100 transition">
                إغلاق
              </Button>
            </div>

            <div className="mt-5">
              {/* Simulated preview */}
              {preview.type === 'pdf' ? (
                <div className="border rounded p-4 text-sm text-khuta-neutral-700 bg-khuta-neutral-50">
                  معاينة PDF (محاكاة): لا يتم تنزيل الملف من الواجهة. هذه معاينة وهمية.
                </div>
              ) : preview.type === 'video' ? (
                <div className="rounded overflow-hidden bg-black">
                  <video controls className="w-full max-h-80 rounded">
                    <source src="" />
                    متصفحك لا يدعم الفيديو.
                  </video>
                </div>
              ) : (
                <div className="border rounded p-4 text-sm text-khuta-neutral-700 bg-khuta-neutral-50">
                  معاينة ملف نصي/مستند (محاكاة)
                </div>
              )}
            </div>

            <div className="mt-3 text-right">
              <ProtectedFileView file={preview} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
