import React from 'react';

export default function IntroVideo({ src, poster }) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <video src={src} poster={poster} controls className="w-full h-72 object-cover" />
        </div>
      </div>
    </section>
  );
} 