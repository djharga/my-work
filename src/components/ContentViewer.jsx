import React, { useState } from 'react';
import FileTreeViewer from './FileTreeViewer';
import Modal from './Modal';
import { PencilIcon, LinkIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const SAMPLE_FILES = [
  { id: 'f1', name: 'مقدمة - فيديو.mp4', type: 'video', src: '' },
  { id: 'f2', name: 'مخطط الدورة.pdf', type: 'pdf', src: '' },
  { id: 'f3', name: 'تمارين.xlsx', type: 'excel', src: '' },
  { id: 'f4', name: 'ملخص صوتي.mp3', type: 'audio', src: '' },
  { id: 'f5', name: 'نص المحاضرة.docx', type: 'word', src: '' }
];

export default function ContentViewer({ files = SAMPLE_FILES }) {
  const [selected, setSelected] = useState(files[0]);
  const [renaming, setRenaming] = useState(null);
  const [nameDraft, setNameDraft] = useState('');
  const [shareOpen, setShareOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [sharedLink, setSharedLink] = useState('');

  function startRename(file) {
    setRenaming(file.id);
    setNameDraft(file.name);
  }

  function applyRename(id) {
    const idx = files.findIndex(f => f.id === id);
    if (idx >= 0) files[idx].name = nameDraft;
    setRenaming(null);
    if (selected.id === id) setSelected({ ...files[idx] });
  }

  function openShare(file) {
    const token = Math.random().toString(36).slice(2, 10);
    const link = `${window.location.origin}/protected/${file.id}?t=${token}`;
    setSharedLink(link);
    setShareOpen(true);
  }

  function getHistory(file) {
    return [
      { at: '2025-09-01 09:12', by: 'admin', action: 'أنشئ الملف' },
      { at: '2025-09-05 14:02', by: 'instructor', action: 'عدل الاسم' },
      { at: '2025-09-10 08:44', by: 'system', action: 'تمت المشاركة' }
    ];
  }

  function renderViewer(file) {
    if (!file) return <div className="p-6">لم يتم تحديد ملف</div>;
    switch (file.type) {
      case 'video':
        return (
          <div className="w-full">
            <video controls className="w-full rounded-2xl shadow bg-black">
              <source src={file.src} />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>
        );
      case 'pdf':
        return (
          <div className="w-full h-[70vh]">
            <object data={file.src || ''} type="application/pdf" className="w-full h-full rounded-2xl border">
              <p>المستند غير متوفر للعرض. يمكنك تحميله <a href={file.src || '#'} className="text-khuta-primary underline">من هنا</a>.</p>
            </object>
          </div>
        );
      case 'audio':
        return (
          <div className="w-full">
            <audio controls className="w-full rounded-lg bg-white">
              <source src={file.src} />
              متصفحك لا يدعم تشغيل الصوت.
            </audio>
          </div>
        );
      case 'excel':
      case 'word':
        return (
          <div className="p-6 bg-khuta-neutral-50 rounded-xl">
            <p className="mb-4">هذا النوع من الملفات لا يمكن عرضه داخليًا. اختر تنزيله أو فتحه خارجيًا.</p>
            <Button to={file.src || '#'} className="px-4 py-2 rounded-full bg-khuta-accent-500 text-white font-bold">تحميل الملف</Button>
          </div>
        );
      default:
        return <div className="p-6">نوع الملف غير مدعوم للعروض المباشرة.</div>;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* المحتوى الرئيسي */}
        <div className="lg:col-span-7">
          <div className="bg-khuta-neutral-100 rounded-2xl p-6 shadow">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="w-7 h-7 text-khuta-primary-700" />
                {!renaming || renaming !== selected.id ? (
                  <h2 className="text-lg font-semibold text-khuta-primary-700">{selected.name}</h2>
                ) : (
                  <div className="flex items-center gap-2">
                    <input value={nameDraft} onChange={e => setNameDraft(e.target.value)}
                      className="border p-2 rounded-lg bg-white text-khuta-primary-800 font-bold" />
                    <Button onClick={() => applyRename(selected.id)} className="px-3 py-2 rounded-full bg-khuta-accent-500 text-white font-bold">حفظ</Button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startRename(selected)} className="px-3 py-2 bg-white border rounded-lg shadow-sm inline-flex items-center gap-1 font-semibold text-khuta-primary-700 hover:bg-khuta-neutral-50"><PencilIcon className="w-5 h-5" /> تعديل الاسم</button>
                <button onClick={() => openShare(selected)} className="px-3 py-2 bg-white border rounded-lg shadow-sm inline-flex items-center gap-1 font-semibold text-khuta-primary-700 hover:bg-khuta-neutral-50"><LinkIcon className="w-5 h-5" /> مشاركة</button>
                <button onClick={() => setHistoryOpen(true)} className="px-3 py-2 bg-white border rounded-lg shadow-sm inline-flex items-center gap-1 font-semibold text-khuta-primary-700 hover:bg-khuta-neutral-50"><ClockIcon className="w-5 h-5" /> سجل الإصدارات</button>
              </div>
            </div>
            <div className="border rounded-2xl overflow-hidden bg-white shadow-md">
              {renderViewer(selected)}
            </div>
          </div>
        </div>

        {/* الشريط الجانبي */}
        <aside className="lg:col-span-3 space-y-5">
          <div className="bg-khuta-neutral-100 p-5 rounded-2xl shadow-md">
            <h3 className="font-bold mb-3 text-khuta-primary-700">ملفات الدورة</h3>
            {/* قائمة ملفات الدورة */}
            <FileTreeViewer files={files} />
          </div>

          <div className="bg-khuta-neutral-100 p-5 rounded-2xl shadow-md">
            <h3 className="font-bold mb-2 text-khuta-primary-700">ملاحظات صوتية</h3>
            <p className="text-sm text-khuta-neutral-600 mb-3">سجل أو استمع إلى ملحوظات صوتية مرتبطة بهذه الدورة.</p>
            <div className="flex gap-2">
              <Button className="px-3 py-2 rounded-full bg-khuta-accent-500 text-white font-bold">سجل ملاحظة</Button>
              <button className="px-3 py-2 rounded-full bg-white border text-khuta-primary-700 font-semibold">استعرض الملاحظات</button>
            </div>
          </div>
        </aside>
      </div>

      {/* مودال المشاركة */}
      {shareOpen && (
        <Modal isOpen={shareOpen} onClose={() => setShareOpen(false)}>
          <div>
            <h2 className="text-xl font-bold mb-3 text-khuta-accent-500">رابط محمي للمشاركة</h2>
            <p className="text-sm text-khuta-neutral-700 mb-4">يمكن نسخ الرابط التالي ومشاركته مع أعضاء الدورة. الرابط مؤقت (محاكاة).</p>
            <div className="bg-khuta-neutral-50 p-3 rounded break-words">{sharedLink}</div>
            <div className="mt-4 text-right">
              <Button onClick={() => { navigator.clipboard?.writeText(sharedLink); }} className="px-4 py-2 rounded-full bg-khuta-accent-500 text-white font-bold">نسخ الرابط</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* مودال سجل الإصدارات */}
      {historyOpen && (
        <Modal isOpen={historyOpen} onClose={() => setHistoryOpen(false)}>
          <div>
            <h2 className="text-xl font-bold mb-3 text-khuta-accent-500">سجل الإصدارات</h2>
            <ul className="space-y-2 text-sm">
              {getHistory(selected).map((h, i) => (
                <li key={i} className="p-3 bg-khuta-neutral-50 rounded-xl border border-khuta-neutral-100">
                  <div className="font-bold text-khuta-primary-700">{h.action}</div>
                  <div className="text-xs text-khuta-neutral-500">{h.at} — بواسطة {h.by}</div>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}
