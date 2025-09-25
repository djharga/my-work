import { useState, useEffect } from 'react';

function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      // ignore write errors (e.g., storage full)
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState; 