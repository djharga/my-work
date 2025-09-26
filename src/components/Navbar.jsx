import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import CoursesDropdown from './CoursesDropdown';
import LogoImg from '../img/ac3c533b-028a-441c-8ae5-2f1bc5601c3d.png';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/fellowship', label: 'الزمالة' },
  { to: '/features', label: 'الميزات' },
  { to: '/security', label: 'الأمان' },
  { to: '/pricing', label: 'الأسعار' },
  { to: '/dashboard', label: 'لوحة المتدرب' },
  { to: '/about', label: 'من نحن' },
  { to: '/consulting', label: 'استشارات' },
  { to: '/contact', label: 'اتصل بنا' },
];

const NavItem = ({ to, label, onClick }) => {
  const navItemClass = ({ isActive }) =>
    `grad-nav-link px-4 py-2 rounded-md font-medium transition-all duration-300 relative ${
      isActive 
        ? 'text-grad-primary bg-grad-gray-50 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-grad-primary after:rounded-full' 
        : 'text-grad-gray-700 hover:text-grad-primary hover:bg-grad-gray-50'
    }`;

  return (
    <NavLink to={to} className={navItemClass} onClick={onClick} aria-label={label}>
      {label}
    </NavLink>
  );
};

const MobileMenu = ({ open, setOpen, isAuthenticated }) => (
  open && (
    <div className="md:hidden py-2 flex flex-col gap-1 bg-white shadow rounded-2xl mt-2">
      <NavItem to="/" label="الرئيسية" onClick={() => setOpen(false)} />
      <CoursesDropdown closeMobileMenu={() => setOpen(false)} />
      {navLinks.slice(1).map((link) => (
        <NavItem key={link.to} to={link.to} label={link.label} onClick={() => setOpen(false)} />
      ))}
      {!isAuthenticated ? (
        <div className="flex flex-col gap-2 p-2">
          <Button to="/login" variant="secondary" size="sm" fullWidth onClick={() => setOpen(false)}>
            دخول
          </Button>
          <Button to="/signup" variant="primary" size="sm" fullWidth onClick={() => setOpen(false)}>
            إنشاء حساب
          </Button>
        </div>
      ) : (
        <div className="px-4 py-2">
          <UserDropdown />
        </div>
      )}
    </div>
  )
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isCoursesPage = location.pathname.startsWith('/courses');

  return (
    <nav className="grad-navbar bg-white border-b border-grad-gray-200 shadow-sm sticky top-0 z-50" aria-label="الرئيسية - التنقل">
      <div className="grad-navbar-container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="grad-logo flex items-center gap-3 text-grad-primary hover:text-grad-primary-light transition-colors" aria-label="العودة للرئيسية">
              <img src={LogoImg} alt="شعار منصة خطى" className="h-10 w-10 rounded-full shadow-md" />
              <span className="text-2xl font-bold tracking-wide">خطى</span>
            </Link>
          </div>

          <div className="grad-nav-menu hidden md:flex items-center gap-1">
            <NavItem to="/" label="الرئيسية" />
            <CoursesDropdown isActive={isCoursesPage} />
            {navLinks.slice(1).map((link) => (
              <NavItem key={link.to} to={link.to} label={link.label} />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <Button to="/login" variant="secondary" size="sm" className="hidden md:inline-flex" ariaLabel="تسجيل الدخول">
                  دخول
                </Button>
                <Button to="/signup" variant="primary" size="sm" className="hidden md:inline-flex">
                  إنشاء حساب
                </Button>
              </>
            ) : (
              <UserDropdown />
            )}
            <button
              className="md:hidden p-2 rounded-lg border border-khuta-neutral-100 bg-white"
              aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="w-6 h-6 text-khuta-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        <MobileMenu open={open} setOpen={setOpen} isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
}
