import React from 'react';

export default function LoadingBalls() {
  return (
    <div className="flex items-center gap-2 justify-end" aria-hidden="true">
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball"></span>
      <span className="loading loading-ball loading-lg"></span>
      <span className="loading loading-ball loading-xl"></span>
    </div>
  );
} 