import React from 'react';
import FellowshipPartCard from '../components/FellowshipPartCard';
import partData from '../data/fellowshipData.json';

export default function Fellowship() {
  return (
    <div className="space-y-8 bg-khuta-neutral-50 min-h-screen py-9 px-2">
      <h1 className="text-2xl md:text-3xl font-extrabold text-khuta-primary-700 mb-6 text-center">زمالة المراجعين الداخليين</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <FellowshipPartCard title="المستوى الأول - الأساسيات" items={partData.Part1} />
        <FellowshipPartCard title="المستوى الثاني - التطبيق العملي" items={partData.Part2} />
        <FellowshipPartCard title="المستوى الثالث - الخبرة والقيادة" items={partData.Part3} />
      </div>
    </div>
  );
}
