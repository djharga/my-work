import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDown, ClipboardCheck, Award, Briefcase, AreaChart, Shapes } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuSections = [
  {
    id: 'audit',
    title: 'كورسات المراجعة الداخلية',
    icon: 'ClipboardCheck',
    courses: [
      { id: '1', name: 'كورس عملي: المراجعة الداخلية (البرنامج التطبيقي الشامل)', isFeatured: true, tag: 'الأكثر طلبًا' },
      { id: '2', name: 'خطى المراجعة الداخلية - المستوى الثالث: تطوير الكفاءات' },
      { id: '3', name: 'البرنامج المتكامل للمراجع الداخلي' }
    ]
  },
  {
    id: 'fellowship',
    title: 'الزمالة والشهادات المهنية',
    icon: 'Award',
    isProminent: true,
    courses: [
      { id: '4', name: 'التحضير لزمالة المراجعين الداخليين (CIA)' },
      { id: '5', name: 'التحضير لشهادات مهنية أخرى في التدقيق وإدارة المخاطر' }
    ]
  },
  {
    id: 'management',
    title: 'الإدارة والتشغيل',
    icon: 'Briefcase',
    courses: [
      { id: '6', name: 'خطى إدارة المطاعم' },
      { id: '7', name: 'خطى إدارة المشاريع التشغيلية' }
    ]
  },
  {
    id: 'finance',
    title: 'المالية والتحليل',
    icon: 'AreaChart',
    courses: [
      { id: '8', name: 'خطى التحليل المالي' },
      { id: '9', name: 'خطى التسويات البنكية' },
      { id: '10', name: 'خطى إعداد الميزانيات' }
    ]
  },
  {
    id: 'misc',
    title: 'تخصصات متنوعة',
    icon: 'Shapes',
    courses: [
      { id: '11', name: 'خطى التسويق الرقمي' },
      { id: '12', name: 'خطى خدمة العملاء وإدارة الجودة' },
      { id: '13', name: 'خطى تطوير المهارات الشخصية (Soft Skills)' }
    ]
  }
];

const iconMap = { ClipboardCheck, Award, Briefcase, AreaChart, Shapes };

const CoursesDropdown = ({ closeMobileMenu, isActive }) => (
  <Menu as="div" className="relative inline-block text-right">
    <div>
      <Menu.Button
        className={`inline-flex justify-center items-center px-4 py-2 rounded-full font-bold transition-colors ${
          isActive
            ? 'bg-khuta-primary text-white'
            : 'bg-transparent text-khuta-primary hover:bg-khuta-neutral-100'
        }`}>
        الدورات
        <ChevronDown className="w-5 h-5 ml-2" aria-hidden="true" />
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-110"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-90"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 w-80 mt-2 origin-top-right bg-white rounded-2xl shadow-xl focus:outline-none z-50 max-h-[calc(100vh-100px)] overflow-y-auto border border-khuta-neutral">
        <div className="p-4 grid grid-cols-1 gap-y-5">
          {menuSections.map(section => {
            const IconComp = iconMap[section.icon];
            return (
              <div key={section.id}
                className={`pb-2 ${section.isProminent ? 'bg-khuta-accent/20 rounded-xl border border-khuta-neutral' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  {IconComp && <IconComp className={`w-6 h-6 ${section.isProminent ? 'text-khuta-primary' : 'text-khuta-primary'}`} />}
                  <h3 className={`font-bold text-lg ${section.isProminent ? 'text-khuta-primary' : 'text-khuta-primary'}`}>
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {section.courses.map(course => (
                    <Menu.Item key={course.id}>
                      {({ active }) => (
                        <Link
                          to={`/courses/${course.id}`}
                          onClick={closeMobileMenu}
                          className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium
                            ${active ? 'bg-khuta-primary text-white' : 'text-khuta-primary'}
                            ${course.isFeatured ? 'font-bold' : ''}
                            hover:bg-khuta-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-khuta-secondary`}
                          aria-label={`عرض دورة ${course.name}`}
                        >
                          <span>{course.name}</span>
                          {course.tag && (
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full
                              ${active ? 'bg-white text-khuta-primary border border-khuta-neutral' : 'bg-khuta-accent text-khuta-primary'}`}>
                              {course.tag}
                            </span>
                          )}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);

export default CoursesDropdown;
