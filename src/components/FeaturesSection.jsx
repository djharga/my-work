import React from 'react';
import I1 from '../img/icone1.png';
import I2 from '../img/icone2.png';
import I3 from '../img/icone3.png';
import I4 from '../img/icone4.png';
import I5 from '../img/icone5.png';
import I6 from '../img/icone6.png';
import homePageData from '../data/homePageData.json';

const { features } = homePageData;

const icons = { I1, I2, I3, I4, I5, I6 };

export default function FeaturesSection() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-extrabold text-khuta-primary text-center mb-8">{features.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.items.map((feature, index) => (
          <div key={index} className="bg-white border border-khuta-neutral rounded-kh p-6 text-center shadow">
            <img src={icons[feature.img]} alt={feature.title} className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-xl font-bold text-khuta-secondary mb-2">{feature.title}</h3>
            <p className="text-khuta-neutral-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}