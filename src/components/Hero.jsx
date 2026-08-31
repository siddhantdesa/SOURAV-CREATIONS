import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="bg-stone-100 py-20 px-6 text-center border-b border-stone-200">
      <div className="max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-widest text-amber-700 uppercase">
          Kolkata • Handmade Gifts • Endless Memories
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">
          Personalized & Creative Keepsakes
        </h1>
        <p className="text-stone-600 max-w-2xl mx-auto text-sm md:text-base">
          Crafting unique 3D photo frames, miniature rooms, customized shadow boxes, and festive keepsakes for your special moments.
        </p>
        <div className="pt-4">
          <Link
            to="/shop"
            className="inline-block bg-stone-900 text-white text-xs font-medium tracking-widest px-8 py-3.5 uppercase hover:bg-stone-800 transition-colors"
          >
            Explore Creations
          </Link>
        </div>
      </div>
    </div>
  );
}
