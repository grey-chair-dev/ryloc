import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User as UserIcon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../AppContext';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPartsHovered, setIsPartsHovered] = useState(false);
  const { cart, user } = useAppContext();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Parts', path: '/parts', dropdown: true },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 border border-white flex items-center justify-center rounded-full">
              <span className="text-white font-serif text-xl">R</span>
            </div>
            <span className="text-white font-serif text-2xl tracking-widest uppercase">Ryloc</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.dropdown && setIsPartsHovered(true)}
                onMouseLeave={() => link.dropdown && setIsPartsHovered(false)}
              >
                <Link
                  to={link.path}
                  className={cn(
                    "text-sm uppercase tracking-widest transition-colors hover:text-white flex items-center",
                    isActive(link.path) ? "text-white" : "text-white/60"
                  )}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                </Link>

                {link.dropdown && (
                  <AnimatePresence>
                    {isPartsHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-48 bg-zinc-900 border border-white/10 py-4 shadow-2xl"
                      >
                        <Link to="/parts?category=Full Assembly" className="block px-6 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 uppercase tracking-widest">Full Assemblies</Link>
                        <Link to="/parts?category=Individual Boards" className="block px-6 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 uppercase tracking-widest">Individual Boards</Link>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="block px-6 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 uppercase tracking-widest border-t border-white/5 mt-2 pt-4">Install Guides</a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <Link
              to="/engineering"
              className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors border border-white/20 px-3 py-1 rounded-full"
            >
              Subcontract Engineering
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative text-white/60 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link to="/account" className="text-white/60 hover:text-white transition-colors">
              <UserIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative text-white/60">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/60 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm uppercase tracking-widest text-white/60 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/engineering"
                onClick={() => setIsOpen(false)}
                className="block text-xs uppercase tracking-widest text-white/40"
              >
                Subcontract Engineering
              </Link>
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                className="block text-sm uppercase tracking-widest text-white/60"
              >
                Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
