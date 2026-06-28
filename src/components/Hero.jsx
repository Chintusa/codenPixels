import React from 'react';
import { motion } from 'motion/react';
import { Server, Layers, Shield, ArrowRight } from 'lucide-react';

import heroDashboardImage from "../assets/images/hero_dashboard_clean_1781549662475.jpg";

export const Hero = ({ setActiveTab }) => {
  return (
    <section className="relative min-h-[auto] md:min-h-screen pt-24 pb-12 sm:pt-28 md:pt-32 sm:pb-20 bg-transparent flex items-center overflow-hidden" id="hero">
      
      {/* Immersive radial gradient backplane lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-tr from-primary/10 to-secondary/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-48 sm:w-96 h-48 sm:h-96 bg-accent/5 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none" />

      {/* Grid line grid overlay popular in developer agency aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left Column: Typography Content & CTA Actions */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left pt-4 lg:pt-0">
          
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-mono font-bold uppercase rounded-full mb-4 sm:mb-6 max-w-fit">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-secondary rounded-full animate-ping" />
            <span>Accepting Digital Projects for 2026</span>
          </span>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold sm:font-black tracking-tight text-slate-900 leading-[1.125] sm:leading-[1.1]">
            Transforming Ideas Into <span className="text-[#2563EB]">Powerful Digital</span> Solutions
          </h1>

          <p className="mt-4 sm:mt-6 text-slate-500 font-sans text-sm sm:text-base md:text-lg lg:text-xl font-normal sm:font-medium leading-relaxed max-w-xl">
            We build secure, scalable, and user-friendly websites and software solutions that help modern businesses and enterprises grow with authority.
          </p>

          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            
            {/* CTA 1: Start Your Project */}
            <button
               onClick={() => {
                 setActiveTab('contact');
                 const contact = document.getElementById('contact');
                 if (contact) contact.scrollIntoView({ behavior: 'smooth' });
               }}
               className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4.5 bg-primary hover:bg-[#1E40AF] text-white font-sans text-xs sm:text-sm font-semibold rounded-2xl w-full sm:w-auto transition-all shadow-lg hover:shadow-primary/30 hover:scale-[1.02] cursor-pointer group"
            >
              <span>Start Your Project</span>
              <ArrowRight size={14} className="sm:size-[16px] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* CTA 2: View Our Work */}
            <button
              onClick={() => {
                setActiveTab('projects');
                const projects = document.getElementById('projects');
                if (projects) projects.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-sans text-xs sm:text-sm font-semibold rounded-2xl border border-slate-200/60 w-full sm:w-auto transition-all cursor-pointer"
            >
              <span>View Our Work</span>
            </button>
          </div>

          {/* Quick core metrics tags */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 border-t border-slate-200/50 pt-6 sm:pt-8 w-full">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Shield size={14} className="text-secondary sm:size-[16px]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase">Secure Deployments</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Server size={14} className="text-primary sm:size-[16px]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Layers size={14} className="text-purple-400 sm:size-[16px]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase">React 19 & Tailwind</span>
            </div>
          </div>
        </div>

        {/* Right Column: Immersive Professional Image Frame */}
        <div className="lg:col-span-6 w-full relative">
          
          {/* Ambient background decoration circle shape */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary rounded-[36px] blur-xl opacity-20" />

          {/* Browser Container Frame showcasing the new polished generated dashboard image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-w-md sm:max-w-none lg:max-w-full mx-auto group hover:scale-[1.01] transition-transform duration-300"
          >
            {/* Top window styling header. Red, yellow, green buttons and clean fake address bar */}
            <div className="bg-slate-50 px-3 sm:px-5 py-2.5 sm:py-3 border-b border-slate-200/65 flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400/85 rounded-full" />
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400/85 rounded-full" />
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400/85 rounded-full" />
              </div>

              {/* Fake web browser URL bar */}
              <div className="bg-white border border-slate-200/80 px-2 sm:px-4 py-0.5 sm:py-1 rounded-lg text-[8px] sm:text-[10px] font-mono text-slate-400 select-none w-36 xs:w-48 sm:w-64 text-center truncate shadow-2xs">
                https://codenpixels.com/staging-dashboard
              </div>

              <div className="w-8 sm:w-10" /> {/* Spacer */}
            </div>

            {/* Inner Dashboard PNG Image showcasing modern metrics */}
            <div className="relative aspect-[4/3] xs:aspect-[16/10] sm:aspect-video lg:aspect-[4/3] xl:aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
              <img
                src={heroDashboardImage}
                alt="Professional CRM Web Dashboard Mockup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle bottom browser footer with status indicator */}
            <div className="bg-slate-50 px-3 sm:px-5 py-2 sm:py-2.5 border-t border-slate-200/65 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 sm:gap-1.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Sandbox deployment live</span>
              </span>
              <span>SSL SECURED</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
