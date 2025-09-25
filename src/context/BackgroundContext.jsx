import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const BackgroundContext = createContext(null);

export function useBackground() {
  return useContext(BackgroundContext);
}

export function BackgroundProvider({ children }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('khuta_generative_bg_enabled');
      if (raw !== null) setEnabled(raw === '1');
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('khuta_generative_bg_enabled', enabled ? '1' : '0');
    } catch (e) {}
  }, [enabled]);

  const toggle = useCallback(() => setEnabled(v => !v), []);
  const value = { enabled, setEnabled, toggle };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
}

export default BackgroundContext; 