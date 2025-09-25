// src/pages/CourseFormPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function CourseFormPage({ mode }) {
  const { id } = useParams(); // للحصول على معرف الدورة في وضع التعديل

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {mode === 'add' ? 'إضافة دورة تدريبية جديدة' : `تعديل الدورة التدريبية: ${id}`}
      </h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseName">
            اسم الدورة
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="courseName" type="text" placeholder="اسم الدورة التدريبية"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseDescription">
            الوصف
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="courseDescription" placeholder="وصف الدورة التدريبية" rows="5"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            {mode === 'add' ? 'إضافة' : 'حفظ التعديلات'}
          </button>
        </div>
      </form>
    </div>
  );
}