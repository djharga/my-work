import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../img/hero.png';
import homePageData from '../data/homePageData.json';

const { coursesBanner } = homePageData;

export default function CoursesBannerSection() {
  return (
    <section className="relative bg-khuta-primary text-white p-8 rounded-kh overflow-hidden mb-12">
      <div className="absolute -left-16 -bottom-16 w-48 h-48">
        <img src={Banner} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold mb-2">{coursesBanner.title}</h2>
        <p className="mb-4">{coursesBanner.description}</p>
        <Link to='/courses' className="bg-white text-khuta-primary font-bold py-2 px-4 rounded-kh hover:bg-gray-200 transition-colors">
          {coursesBanner.buttonText}
        </Link>
      </div>
    </section>
  );
}