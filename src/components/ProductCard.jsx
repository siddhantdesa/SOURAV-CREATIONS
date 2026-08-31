import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-white border border-stone-100 overflow-hidden">
      <div className="relative aspect-square bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            wishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 text-stone-700 hover:bg-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
            {product.category}
          </span>
          <Link to={`/product/${product.id}`} className="block mt-1">
            <h3 className="text-sm font-medium text-stone-800 hover:text-stone-600 line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <span className="text-sm font-semibold text-stone-900">
            ?{product.price.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center space-x-1.5 text-xs border border-stone-800 px-3 py-1.5 uppercase font-medium tracking-wider hover:bg-stone-900 hover:text-white transition-colors"
          >
            <ShoppingBag size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
