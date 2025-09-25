// File: src/components/DemoControls.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import { useBackground } from '../context/BackgroundContext';
import ConfirmationModal from './ConfirmationModal';

export default function DemoControls() {
  const { login, logout } = useAuth();
  const { enabled, toggle, setEnabled } = useBackground();
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white dark:bg-khuta-neutral-900 p-3 rounded-lg shadow-lg border flex flex-col gap-2 w-52">
        <div className="text-sm font-semibold">Demo Controls</div>
        <Button onClick={() => login({ name: 'مستخدم تجريبي' })} className="px-3 py-2 text-sm">Simulate Login</Button>
        <button onClick={() => logout()} className="px-3 py-2 border rounded text-sm">Simulate Logout</button>

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs">تعطيل حركة الخلفية</div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={!enabled} onChange={toggle} className="sr-only" />
            <span className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${!enabled ? 'bg-khuta-primary' : 'bg-gray-300'}`}>
              <span className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${!enabled ? 'translate-x-5' : ''}`} />
            </span>
          </label>
        </div>

        <div className="mt-2">
          <Button onClick={() => setEnabled(true)} className="px-3 py-2 text-sm">إعادة تفعيل الخلفية</Button>
        </div>

        <div className="mt-2">
          <button
            onClick={() => setConfirmClearOpen(true)}
            className="px-3 py-2 w-full border rounded text-sm bg-red-50 text-red-700"
          >مسح بيانات المستخدمين</button>
        </div>

        {/* Confirmation modal for clearing users data */}
        <ConfirmationModal
          isOpen={confirmClearOpen}
          onClose={() => setConfirmClearOpen(false)}
          title="مسح بيانات المستخدمين"
          message="هل أنت متأكد من رغبتك في حذف جميع بيانات المستخدمين المخزنة محليًا؟"
          onConfirm={() => {
            try {
              window.localStorage.removeItem('khuta_users');
            } catch (e) {
              // ignore
            }
            setConfirmClearOpen(false);
            window.location.reload();
          }}
        />

      </div>
    </div>
  );
} 