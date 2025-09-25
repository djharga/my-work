import React from 'react';
import CourseCard from '../components/CourseCard';
import { useCourses } from '../context/CourseContext';

export default function Courses() {
  const { courses } = useCourses();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">جميع الدورات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map(course => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  );
} 