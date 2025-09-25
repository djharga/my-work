import React, { createContext, useState, useContext } from 'react';

const CourseContext = createContext(null);

const initialCourses = [
  {
    id: 1,
    title: 'أساسيات المراجعة الداخلية',
    description: 'دورة شاملة للمراجعة الداخلية والمفاهيم الأساسية.',
    instructor: 'د. محمد أحمد السعدي',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    level: 'مبتدئ',
    price: 750,
    files: [
      { id: 'f1', name: 'دليل المراجعة.pdf', type: 'pdf', protected: true },
      { id: 'f2', name: 'عرض تقديمي - مقدمة.pptx', type: 'pptx', protected: false },
      { id: 'f3', name: 'محاضرة-1.mp4', type: 'video', protected: false }
    ]
  },
  {
    id: 2,
    title: 'مهارات القيادة الإدارية',
    description: 'تطوير المهارات القيادية وإدارة الفريق.',
    instructor: 'أ. سارة محمد الزهراني',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    level: 'متوسط',
    price: 950,
    files: [
      { id: 'f4', name: 'خطة تدريبية.pdf', type: 'pdf', protected: false },
      { id: 'f5', name: 'التمارين.docx', type: 'docx', protected: false }
    ]
  },
  {
    id: 3,
    title: 'إدارة المخاطر المؤسسية',
    description: 'استراتيجيات إدارة المخاطر في المؤسسات.',
    instructor: 'د. عبدالله خالد',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    level: 'متقدم',
    price: 1200,
    files: [
      { id: 'f6', name: 'مصفوفة-المخاطر.pdf', type: 'pdf', protected: true },
      { id: 'f7', name: 'دراسة-حالة.mp4', type: 'video', protected: false }
    ]
  }
];

export function CourseProvider({ children }) {
  const [courses] = useState(initialCourses);

  function createUserCopy(courseId, userId = 'guest') {
    const course = courses.find(c => c.id === Number(courseId));
    if (!course) return null;

    const key = `user_copy_${userId}_${courseId}`;
    const payload = {
      id: course.id,
      title: course.title,
      createdAt: new Date().toISOString(),
      files: course.files
    };

    localStorage.setItem(key, JSON.stringify(payload));
    return key;
  }

  function listUserCopies(userId = 'guest') {
    const copies = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`user_copy_${userId}_`)) {
        try {
          copies.push({ key, data: JSON.parse(localStorage.getItem(key)) });
        } catch (e) {}
      }
    }
    return copies;
  }

  return (
    <CourseContext.Provider value={{ courses, createUserCopy, listUserCopies }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  return useContext(CourseContext);
} 