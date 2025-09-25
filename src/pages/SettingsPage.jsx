import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import SecurityPage from './SecurityPage';
import TeamWorkspace from './TeamWorkspace';
import './SettingsPage.css';

const settingsTabs = [
  { name: 'Profile', path: 'profile' },
  { name: 'Security', path: 'security' },
  { name: 'Team Workspace', path: 'team-workspace' },
  { name: 'Dark Mode', path: 'dark-mode' }, // إضافة تبويب الوضع الداكن
];

export default function SettingsPage() {
  return (
    <div className="settings-layout">
      <aside className="settings-sidebar p-4">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <nav className="flex flex-col space-y-2">
          {settingsTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="settings-content">
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="team-workspace" element={<TeamWorkspace />} />
        </Routes>
      </main>
    </div>
  );
}