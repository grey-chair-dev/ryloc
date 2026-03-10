import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';

const Cart = () => {
  const { cart, removeFromCart } = useAppContext();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const coreCharges = cart.reduce((sum, item) => sum + (item.core_charge * item.quantity), 0);
  const total = subtotal + coreCharges;

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-serif mb-12 tracking-tight">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-24 border border-white/10 bg-zinc-900/30">
            <ShoppingBag className="w-12 h-12 mx-auto mb-6 text-white/20" />
            <p className="text-white/50 mb-8">Your cart is currently empty.</p>
            <Link to="/parts" className="inline-block border border-white px-8 py-4 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
              Browse Parts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center space-x-6 bg-zinc-900/50 p-6 border border-white/5"
                  >
                    <div className="w-24 h-24 bg-black overflow-hidden flex-shrink-0">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{item.subcategory}</p>
                      <h3 className="text-lg font-serif mb-1">{item.name}</h3>
                      <p className="text-sm text-white/60">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="bg-zinc-900 p-8 border border-white/10 h-fit">
              <h3 className="text-xl font-serif mb-8">Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Core Charges</span>
                  <span>${coreCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Shipping</span>
                  <span className="text-[10px] uppercase tracking-widest">Calculated at checkout</span>
                </div>
                <div className="h-px bg-white/10 w-full my-4" />
                <div className="flex justify-between text-lg font-serif">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-white text-black uppercase tracking-[0.2em] text-[10px] font-bold py-5 hover:bg-white/90 transition-colors flex items-center justify-center space-x-3">
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="mt-6 text-[10px] text-white/30 text-center uppercase tracking-widest leading-relaxed">
                Free shipping on orders over $500.<br />Core refunds processed within 7 days of receipt.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
