import React from 'react';
import GradHero from './GradHero';
import HeroImg from '../img/hero.png';
import homePageData from '../data/homePageData.json';

const { hero } = homePageData;

export default function HeroSection() {
  return (
    <GradHero
      title={hero.title}
      subtitle={hero.subtitle}
      primaryCta={hero.primaryCta}
      secondaryCta={hero.secondaryCta}
      image={{
        src: HeroImg,
        alt: hero.image.alt
      }}
    />
  );
}
