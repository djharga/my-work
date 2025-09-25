import React from 'react';

export default function DataFallback({
  value,
  type = 'text',
  placeholder = 'سيتم تحديث هذه المعلومة قريباً',
  className = ''
}) {
  const isEmpty =
    value === undefined ||
    value === null ||
    (type === 'text' && (value === '' || value === false)) ||
    (type === 'number' && (value === null || value === undefined));

  return (
    <span className={className} aria-live="polite">
      {isEmpty
        ? <span className="text-khuta-neutral-600">{placeholder}</span>
        : value}
    </span>
  );
}
