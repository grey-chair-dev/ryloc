import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Youtube, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { Part } from '../types';

const PartDetail = () => {
  const { id } = useParams();
  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useAppContext();

  useEffect(() => {
    fetch(`/api/parts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPart(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  if (!part) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Part not found</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-zinc-900 overflow-hidden border border-white/10">
              <img
                src={part.image_url}
                alt={part.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-zinc-900 border border-white/5 opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                   <img src="https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg" alt="Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">{part.category} / {part.subcategory}</p>
              <h1 className="text-4xl font-serif mb-4">{part.name}</h1>
              <p className="text-2xl font-light mb-6">${part.price.toFixed(2)}</p>
              <div className="h-px bg-white/10 w-full mb-8" />
              <p className="text-white/60 leading-relaxed font-light mb-8">
                {part.description}
                <br /><br />
                Our {part.name} is a direct-fit replacement designed to address the common failure points of the original Mercedes-Benz component. Using modern surface-mount technology and high-grade capacitors, we ensure a lifespan that exceeds the original equipment.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-3 text-sm text-white/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Fits Models: {part.car_models}</span>
              </div>
              {part.core_charge > 0 && (
                <div className="bg-zinc-900/80 p-4 border border-white/5">
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Core Charge Notice</p>
                  <p className="text-sm">A ${part.core_charge.toFixed(2)} core charge is included. Refundable upon receipt of your original part.</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={() => addToCart(part)}
                className="flex-1 bg-white text-black uppercase tracking-[0.2em] text-xs font-bold py-5 hover:bg-white/90 transition-colors flex items-center justify-center space-x-3"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-white/20 uppercase tracking-[0.2em] text-xs py-5 hover:bg-white/5 transition-colors flex items-center justify-center space-x-3"
              >
                <Youtube className="w-4 h-4" />
                <span>Install Guide</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PartDetail;
