import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { BackgroundProvider } from './context/BackgroundContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';
import CommandPalette from './components/CommandPalette';
import router from './router.jsx'; // استيراد الموجه من الملف الجديد

ReactDOM.render(
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
  </React.StrictMode>,
  document.getElementById('root')
);