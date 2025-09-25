import React from 'react';

export default function ResourceList({ title, items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="font-semibold text-khuta-accent-700">{title}</div>
      <ul className="mt-2 list-disc list-inside text-sm text-khuta-neutral-700">
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}