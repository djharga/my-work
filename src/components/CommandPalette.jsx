import React, { useMemo } from 'react';
import { Dialog, Combobox } from '@headlessui/react';
import { useCommandPalette } from '../context/CommandPaletteContext';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useState } from 'react';
import Button from './Button';
import FallbackImage from './placeholders/FallbackImage';

// Sample static pages and actions. Courses will be derived from CourseContext.
const PAGES = [
  { id: 'home', type: 'page', title: 'Home', path: '/' },
  { id: 'features', type: 'page', title: 'Features', path: '/features' },
  { id: 'pricing', type: 'page', title: 'Pricing', path: '/pricing' },
];

const ACTIONS = [
  { id: 'new-course', type: 'action', title: 'New Course' },
  { id: 'logout', type: 'action', title: 'Logout' },
];

export default function CommandPalette() {
  const { isOpen, close, query, setQuery } = useCommandPalette();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const [selectedItem, setSelectedItem] = useState(null);

  const q = (query || '').toLowerCase();
  const filteredPages = PAGES.filter(p => p.title.toLowerCase().includes(q));
  const filteredCourses = (courses || []).filter(c => c.title.toLowerCase().includes(q));
  const filteredActions = ACTIONS.filter(a => a.title.toLowerCase().includes(q));

  function onSelect(item) {
    if (!item) return;
    if (item.type === 'page') {
      navigate(item.path);
      close();
    } else if (item.type === 'course') {
      navigate(`/courses/${item.payload.id}`);
      close();
    } else if (item.type === 'action') {
      close();
      if (item.id === 'logout') {
        // simple logout simulation
        localStorage.removeItem('khuta_user');
        navigate('/');
      } else if (item.id === 'new-course') {
        alert('Create new course (simulated)');
      }
    }
  }

  return (
    <Dialog open={isOpen} onClose={close} className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" aria-hidden />
      <div className="relative w-full max-w-4xl bg-white dark:bg-khuta-neutral-900 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <Combobox value={selectedItem} onChange={setSelectedItem} nullable>
            <div className="flex items-center gap-3">
              <Combobox.Input
                className="w-full p-3 rounded border bg-transparent"
                placeholder="Type a command or search (Ctrl+K)"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (selectedItem) onSelect(selectedItem);
                  }
                }}
              />
            </div>

            <Combobox.Options static className="max-h-96 overflow-y-auto p-4 grid grid-cols-2 gap-4">
              <div>
                {/* Pages group */}
                {filteredPages.length > 0 && (
                  <>
                    <h2 className="text-xs font-semibold text-gray-500 px-2 my-2">Pages</h2>
                    <ul className="space-y-1">
                      {filteredPages.map(page => (
                        <Combobox.Option key={page.id} value={page} className={({ active }) => `p-2 rounded cursor-pointer ${active ? 'bg-khuta-neutral-100' : ''}`} onClick={() => onSelect(page)}>
                          <div className="font-medium">{page.title}</div>
                          <div className="text-xs text-gray-500">{page.path}</div>
                        </Combobox.Option>
                      ))}
                    </ul>
                  </>
                )}

                {/* Courses group (also here to ensure Pages -> Courses -> Actions order) */}
                {filteredCourses.length > 0 && (
                  <>
                    <h2 className="text-xs font-semibold text-gray-500 px-2 my-2">Courses</h2>
                    <ul className="space-y-1">
                      {filteredCourses.map(course => (
                        <Combobox.Option key={`course-${course.id}`} value={{ id: `course-${course.id}`, type: 'course', title: course.title, payload: course }} className={({ active }) => `p-2 rounded cursor-pointer ${active ? 'bg-khuta-neutral-100' : ''}`} onClick={() => onSelect({ id: `course-${course.id}`, type: 'course', title: course.title, payload: course })}>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-xs text-gray-500">{course.instructor} • {course.level}</div>
                        </Combobox.Option>
                      ))}
                    </ul>
                  </>
                )}

                {/* Actions group */}
                {filteredActions.length > 0 && (
                  <>
                    <h2 className="text-xs font-semibold text-gray-500 px-2 my-2">Actions</h2>
                    <ul className="space-y-1">
                      {filteredActions.map(action => (
                        <Combobox.Option key={action.id} value={action} className={({ active }) => `p-2 rounded cursor-pointer ${active ? 'bg-khuta-neutral-100' : ''}`} onClick={() => onSelect(action)}>
                          <div className="font-medium">{action.title}</div>
                          <div className="text-xs text-gray-500">{action.type}</div>
                        </Combobox.Option>
                      ))}
                    </ul>
                  </>
                )}

                {/* No results fallback for left panel */}
                {filteredPages.length === 0 && filteredActions.length === 0 && filteredCourses.length === 0 && (
                  <div className="text-sm text-gray-500">No results</div>
                )}
              </div>

              <div>
                {/* Preview panel */}
                <div className="mt-0">
                  <div className="text-sm text-gray-500 mb-2">Preview</div>
                  <div className="p-2 bg-khuta-neutral-50 rounded h-48 overflow-auto">
                    {selectedItem ? (
                      selectedItem.type === 'course' ? (
                        <div>
                          <FallbackImage src={selectedItem.payload.image} alt={selectedItem.payload.title} className="w-full h-28 rounded mb-2" size={170} />
                          <h3 className="font-bold">{selectedItem.payload.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{selectedItem.payload.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="primary" size="sm" onClick={() => { navigate(`/courses/${selectedItem.payload.id}`); close(); }}>افتح الدورة</Button>
                            <Button variant="secondary" size="sm" onClick={() => { navigator.clipboard?.writeText(`${window.location.origin}/courses/${selectedItem.payload.id}`); }}>نسخ الرابط</Button>
                          </div>
                        </div>
                      ) : selectedItem.type === 'page' ? (
                        <div>
                          <div className="text-2xl mb-2">📄</div>
                          <h3 className="font-bold">{selectedItem.title}</h3>
                          <p className="text-sm text-gray-600">Navigate to {selectedItem.path}</p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-2xl mb-2">⚡</div>
                          <h3 className="font-bold">{selectedItem.title}</h3>
                          <p className="text-sm text-gray-600">Action: {selectedItem.title}</p>
                        </div>
                      )
                    ) : (
                      <div className="text-sm text-gray-500">Select a result to preview details</div>
                    )}
                  </div>
                </div>
              </div>
            </Combobox.Options>
          </Combobox>
        </div>
      </div>
    </Dialog>
  );
} 