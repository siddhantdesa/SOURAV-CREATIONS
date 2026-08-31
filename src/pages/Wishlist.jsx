import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif text-stone-900">Your Wishlist is Empty</h1>
        <p className="text-stone-500 text-sm">Save items you love by clicking the heart icon on any product.</p>
        <Link
          to="/shop"
          className="inline-block bg-stone-900 text-white px-6 py-3 text-xs uppercase font-semibold tracking-widest hover:bg-stone-800 transition-colors"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-serif text-stone-900">Saved Items</h1>
        <p className="text-xs text-stone-500 mt-1">{wishlist.length} item(s) in your wishlist</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
