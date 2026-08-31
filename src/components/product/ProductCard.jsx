import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  return (
    <div className="group bg-white border border-stone-200 overflow-hidden flex flex-col justify-between">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors ${
            isInWishlist(product.id) ? 'text-rose-600' : 'text-stone-600 hover:text-stone-900'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">{product.category}</span>
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-sm text-stone-900 group-hover:underline line-clamp-1">{product.name}</h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <span className="font-semibold text-xs text-stone-900">${Number(product.price).toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center space-x-1 text-xs uppercase tracking-wider font-semibold text-stone-700 hover:text-stone-900"
          >
            <ShoppingBag size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
