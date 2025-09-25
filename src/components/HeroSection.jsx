import React from 'react';
import Button from './Button';
import SmartImage from './SmartImage';
import HeroImg from '../img/hero.png';
import homePageData from '../data/homePageData.json';

const { hero } = homePageData;

export default function HeroSection() {
  return (
    <section className="mb-12">
      <div className="relative">
        <SmartImage src={HeroImg} alt={hero.image.alt} ratio="21:9" priority />
        <div className="mt-5 text-right">
          <h1 
            className="text-3xl md:text-5xl font-extrabold text-khuta-primary leading-tight mb-2"
            dangerouslySetInnerHTML={{ __html: hero.title }}
          />
          <p className="text-khuta-neutral-900 mb-6 max-w-3xl">{hero.subtitle}</p>
          <div className="flex gap-3 justify-end">
            <Button to={hero.primaryCta.link} variant="primary" size="md">{hero.primaryCta.text}</Button>
            <Button to={hero.secondaryCta.link} variant="secondary" size="md">{hero.secondaryCta.text}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
