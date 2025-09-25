import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { BackgroundProvider } from './context/BackgroundContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';
import CommandPalette from './components/CommandPalette';
import router from './router.jsx'; // استيراد الموجه من الملف الجديد

// Register service worker for caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CourseProvider>
        <BackgroundProvider>
          <CommandPaletteProvider>
            <RouterProvider router={router}>
              {/* CommandPalette داخل RouterProvider */}
              <CommandPalette />
            </RouterProvider>
          </CommandPaletteProvider>
        </BackgroundProvider>
      </CourseProvider>
    </AuthProvider>
  </React.StrictMode>
);