import React from 'react';
import ResourceList from './ResourceList';

export default function FellowshipPartCard({ title, items }) {
  return (
    <div className="bg-white rounded-xl border border-khuta-neutral-200 shadow p-5">
      <h3 className="font-bold text-khuta-primary-700 text-lg">{title}</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResourceList title="ملفات" items={items.files} />
        <ResourceList title="بنك الأسئلة" items={items.questions} />
        <ResourceList title="فيديوهات" items={items.videos} />
        <ResourceList title="بودكاست" items={items.podcasts} />
      </div>
    </div>
  );
}