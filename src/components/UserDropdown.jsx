import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', handleDoc);
    return () => document.removeEventListener('click', handleDoc);
  }, []);

  function handleLogout() {
    setOpen(false);
    if (typeof logout === 'function') logout();
    navigate('/');
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-khuta-neutral-200 rounded-full shadow hover:bg-khuta-neutral-50 transition"
      >
        <img src={user?.avatar || 'https://picsum.photos/seed/user/40/40'} alt="avatar" className="w-7 h-7 rounded-full border border-khuta-neutral-100" />
        <span className="text-sm font-semibold text-khuta-primary-700">{user?.name || 'المستخدم'}</span>
        <ChevronDownIcon className="w-4 h-4 text-khuta-primary-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl z-50 border border-khuta-neutral-100">
          <div className="p-3 space-y-1">
            <Link to="/dashboard" className="block px-3 py-2 rounded-lg font-medium text-khuta-primary-700 hover:bg-khuta-neutral-100 transition">لوحة القيادة</Link>
            <Link to="/portfolio" className="block px-3 py-2 rounded-lg font-medium text-khuta-primary-700 hover:bg-khuta-neutral-100 transition">ملفي الشخصي</Link>
            <Link to="/profile" className="block px-3 py-2 rounded-lg font-medium text-khuta-primary-700 hover:bg-khuta-neutral-100 transition">حسابي</Link>
            <Link to="/team-workspace" className="block px-3 py-2 rounded-lg font-medium text-khuta-primary-700 hover:bg-khuta-neutral-100 transition">مساحة الفريق</Link>
            <Link to="/settings" className="block px-3 py-2 rounded-lg font-medium text-khuta-primary-700 hover:bg-khuta-neutral-100 transition">الإعدادات</Link>
            <Link to="/admin" className="block px-3 py-2 rounded-lg font-medium text-khuta-primary-700 hover:bg-khuta-neutral-100 transition">لوحة الإدارة</Link>
            <button
              onClick={handleLogout}
              className="w-full text-right px-3 py-2 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
