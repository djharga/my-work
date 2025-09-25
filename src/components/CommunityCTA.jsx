import React from 'react';
import Button from './Button';

export default function CommunityCTA() {
  return (
    <section
      className="py-10 rounded-3xl my-8"
      style={{
        background: "linear-gradient(90deg, rgba(58,142,196,0.17) 0%, rgba(164,205,204,0.13) 100%)",
        backdropFilter: "blur(5px) saturate(102%)"
      }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-khuta-primary-700 mb-2">انضم لمجتمع المتعلمين</h3>
          <p className="text-khuta-neutral-700 text-lg">شارك معرفتك، احصل على دعم فوري وشارك في فعاليات دورية.</p>
        </div>
        <div className="flex gap-4 mt-5 md:mt-0">
          <a href="#" className="inline-block">
            <Button className="px-5 py-3 rounded-full bg-khuta-accent-500 text-white font-bold hover:bg-khuta-accent-700">
              انضم عبر تلغرام
            </Button>
          </a>
          <a href="#" className="inline-block">
            <Button variant="secondary" className="px-5 py-3 rounded-full bg-white border text-khuta-primary-700 font-bold hover:bg-khuta-neutral-50">
              انضم عبر ديسكورد
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
