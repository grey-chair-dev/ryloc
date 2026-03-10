import React from 'react';
import { motion } from 'motion/react';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-serif mb-12 tracking-tight">Our Story</h1>
            <div className="space-y-8 text-white/70 font-light leading-relaxed">
              <p>
                Ryloc Parts was born out of a simple frustration: watching the world's most indestructible cars fall victim to small, poorly manufactured shortcuts taken decades ago.
              </p>
              <p>
                Mercedes-Benz built the W123, W124, and W126 to last forever. And while the chassis and engines often do, the electronics and small mechanical assemblies were often the weak link. When these parts inevitably break, owners are often left with two choices: expensive, aging NOS (New Old Stock) parts that may fail again, or cheap, low-quality alternatives that compromise the integrity of the vehicle.
              </p>
              <p>
                We believe there is a third way. By combining modern engineering with the original design philosophy of Mercedes-Benz, we create parts that look, feel, and perform as if they just rolled off the showroom floor—but with the reliability of 21st-century technology.
              </p>
              <p>
                Based in Southern California, we are a small team of engineers and enthusiasts dedicated to keeping the classics on the road. We don't just sell parts; we preserve history.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg"
                alt="Workshop"
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-zinc-900 border border-white/10 p-8 hidden md:block">
              <p className="text-4xl font-serif mb-2">100%</p>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Integrity in Manufacturing</p>
              <div className="mt-8 h-px bg-white/20 w-full" />
              <p className="mt-4 text-xs italic text-white/60">"Engineered to outlast the original."</p>
            </div>
          </motion.div>
        </div>

        {/* Shipping & Policy Section from Netlify site */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 pt-24 border-t border-white/10"
        >
          <h2 className="text-3xl font-serif mb-16 tracking-widest uppercase text-center">Shipping & Policy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-zinc-900/30 p-8 border border-white/5">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Processing</h4>
              <p className="text-sm font-light text-white/70 leading-relaxed">
                Orders are typically processed within 2–5 business days. Please note that small-batch drops may vary in lead time to ensure consistent finishing.
              </p>
            </div>
            <div className="bg-zinc-900/30 p-8 border border-white/5">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Returns</h4>
              <p className="text-sm font-light text-white/70 leading-relaxed">
                We accept returns on unused items within 14 days of delivery. Each component must be in its original packaging to maintain our quality control standards.
              </p>
            </div>
            <div className="bg-zinc-900/30 p-8 border border-white/5">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Support</h4>
              <p className="text-sm font-light text-white/70 leading-relaxed">
                Our team responds to all inquiries within 1 business day. We are committed to providing the same level of support as the quality of our parts.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
