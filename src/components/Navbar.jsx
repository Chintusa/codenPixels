import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-xs py-3 border-b border-slate-200/50' 
          : 'bg-white/10 backdrop-blur-xs py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Dynamic Logo */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 font-display font-black text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight select-none cursor-pointer text-slate-900 group"
        >
          <div className="bg-gradient-to-br from-[#2563EB] to-[#06B6D4] w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl text-white shadow-lg shadow-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Terminal size={15} className="stroke-[2.5] sm:size-[17px]" />
          </div>
          <span className="text-[#0F172A] font-black sm:font-extrabold tracking-tight">
            Coden<span className="text-[#2563EB]">Pixels</span>
          </span>
         </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1.5 xl:gap-2.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative px-2 md:px-2.5 lg:px-3.5 xl:px-4 py-1.5 md:py-2 rounded-full font-sans text-[11px] lg:text-xs xl:text-sm tracking-normal transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'text-[#2563EB] font-bold' 
                    : 'text-slate-600 hover:text-[#2563EB] font-medium lg:font-semibold'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop CTA Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 px-3 lg:px-5 xl:px-6 py-2.5 bg-[#0F172A] hover:bg-[#2563EB] hover:scale-105 text-white text-[10px] xl:text-xs font-bold uppercase tracking-wider font-sans rounded-full transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer group"
          >
            Start Your Project
            <ArrowUpRight size={11} className="sm:size-[13px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburguer Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 bg-white/65 hover:bg-white border border-white/40 text-slate-800 rounded-xl focus:outline-none backdrop-blur-md shadow-sm transition-colors"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/60 backdrop-blur-xl border-b border-white/20 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-3 rounded-xl text-left font-sans text-base font-semibold transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  setActiveTab('contact');
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-4 flex items-center justify-center gap-1.5 w-full py-3.5 bg-primary text-white font-sans font-semibold rounded-xl"
              >
                Start Your Project
                <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
