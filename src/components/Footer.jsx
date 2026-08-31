import React from 'react';
import { Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-10 mt-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-serif tracking-widest text-white uppercase">Sourav Creations</h2>
          <p className="text-xs text-stone-400 mt-1">Authentic fashion, ethnic wear, & handcrafted designs.</p>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="https://www.instagram.com/souravcreations2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs text-stone-300 hover:text-white transition-colors"
          >
            <Instagram size={18} />
            <span>@souravcreations2</span>
          </a>
        </div>

        <div className="text-xs text-stone-400">
          © {new Date().getFullYear()} Sourav Creations. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
