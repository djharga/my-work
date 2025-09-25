import React, { useState } from 'react';
import {
  HomeIcon, UsersIcon, BookOpenIcon, FolderIcon, Cog6ToothIcon,
  PlusIcon, PencilIcon, TrashIcon, EyeIcon
} from '@heroicons/react/24/outline';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';
import FileTreeViewer from '../components/FileTreeViewer';
import Button from '../components/Button';
import UserFormModal from '../components/UserFormModal';
import ConfirmationModal from '../components/ConfirmationModal';
import useLocalStorageState from '../hooks/useLocalStorageState';

// عنصر قائمة التنقل الجانبية
function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-right flex items-center justify-between gap-3 px-4 py-3 rounded ${active ? 'bg-khuta-neutral-50 dark:bg-khuta-neutral-800 text-khuta-primary' : 'hover:bg-khuta-neutral-50/50'}`}
    >
      <span className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </span>
      <span className="text-xs text-gray-500">{''}</span>
    </button>
  );
}

// بطاقات ملخص لمحة سريعة
function OverviewCards({ totalUsers = 1240, activeCourses = 12, revenue = '123,450 ر.س' }) {
  const stats = [
    { label: 'المستخدمون الكليّون', value: totalUsers },
    { label: 'الدورات النشطة', value: activeCourses },
    { label: 'إجمالي الإيرادات', value: revenue }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map(s => (
        <div key={s.label} className="p-4 rounded bg-khuta-neutral-100 shadow-sm">
          <div className="text-sm text-gray-500">{s.label}</div>
          <div className="text-2xl font-bold mt-2">{s.value}</div>
        </div>
      ))}
    </div>
  );
}

// جدول المستخدمين مع صلاحيات التحرير والحذف
function UsersTable({ users, onAdd, onEdit, onRequestDelete }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">إدارة المستخدمين</h3>
        <Button onClick={onAdd} className="px-3 py-2 inline-flex items-center gap-2"><PlusIcon className="w-4 h-4" /> إضافة مستخدم جديد</Button>
      </div>
      <div className="overflow-auto rounded border">
        <table className="w-full text-right min-w-[640px]">
          <thead className="bg-khuta-neutral-50">
            <tr>
              <th className="px-3 py-2 text-sm font-medium">الاسم</th>
              <th className="px-3 py-2 text-sm font-medium">البريد الإلكتروني</th>
              <th className="px-3 py-2 text-sm font-medium">الحالة</th>
              <th className="px-3 py-2 text-sm font-medium">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="px-3 py-3">{u.name}</td>
                <td className="px-3 py-3 text-sm text-gray-600">{u.email}</td>
                <td className="px-3 py-3">
                  {u.status === 'active' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">نشط</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">غير نشط</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => alert('عرض المستخدم: ' + u.name)} className="p-2 bg-white border rounded shadow-sm" aria-label="عرض"><EyeIcon className="w-4 h-4" /></button>
                    <button onClick={() => onEdit(u)} className="p-2 bg-white border rounded shadow-sm" aria-label="تعديل"><PencilIcon className="w-4 h-4" /></button>
                    <button onClick={() => onRequestDelete(u)} className="p-2 bg-red-50 border border-red-200 rounded shadow-sm" aria-label="حذف"><TrashIcon className="w-4 h-4 text-red-600" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// شبكة بطاقات الدورات التدريبية
function CoursesGrid({ courses }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">إدارة الدورات</h3>
        <Button className="px-3 py-2 inline-flex items-center gap-2"><PlusIcon className="w-4 h-4" /> إنشاء دورة جديدة</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(c => (
          <div key={c.id} className="p-2 rounded bg-khuta-neutral-100 shadow-sm">
            <div className="mb-2">
              <div className="font-semibold">{c.title}</div>
              <div className="text-xs text-gray-500">{c.instructor}</div>
            </div>
            <div className="flex gap-2 justify-end">
              <button className="px-2 py-1 bg-white border rounded shadow-sm"><PencilIcon className="w-4 h-4" /></button>
              <button className="px-2 py-1 bg-red-50 border border-red-200 rounded shadow-sm"><TrashIcon className="w-4 h-4 text-red-600" /></button>
              <button className="px-2 py-1 bg-white border rounded shadow-sm">محتوى</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// لوحة المشرف الرئيسية
export default function AdminDashboard() {
  const { courses } = useCourses();
  const [section, setSection] = useState('dashboard');
  // حالة المستخدمين مع تخزين محلي
  const [users, setUsers] = useLocalStorageState('khuta_users', [
    { id: 1, name: 'أحمد القحطاني', email: 'ahmed@example.com', phone: '+966500000001', status: 'active' },
    { id: 2, name: 'منى عبدالله', email: 'mona@example.com', phone: '+966500000002', status: 'inactive' },
    { id: 3, name: 'خالد صالح', email: 'khaled@example.com', phone: '+966500000003', status: 'active' }
  ]);
  // حال المودالات والإجراءات
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  function handleAddClick() {
    setEditingUser(null);
    setShowUserModal(true);
  }
  function handleEditClick(user) {
    setEditingUser(user);
    setShowUserModal(true);
  }
  function handleUserSubmit(data) {
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...data } : u));
    } else {
      const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers(prev => [{ id: nextId, status: 'active', ...data }, ...prev]);
    }
    setShowUserModal(false);
    setEditingUser(null);
  }
  function handleRequestDelete(user) {
    setDeletingUser(user);
    setShowConfirm(true);
  }
  function handleConfirmDelete() {
    if (deletingUser) {
      setUsers(prev => prev.filter(u => u.id !== deletingUser.id));
    }
    setShowConfirm(false);
    setDeletingUser(null);
  }

  return (
    <div className="min-h-screen flex bg-khuta-neutral-50 dark:bg-khuta-neutral-900/10">
      {/* Aside/sidenav */}
      <aside className="w-64 p-4 bg-white dark:bg-khuta-neutral-900 shadow-md">
        <div className="mb-6">
          <h2 className="text-lg font-bold">لوحة الإدارة</h2>
          <div className="text-sm text-gray-500">مرحباً، مشرف</div>
        </div>
        <nav className="space-y-2">
          <NavItem icon={HomeIcon} label="لوحة القيادة" active={section === 'dashboard'} onClick={() => setSection('dashboard')} />
          <NavItem icon={UsersIcon} label="المتدربون" active={section === 'users'} onClick={() => setSection('users')} />
          <NavItem icon={BookOpenIcon} label="الدورات" active={section === 'courses'} onClick={() => setSection('courses')} />
          <NavItem icon={FolderIcon} label="المحتوى" active={section === 'content'} onClick={() => setSection('content')} />
          <NavItem icon={Cog6ToothIcon} label="الإعدادات" active={section === 'settings'} onClick={() => setSection('settings')} />
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-6">
        {section === 'dashboard' && (
          <div>
            <OverviewCards totalUsers={1240} activeCourses={courses.length} revenue={'123,450 ر.س'} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 rounded bg-khuta-neutral-100 shadow-sm">سجل النشاطات والأحداث (مؤقت)</div>
              <div className="p-4 rounded bg-khuta-neutral-100 shadow-sm">لوحة مراقبة النظام (مؤقت)</div>
            </div>
          </div>
        )}
        {section === 'users' && (
          <div>
            <UsersTable users={users} onAdd={handleAddClick} onEdit={handleEditClick} onRequestDelete={handleRequestDelete} />
            <UserFormModal isOpen={showUserModal} onClose={() => { setShowUserModal(false); setEditingUser(null); }} onSubmit={handleUserSubmit} initialData={editingUser} />
            <ConfirmationModal isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleConfirmDelete} title="تأكيد حذف المستخدم" message={`هل أنت متأكد من رغبتك في حذف المستخدم ${deletingUser ? deletingUser.name : ''}?`} />
          </div>
        )}
        {section === 'courses' && <CoursesGrid courses={courses} />}
        {section === 'content' && (
          <div>
            <h3 className="font-semibold mb-4">إدارة المحتوى</h3>
            <FileTreeViewer />
          </div>
        )}
        {section === 'settings' && (
          <div>
            <h3 className="font-semibold mb-4">الإعدادات العامة</h3>
            <div className="p-4 rounded bg-khuta-neutral-100 shadow-sm">خيارات النظام (وضع تجريبي)</div>
          </div>
        )}
      </main>
    </div>
  );
}
