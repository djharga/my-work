import React from 'react';
import { Link } from 'react-router-dom';
import homePageData from '../data/homePageData.json';

const { callToAction } = homePageData;

export default function CallToActionSection() {
  return (
    <section className="bg-gray-100 p-8 rounded-kh text-center mb-12">
      <h2 className="text-3xl font-extrabold text-khuta-primary mb-2">{callToAction.title}</h2>
      <p className="text-khuta-secondary mb-4">{callToAction.description}</p>
      <Link to='/register' className="bg-khuta-primary text-white font-bold py-2 px-6 rounded-kh hover:bg-khuta-secondary transition-colors">
        {callToAction.buttonText}
      </Link>
    </section>
  );
}