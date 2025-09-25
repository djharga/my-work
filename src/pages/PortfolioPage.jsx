import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import portfolioPageData from '../data/portfolioPageData.json';

const { user, buttons, sections, certificates, projects, skills } = portfolioPageData;

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10 text-right">
      {/* Header */}
      <header className="surface flex flex-col sm:flex-row items-center gap-7 shadow-lg p-6 rounded-xl">
        <img
          src={user.avatar}
          alt="profile"
          className="w-28 h-28 rounded-full ring-4 ring-khuta-primary-300 object-cover mb-4 sm:mb-0"
        />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-khuta-primary">{user.name}</h1>
          <p className="text-sm text-khuta-neutral-700">{user.title}</p>
          {/* أزرار البروفايل */}
          <div className="mt-3 flex gap-3 flex-wrap">
            <Button className="px-5 py-2 button-glow font-bold" variant="primary">{buttons.share}</Button>
            <div className="px-4 py-2 bg-white rounded-lg shadow flex items-center gap-2 border hover:shadow-md">
              <div className="w-12 h-8 bg-khuta-neutral-50 rounded flex items-center justify-center font-bold text-khuta-primary">{user.digitalCard.icon}</div>
              <div className="text-sm text-khuta-neutral-600">{user.digitalCard.text}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Achievements */}
      <section>
        <h2 className="text-xl font-bold text-khuta-primary-800 mb-4">{sections.certificates.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certificates.map(c => (
            <div key={c.id} className="bg-white dark:bg-khuta-neutral-900 p-5 rounded-xl shadow flex flex-col border border-khuta-neutral-300 dark:border-khuta-neutral-700">
              <div className="h-36 bg-gradient-to-r from-khuta-primary-300 via-khuta-accent-400 to-khuta-secondary-400 opacity-60 rounded-lg mb-3 flex items-center justify-center text-gray-400 font-bold text-xl">{sections.certificates.placeholder}</div>
              <div className="flex-1">
                <div className="font-semibold text-khuta-primary-800 mb-1">{c.title}</div>
                <div className="text-xs text-khuta-neutral-600">{c.date}</div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <Link to={`/certificate/${c.id}`} className="text-khuta-primary underline font-medium">{buttons.viewCertificate}</Link>
                <button className="px-3 py-1 bg-khuta-primary-300 text-white rounded-lg border hover:bg-khuta-accent-500 transition-colors">{buttons.download}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Projects */}
      <section>
        <h2 className="text-xl font-bold text-khuta-primary-800 mb-4">{sections.skillsAndProjects.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* المهارات */}
          <div className="bg-white dark:bg-khuta-neutral-900 p-5 rounded-xl shadow border border-khuta-neutral-300 dark:border-khuta-neutral-700">
            <h3 className="font-semibold mb-3 text-khuta-primary-800">{sections.skills.title}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="px-4 py-1 bg-khuta-accent-400 bg-opacity-10 border border-khuta-accent-500 text-khuta-primary rounded-lg font-medium">{skill}</span>
              ))}
            </div>
          </div>
          {/* المشاريع */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {projects.map(p => (
                <div key={p.id} className="bg-white dark:bg-khuta-neutral-900 p-5 rounded-xl shadow border border-khuta-neutral-300 dark:border-khuta-neutral-700">
                  <div className="font-semibold text-khuta-primary mb-1">{p.title}</div>
                  <div className="text-xs text-khuta-neutral-500 mt-2">{sections.projects.description}</div>
                  <div className="mt-4">
                    <Link to="#" className="text-khuta-accent-500 font-bold underline hover:text-khuta-primary-800">{buttons.viewProject}</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
