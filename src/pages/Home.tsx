import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const carModels = [
    { name: 'W123', image: 'https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg', description: 'The Indestructible Standard' },
    { name: 'W124', image: 'https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg', description: 'The Modern Classic' },
    { name: 'W126', image: 'https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg', description: 'The Pinnacle of Luxury' },
    { name: 'R107', image: 'https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg', description: 'The Timeless Roadster' },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/mercedes-classic/1920/1080"
            alt="Classic Mercedes"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif font-light tracking-tighter mb-6"
          >
            Preserving the <span className="italic">Indestructible</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 font-light tracking-wide"
          >
            Luxury parts for classic Mercedes-Benz. Engineered to the original standards of integrity, ensuring your classic stays on the road for generations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/parts"
              className="inline-flex items-center space-x-3 border border-white px-8 py-4 uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-500"
            >
              <span>Explore Parts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Car Models Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif mb-16 text-center tracking-widest uppercase">Select Your Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {carModels.map((car, index) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Top Selling Part Overlay - Partially covering the image as requested */}
              <div className="absolute bottom-8 -right-2 w-56 bg-white text-black p-5 shadow-2xl border border-black/5 z-10">
                <p className="text-[9px] uppercase tracking-[0.2em] text-black/40 mb-1 font-bold">Best Seller</p>
                <h4 className="text-sm font-serif mb-3 leading-tight">W201/W124 4 Cylinder Tachometer Board</h4>
                <Link 
                  to="/parts/2" 
                  target="_blank"
                  className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest border-b border-black/20 pb-1 hover:border-black transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-serif mb-2">{car.name}</h3>
                <p className="text-white/50 text-sm tracking-widest uppercase">{car.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Releases */}
      <section className="bg-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-8 tracking-tight">Upcoming Releases</h2>
              <p className="text-white/60 mb-12 leading-relaxed font-light">
                We are constantly engineering new solutions for common failures. Our next project focuses on the W126 climate control unit, replacing the aging vacuum pods with precision electronic actuators.
              </p>
              <div className="space-y-6">
                <div className="border-l-2 border-white/20 pl-6 py-2">
                  <h4 className="text-sm uppercase tracking-widest mb-1">W126 Climate Control Board</h4>
                  <p className="text-xs text-white/40">Expected Q3 2026</p>
                </div>
                <div className="border-l-2 border-white/20 pl-6 py-2">
                  <h4 className="text-sm uppercase tracking-widest mb-1">W123 Power Window Logic</h4>
                  <p className="text-xs text-white/40">Expected Q4 2026</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square">
              <img
                src="https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg"
                alt="Engineering"
                className="w-full h-full object-cover grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border border-white/10 m-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Accessories & Stay Connected */}
      <section className="py-24 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif mb-8 tracking-widest uppercase">Accessories & Lifestyle</h2>
        <p className="text-white/50 mb-16 text-sm max-w-xl mx-auto font-light">
          Small-batch drops and limited releases. Our accessories maintain the same tight QC and consistent finishing as our precision mechanical parts.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {['Keychains', 'Tool Kits', 'Apparel', 'Manuals'].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="aspect-square bg-zinc-900 mb-4 overflow-hidden">
                <img
                  src="https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg"
                  alt={item}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs uppercase tracking-widest">{item}</p>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <h3 className="text-2xl font-serif mb-6">Stay Connected</h3>
          <p className="text-white/50 mb-8 text-sm">Join our mailing list for technical guides and new part releases.</p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="flex-1 bg-transparent border-b border-white/30 py-3 text-xs tracking-widest focus:outline-none focus:border-white transition-colors"
            />
            <button className="uppercase tracking-widest text-xs border border-white px-6 py-3 hover:bg-white hover:text-black transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
