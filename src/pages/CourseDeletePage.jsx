// src/pages/CourseDeletePage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CourseDeletePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    // هنا سيتم تنفيذ منطق حذف الدورة التدريبية باستخدام الـ API
    console.log(`حذف الدورة التدريبية بالمعرف: ${id}`);
    // بعد الحذف، يمكن إعادة التوجيه إلى صفحة الدورات أو لوحة التحكم
    navigate('/admin'); 
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">تأكيد حذف الدورة التدريبية</h1>
      <p className="mb-4">هل أنت متأكد أنك تريد حذف الدورة التدريبية بالمعرف: <span className="font-bold">{id}</span>؟</p>
      <div className="flex gap-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleDelete}
        >
          حذف
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCancel}
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}