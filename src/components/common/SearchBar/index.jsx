import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../services/productService';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setAllProducts(data);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setIsOpen(true);
  }, [query, allProducts]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProduct = (id) => {
    setQuery('');
    setIsOpen(false);
    navigate(`/product/${id}`);
  };

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items..."
          className="w-full bg-stone-100 text-stone-900 text-xs py-2 pl-9 pr-8 rounded border border-stone-200 focus:outline-none focus:border-stone-400"
        />
        <Search size={16} className="absolute left-2.5 text-stone-400 pointer-events-none" />
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-2 text-stone-400 hover:text-stone-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded shadow-lg max-h-64 overflow-y-auto z-50">
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.id)}
                className="flex items-center space-x-3 p-2 hover:bg-stone-50 cursor-pointer border-b border-stone-100 last:border-b-0"
              >
                <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                <div className="flex-grow overflow-hidden">
                  <p className="text-xs font-semibold text-stone-900 truncate">{product.name}</p>
                  <p className="text-[10px] text-stone-500">${Number(product.price).toFixed(2)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-xs text-stone-500 text-center">No products found</div>
          )}
        </div>
      )}
    </div>
  );
}
