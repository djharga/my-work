import React, { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';

// الصفحات الثابتة/الأساسية
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import PostEmploymentConsulting from './pages/PostEmploymentConsulting';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import PortfolioPage from './pages/PortfolioPage';
import QuizInterface from './components/QuizInterface';
import CertificateViewer from './components/CertificateViewer';
import TeamWorkspace from './pages/TeamWorkspace';
import ProtectedRoute from './components/ProtectedRoute';

// الصفحات المؤجلة التحميل (Lazy loading)
const AllCoursesPage     = lazy(() => import('./pages/AllCoursesPage'));
const FellowshipPage     = lazy(() => import('./pages/FellowshipPage'));
const FeaturesPage       = lazy(() => import('./pages/FeaturesPage'));
const SecurityPage       = lazy(() => import('./pages/SecurityPage'));
const PricingPage        = lazy(() => import('./pages/PricingPage'));
const DashboardPage      = lazy(() => import('./pages/DashboardPage'));
const AdminDashboard     = lazy(() => import('./pages/AdminDashboard'));
const SettingsPage       = lazy(() => import('./pages/SettingsPage'));
const LandingPage        = lazy(() => import('./pages/LandingPage'));
const CourseFormPage     = lazy(() => import('./pages/CourseFormPage').then(module => ({ default: module.CourseFormPage })));
const CourseDeletePage   = lazy(() => import('./pages/CourseDeletePage').then(module => ({ default: module.CourseDeletePage })));

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "consulting", element: <PostEmploymentConsulting /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <LoginPage /> },
      { path: "profile", element: <Profile /> },
      { path: "landing", element: <LandingPage /> },
      { path: "courses", element: <Suspense fallback={<div>جاري التحميل...</div>}><AllCoursesPage /></Suspense> },
      { path: "courses/:id", element: <CourseDetailPage /> },
      { path: "fellowship", element: <Suspense fallback={<div>جاري التحميل...</div>}><FellowshipPage /></Suspense> },
      { path: "features", element: <Suspense fallback={<div>جاري التحميل...</div>}><FeaturesPage /></Suspense> },
      { path: "security", element: <Suspense fallback={<div>جاري التحميل...</div>}><SecurityPage /></Suspense> },
      { path: "pricing", element: <Suspense fallback={<div>جاري التحميل...</div>}><PricingPage /></Suspense> },
      { path: "dashboard", element: <ProtectedRoute><Suspense fallback={<div>جاري التحميل...</div>}><DashboardPage /></Suspense></ProtectedRoute> },
      { path: "portfolio", element: <ProtectedRoute><Suspense fallback={<div>جاري التحميل...</div>}><PortfolioPage /></Suspense></ProtectedRoute> },
      { path: "quiz/:id", element: <ProtectedRoute><QuizInterface /></ProtectedRoute> },
      { path: "certificate/:id", element: <ProtectedRoute><CertificateViewer /></ProtectedRoute> },
      { path: "team-workspace", element: <ProtectedRoute><TeamWorkspace /></ProtectedRoute> },
      { path: "admin", element: <ProtectedRoute><Suspense fallback={<div>جاري التحميل...</div>}><AdminDashboard /></Suspense></ProtectedRoute> },
      { path: "admin/courses/add", element: <ProtectedRoute><Suspense fallback={<div>جاري التحميل...</div>}><CourseFormPage mode="add" /></Suspense></ProtectedRoute> }, // مسار إضافة دورة تدريبية جديدة
      { path: "admin/courses/edit/:id", element: <ProtectedRoute><Suspense fallback={<div>جاري التحميل...</div>}><CourseFormPage mode="edit" /></Suspense></ProtectedRoute> }, // مسار تعديل دورة تدريبية
      { path: "admin/courses/delete/:id", element: <ProtectedRoute><Suspense fallback={<div>جاري التحميل...</div>}><CourseDeletePage /></Suspense></ProtectedRoute> }, // مسار حذف دورة تدريبية
      { path: "settings", element: <Suspense fallback={<div>جاري التحميل...</div>}><SettingsPage /></Suspense> },
      { path: "*", element: <HomePage /> }, // إعادة توجيه للصفحة الرئيسية للمسارات غير المعرفة
    ],
  },
];

export default function App() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", direction: "rtl"
      }}>
        <span style={{
          background: "var(--modern-gradient,linear-gradient(90deg,#38bdf8,#9333ea))",
          color: "#fff",
          padding: "1.1em 2em",
          borderRadius: "2em",
          fontWeight: 600,
          fontSize: "1.08em",
          boxShadow: "0 10px 26px rgba(38,64,175,0.11)"
        }}>
          جاري تحميل الصفحة...
        </span>
      </div>
    }>
      {/* سيتم عرض المحتوى بواسطة Outlet في MainLayout */}
    </Suspense>
  );
}
