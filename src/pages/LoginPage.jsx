// File: src/pages/LoginPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    login({ name: 'مستخدم تجريبي' });
    navigate('/dashboard');
  }

  return (
    <div className="flex items-center justify-center h-screen bg-khuta-neutral-50">
      <div className="p-8 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-2xl font-bold mb-6">محاكاة تسجيل الدخول</h1>
        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-khuta-primary px-8 py-3 text-white font-bold shadow-lg transition-transform hover:scale-105"
        >
          تسجيل الدخول كمستخدم تجريبي
        </button>
      </div>
    </div>
  );
} 