// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import { routes } from './App';

// إنشاء الموجه (router) باستخدام المسارات المعرفة في App.jsx
const router = createBrowserRouter(routes);

export default router;