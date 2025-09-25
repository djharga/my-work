import React from 'react';

export default function ColorPalette() {
  const swatches = [
    { name: 'Primary', cls: 'bg-khuta-primary-500 text-white', hex: '#3b6daa', desc: 'Corporate Blue هادئ' },
    { name: 'Secondary', cls: 'bg-khuta-secondary-500 text-white', hex: '#40325f', desc: 'Teal بنفسجي عصري' },
    { name: 'Accent', cls: 'bg-khuta-accent-500 text-white', hex: '#42564a', desc: 'Accent زيتي هادئ' }
  ];

  const neutrals = [
    { name: 'Neutral 50', cls: 'bg-khuta-neutral-50', hex: '#ececec' },
    { name: 'Neutral 100', cls: 'bg-khuta-neutral-100', hex: '#eeeeee' },
    { name: 'Neutral 200', cls: 'bg-khuta-neutral-200', hex: '#e1e3e8' },
    { name: 'Neutral 900', cls: 'bg-khuta-neutral-900 text-white', hex: '#181a24' }
  ];

  return (
    <section className="container mx-auto px-4 py-10 text-right font-sans">
      <h2 className="text-2xl font-bold mb-9 text-khuta-primary-800">لوحة ألوان Khuta</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {swatches.map(s => (
          <div key={s.name} className={`${s.cls} p-6 rounded-xl shadow flex flex-col items-center justify-between`}>
            <div className="font-bold text-xl mb-2">{s.name}</div>
            <div className="text-sm mb-2">{s.hex}</div>
            <div className="text-base">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-xl bg-white shadow flex flex-col items-center">
        <div className="flex w-full gap-3 mb-4">
          {neutrals.map(n => (
            <div key={n.hex} className={`flex-1 h-16 rounded-lg ${n.cls} border border-gray-200 flex items-center justify-center`}>
              <span className={`text-xs font-semibold ${n.cls.includes('text-white') ? 'text-white' : 'text-gray-800'}`}>{n.hex}</span>
            </div>
          ))}
        </div>
        <p className="text-khuta-neutral-700">مجموعة الدرجات المحايدة للنصوص والخلفيات.</p>
      </div>
    </section>
  );
}
