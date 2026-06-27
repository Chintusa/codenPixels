import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/50'
          : 'bg-white/10 backdrop-blur-sm py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo + Brand */}
        <button
          onClick={() => handleNavigation('home')}
          className="flex items-center gap-3 select-none cursor-pointer group"
        >
          <img
            src="/logo.png"
            alt="CodeNPixel Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <div className="hidden sm:flex flex-col items-start leading-none">
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
              <span className="text-slate-900">Code</span>
              <span className="text-slate-900">N</span>
              <span className="text-[#2563EB]">Pixel</span>
            </h1>

            
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`relative px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#2563EB] font-bold'
                    : 'text-slate-600 hover:text-[#2563EB]'
                }`}
              >
                <span className="relative z-10">{item.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-blue-50 rounded-full"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => handleNavigation('contact')}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10 group"
          >
            Start Your Project
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 bg-white/70 hover:bg-white border border-white/40 text-slate-800 rounded-xl backdrop-blur-md shadow-sm transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/90 backdrop-blur-xl border-b border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`px-4 py-3 rounded-xl text-left font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-[#2563EB] border-l-4 border-[#2563EB]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                onClick={() => handleNavigation('contact')}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
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