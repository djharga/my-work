import React from 'react';
import homePageData from '../data/homePageData.json';

const { kpis } = homePageData;

export default function KPIsSection() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {kpis.map((k)=> (
        <div key={k.l} className="bg-white border border-khuta-neutral rounded-kh p-5 text-center shadow">
          <div className="text-2xl font-extrabold text-khuta-primary">{k.n}</div>
          <div className="text-khuta-secondary text-sm">{k.l}</div>
        </div>
      ))}
    </section>
  );
}