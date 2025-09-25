import React from 'react';
import Button from './Button';

export default function ProtectedFileView({ file }) {
  if (!file) return null;

  function handleDownload() {
    alert('تحذير: لا يمكن تنزيل هذا الملف من الواجهة. هذه حماية محاكاة على جانب العميل.');
  }

  return (
    <div className="mt-2">
      {file.protected ? (
        <div className="p-4 border border-yellow-200 rounded-xl bg-yellow-50 select-none flex flex-col items-start">
          <div className="text-sm text-red-700 font-bold">هذا الملف محمي</div>
          <div className="text-xs text-khuta-neutral-700 mt-1">هذه حماية واجهة فقط. الحماية الكاملة تتطلب DRM من السيرفر.</div>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleDownload} className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 font-bold">تنزيل</Button>
            <Button onClick={() => alert('عرض النسخة (محاكاة)')} className="px-3 py-1 rounded-lg bg-white border border-khuta-neutral-200 text-khuta-primary-700" variant="secondary">عرض</Button>
          </div>
        </div>
      ) : (
        <div className="p-2 flex gap-2">
          <Button onClick={(e) => { e.preventDefault(); alert('تنزيل (محاكاة)'); }} className="px-3 py-1 rounded-lg bg-khuta-accent-100 text-khuta-accent-700 font-bold">تنزيل</Button>
          <Button onClick={(e) => { e.preventDefault(); alert('عرض (محاكاة)'); }} className="px-3 py-1 rounded-lg bg-white border border-khuta-neutral-200 text-khuta-primary-700" variant="secondary">عرض</Button>
        </div>
      )}
    </div>
  );
}
