import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { Part } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

const Parts = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useAppContext();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    fetch('/api/parts')
      .then(res => res.json())
      .then(data => {
        setParts(data);
        setLoading(false);
      });
  }, []);

  const filteredParts = categoryFilter 
    ? parts.filter(p => p.subcategory === categoryFilter)
    : parts;

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-16">
          <h1 className="text-4xl font-serif mb-4 tracking-tight">
            {categoryFilter ? categoryFilter : 'Precision Parts'}
          </h1>
          <p className="text-white/50 max-w-2xl font-light">
            Each component is engineered to restore your Mercedes-Benz to its original factory integrity. We specialize in electronics and mechanical assemblies that have historically failed due to age.
          </p>
        </header>

        {/* Core Return Info */}
        <div className="bg-zinc-900/50 border border-white/10 p-8 mb-16 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-serif mb-2">Core Exchange Program</h3>
            <p className="text-sm text-white/60 max-w-xl">
              Keep the cycle going. Send us your old, broken assembly (core) and we'll reimburse you the core charge. This helps us maintain a supply of original housings for future enthusiasts.
            </p>
          </div>
          <Link to="/contact" className="text-xs uppercase tracking-widest border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-all">
            Learn More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredParts.map((part) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to={`/parts/${part.id}`}
                target="_blank"
                className="relative aspect-square bg-zinc-900 mb-6 overflow-hidden block"
              >
                <img
                  src={part.image_url}
                  alt={part.name}
                  className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                
                {/* Quick View Link Indicator */}
                <div className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </Link>

              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">{part.subcategory}</p>
                    <Link to={`/parts/${part.id}`} target="_blank">
                      <h3 className="text-lg font-serif group-hover:text-white/80 transition-colors">{part.name}</h3>
                    </Link>
                  </div>
                  <p className="text-sm font-light">${part.price.toFixed(2)}</p>
                </div>
                
                <p className="text-xs text-white/50 line-clamp-2 font-light leading-relaxed">
                  {part.description}
                </p>
                
                <div className="pt-4 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-widest text-white/30">{part.car_models}</p>
                  <button
                    onClick={() => addToCart(part)}
                    className="flex items-center space-x-2 text-[10px] uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Parts;
