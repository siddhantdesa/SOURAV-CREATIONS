import React from 'react';

export default function ProductFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-2">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory('All')}
          className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border ${
            selectedCategory === 'All'
              ? 'bg-stone-900 text-white border-stone-900'
              : 'border-stone-300 text-stone-600 hover:border-stone-800'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white border-stone-900'
                : 'border-stone-300 text-stone-600 hover:border-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
