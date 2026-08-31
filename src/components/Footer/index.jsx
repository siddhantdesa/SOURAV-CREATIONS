import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        <p className="font-serif text-lg text-white tracking-widest">SOURAV CREATIONS</p>
        <p>© {new Date().getFullYear()} Sourav Creations. All rights reserved.</p>
      </div>
    </footer>
  );
}
