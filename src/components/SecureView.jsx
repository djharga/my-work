// File: src/components/SecureView.jsx
import React, { useEffect } from 'react';
import './SecureView.css';

export default function SecureView({ children }) {
  useEffect(() => {
    function handleKeyUp(e) {
      // PrintScreen detection
      if (e.key === 'PrintScreen' || e.key === 'Print') {
        try {
          // simple deterrent
          alert('التقاط الشاشة غير مسموح بهذه الواجهة. الرجاء الامتناع عن أخذ لقطات.');
        } catch (err) {
          // ignore
        }
      }
    }

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  return <div className="secure-content relative">{children}</div>;
} 