import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const CommandPaletteContext = createContext(null);

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}

export function CommandPaletteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);
  const toggle = useCallback(() => setIsOpen(v => !v), []);

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    function handler(e) {
      const isMac = navigator.platform.toLowerCase().includes('mac');
      const modPressed = isMac ? e.metaKey : e.ctrlKey;
      if (modPressed && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(v => !v);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const value = {
    isOpen,
    query,
    setQuery,
    open,
    close,
    toggle,
  };

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

export default CommandPaletteContext; 