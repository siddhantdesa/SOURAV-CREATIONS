import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../services/productService';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setFeaturedProducts(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="space-y-16 py-10">
      <section className="bg-stone-200 text-stone-900 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-serif mb-4">Handcrafted Elegance</h1>
        <p className="text-stone-600 max-w-xl mx-auto mb-8 text-sm md:text-base">
          Discover unique, artisanal creations crafted with dedication and natural materials.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-stone-900 text-white px-8 py-3 text-xs uppercase font-semibold tracking-widest hover:bg-stone-800 transition-colors"
        >
          Explore Collection
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-serif text-stone-900 mb-8 border-b border-stone-200 pb-3">
          Featured Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
