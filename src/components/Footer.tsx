import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 border border-white flex items-center justify-center rounded-full">
                <span className="text-white font-serif text-sm">R</span>
              </div>
              <span className="text-white font-serif text-xl tracking-widest uppercase">Ryloc Parts</span>
            </Link>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed font-light">
              Dedicated to the preservation of classic Mercedes-Benz. We engineer high-integrity components to keep the world's finest automobiles on the road.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">Navigation</h4>
            <ul className="space-y-4 text-xs uppercase tracking-widest">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/parts" className="hover:text-white transition-colors">Parts</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">Connect</h4>
            <div className="flex space-x-6">
              <a href="https://instagram.com/rylocparts" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="mailto:contact@rylocparts.com" className="text-white/40 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[10px] uppercase tracking-widest text-white/20">
            © 2026 Ryloc Parts. All Rights Reserved.
          </p>
          <div className="flex space-x-8 text-[10px] uppercase tracking-widest text-white/20">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
