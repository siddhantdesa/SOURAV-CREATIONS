import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif text-stone-900">Your Cart is Empty</h1>
        <p className="text-stone-500 text-sm">Looks like you haven't added any handcrafted items yet.</p>
        <Link
          to="/shop"
          className="inline-block bg-stone-900 text-white px-6 py-3 text-xs uppercase font-semibold tracking-widest hover:bg-stone-800 transition-colors"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <div className="flex justify-between items-center border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-serif text-stone-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs uppercase tracking-wider text-rose-600 hover:text-rose-800 font-semibold"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border border-stone-200 p-4 bg-white">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-stone-100" />
              <div className="flex-grow space-y-1">
                <h3 className="font-serif text-stone-900 text-sm font-semibold">{item.name}</h3>
                <p className="text-xs text-stone-500">${Number(item.price).toFixed(2)} each</p>
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => addToCart({ ...item, quantity: -1 })}
                    className="w-6 h-6 border border-stone-300 text-stone-600 text-xs flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-xs font-semibold px-2">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-6 h-6 border border-stone-300 text-stone-600 text-xs flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="font-semibold text-stone-900 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-stone-400 hover:text-rose-600 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-stone-100 p-6 space-y-6 h-fit border border-stone-200">
          <h2 className="text-lg font-serif text-stone-900 border-b border-stone-300 pb-3">Order Summary</h2>
          <div className="space-y-3 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-stone-300 font-semibold text-sm text-stone-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="w-full bg-stone-900 text-white py-3 text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 hover:bg-stone-800 transition-colors"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
