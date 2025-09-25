import React, { lazy, Suspense, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import OptimizedLoader from './components/OptimizedLoader';
import { usePerformanceMonitor, preloadCriticalResources } from './hooks/usePerformanceMonitor';

// الصفحات الثابتة/الأساسية - Critical pages loaded immediately
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import PostEmploymentConsulting from './pages/PostEmploymentConsulting';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

// Less critical pages - lazy loaded
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const QuizInterface = lazy(() => import('./components/QuizInterface'));
const CertificateViewer = lazy(() => import('./components/CertificateViewer'));
const TeamWorkspace = lazy(() => import('./pages/TeamWorkspace'));

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
      { path: "courses", element: <Suspense fallback={<OptimizedLoader message="جاري تحميل الدورات..." />}><AllCoursesPage /></Suspense> },
      { path: "courses/:id", element: <CourseDetailPage /> },
      { path: "fellowship", element: <Suspense fallback={<OptimizedLoader message="جاري تحميل برنامج الزمالة..." />}><FellowshipPage /></Suspense> },
      { path: "features", element: <Suspense fallback={<OptimizedLoader message="جاري تحميل الميزات..." />}><FeaturesPage /></Suspense> },
      { path: "security", element: <Suspense fallback={<OptimizedLoader message="جاري تحميل صفحة الأمان..." />}><SecurityPage /></Suspense> },
      { path: "pricing", element: <Suspense fallback={<OptimizedLoader message="جاري تحميل الأسعار..." />}><PricingPage /></Suspense> },
      { path: "dashboard", element: <ProtectedRoute><Suspense fallback={<OptimizedLoader message="جاري تحميل لوحة التحكم..." />}><DashboardPage /></Suspense></ProtectedRoute> },
      { path: "portfolio", element: <ProtectedRoute><Suspense fallback={<OptimizedLoader message="جاري تحميل المحفظة..." />}><PortfolioPage /></Suspense></ProtectedRoute> },
      { path: "quiz/:id", element: <ProtectedRoute><Suspense fallback={<OptimizedLoader message="جاري تحميل الاختبار..." />}><QuizInterface /></Suspense></ProtectedRoute> },
      { path: "certificate/:id", element: <ProtectedRoute><Suspense fallback={<OptimizedLoader message="جاري تحميل الشهادة..." />}><CertificateViewer /></Suspense></ProtectedRoute> },
      { path: "team-workspace", element: <ProtectedRoute><Suspense fallback={<OptimizedLoader message="جاري تحميل مساحة العمل..." />}><TeamWorkspace /></Suspense></ProtectedRoute> },
      { path: "admin", element: <ProtectedRoute><Suspense fallback={<OptimizedLoader message="جاري تحميل لوحة الإدارة..." />}><AdminDashboard /></Suspense></ProtectedRoute> },
      { path: "admin/courses/add", element: <ProtectedRoute><Suspense fallback={<OptimizedLoader message="جاري تحميل نموذج إضافة الدورة..." />}><CourseFormPage mode="add" /></Suspense></ProtectedRoute> },
      { path: "admin/courses/edit/:id", element: <ProtectedRoute><Suspense fallback={<OptimizedLoader message="جاري تحميل نموذج تعديل الدورة..." />}><CourseFormPage mode="edit" /></Suspense></ProtectedRoute> },
      { path: "admin/courses/delete/:id", element: <ProtectedRoute><Suspense fallback={<OptimizedLoader message="جاري تحميل نموذج حذف الدورة..." />}><CourseDeletePage /></Suspense></ProtectedRoute> },
      { path: "settings", element: <Suspense fallback={<OptimizedLoader message="جاري تحميل الإعدادات..." />}><SettingsPage /></Suspense> },
      { path: "*", element: <HomePage /> }, // إعادة توجيه للصفحة الرئيسية للمسارات غير المعرفة
    ],
  },
];

export default function App() {
  const { logMetrics } = usePerformanceMonitor();

  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources();
    
    // Log performance metrics after load
    const timer = setTimeout(() => {
      logMetrics();
    }, 3000);

    return () => clearTimeout(timer);
  }, [logMetrics]);

  return (
    <Suspense fallback={<OptimizedLoader />}>
      {/* سيتم عرض المحتوى بواسطة Outlet في MainLayout */}
    </Suspense>
  );
}
