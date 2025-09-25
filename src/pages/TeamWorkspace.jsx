// File: src/pages/TeamWorkspace.jsx
import React, { useState } from 'react';
import FileTreeViewer from '../components/FileTreeViewer';
import Modal from '../components/Modal';
import Button from '../components/Button';

const initialTasks = {
  todo: [ { id: 't1', title: 'جهّز ملف المتطلبات' }, { id: 't2', title: 'اجمع مواد التدريب' } ],
  inprogress: [ { id: 't3', title: 'تصميم الشريحة الأولى' } ],
  done: [ { id: 't4', title: 'اجتماع تعريف المشروع' } ]
};

const members = [
  { id: 'm1', name: 'أحمد', avatar: 'https://picsum.photos/seed/m1/40/40' },
  { id: 'm2', name: 'منى', avatar: 'https://picsum.photos/seed/m2/40/40' },
  { id: 'm3', name: 'سارة', avatar: 'https://picsum.photos/seed/m3/40/40' }
];

export default function TeamWorkspace() {
  const [tasks, setTasks] = useState(initialTasks);
  const [dragItem, setDragItem] = useState(null);
  const [meetingOpen, setMeetingOpen] = useState(false);

  function onDragStart(e, col, idx) {
    setDragItem({ from: col, idx });
    e.dataTransfer.effectAllowed = 'move';
  }

  function onDrop(e, toCol) {
    e.preventDefault();
    if (!dragItem) return;
    const { from, idx } = dragItem;
    if (from === toCol) return setDragItem(null);

    const item = tasks[from][idx];
    const newFrom = [...tasks[from]];
    newFrom.splice(idx, 1);
    const newTo = [item, ...tasks[toCol]];

    setTasks(prev => ({ ...prev, [from]: newFrom, [toCol]: newTo }));
    setDragItem(null);
  }

  function onDragOver(e) { e.preventDefault(); }

  return (
    <div className="container mx-auto px-4 py-6 text-right space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">مساحة عمل الفريق</h1>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {members.map(m => (
              <img key={m.id} src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border-2 border-white" title={m.name} />
            ))}
          </div>
          <Button onClick={() => setMeetingOpen(true)} className="px-4 py-2">افتح غرفة الاجتماع</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-khuta-neutral-100 p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-3">المستودع المشترك</h3>
            <FileTreeViewer />
          </div>

          <div className="bg-khuta-neutral-100 p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-3">أعضاء الفريق</h3>
            <ul className="space-y-2">
              {members.map(m => (
                <li key={m.id} className="flex items-center gap-3">
                  <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-xs text-gray-500">متصل الآن</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="bg-khuta-neutral-100 p-4 rounded shadow-sm mb-4">
            <h2 className="font-semibold mb-2">لوحة المهام (كانبان)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['todo','inprogress','done'].map(col => (
                <div key={col} className="p-2 bg-khuta-neutral-50 rounded" onDragOver={onDragOver} onDrop={(e) => onDrop(e, col)}>
                  <div className="font-medium mb-2">{col === 'todo' ? 'To Do' : col === 'inprogress' ? 'In Progress' : 'Done'}</div>
                  <div className="space-y-2 min-h-[120px]">
                    {tasks[col].map((t, idx) => (
                      <div key={t.id} draggable onDragStart={(e) => onDragStart(e, col, idx)} className="p-3 bg-white rounded shadow-sm">{t.title}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-khuta-neutral-100 p-4 rounded shadow-sm">
            <h2 className="font-semibold mb-2">ملاحظات وسجل النشاط</h2>
            <p className="text-sm text-gray-600">مساحة مؤقتة للدردشة السريعة ومحتوى الاجتماع. (وحدة افتراضية - سيتم الربط لاحقًا)</p>
          </div>
        </main>
      </div>

      {meetingOpen && (
        <Modal isOpen={meetingOpen} onClose={() => setMeetingOpen(false)}>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">غرفة الاجتماع (افتراضية)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-khuta-neutral-50 rounded">Placeholder: Video / Screen share area</div>
              <div className="p-4 bg-khuta-neutral-50 rounded">Placeholder: Chat and participants list</div>
            </div>
            <div className="mt-4 text-right">
              <Button onClick={() => setMeetingOpen(false)} className="px-4 py-2">إغلاق</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
} 