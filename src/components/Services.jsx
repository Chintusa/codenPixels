import React from 'react';
import { Check } from 'lucide-react';
import { SERVICES } from '../data';
import LucideIcon from './LucideIcon';

export const Services = ({ setActiveTab }) => {
  return (
    <section className="pt-0 pb-8 sm:pt-4 sm:pb-16 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-transparent relative overflow-hidden" id="services">
      {/* Decorative colored grid spots */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Blueprint technical vector nodes behind services cards */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="services-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#services-grid)" />
        </svg>
      </div>

      {/* Decorative crosshairs on left/right edges */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-25 text-primary hidden xl:block pointer-events-none select-none">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animate-[spin_40s_linear_infinite]">
          <circle cx="30" cy="30" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="30" y1="0" x2="30" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute right-6 top-1/3 opacity-25 text-[#06B6D4] hidden xl:block pointer-events-none select-none">
        <svg width="85" height="85" viewBox="0 0 85 85" fill="none" className="rotate-45">
          <rect x="5" y="5" width="75" height="75" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="42.5" cy="42.5" r="4" fill="currentColor" />
          <text x="12" y="70" fill="currentColor" className="text-[6px] font-mono">[CAPABILITY_MAP_v2]</text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-20">
          <span className="text-xs font-mono tracking-widest text-[#2563EB] uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Our Service Categories
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold sm:font-extrabold tracking-tight text-slate-900 leading-tight">
            Engineered Core Capabilities
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg col-span-3">
            We deliver industry-standard, secure, and blazing-fast frontends, backends, databases, and custom dashboard engines that empower ambitious teams.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="flex flex-col justify-between p-6 sm:p-8 bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl sm:rounded-3xl hover:bg-white/65 hover:border-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden group h-full"
            >
              <div>
                {/* Custom glowing background accent for active hover cards */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Card Icon */}
                <div className="p-3 sm:p-4 bg-white border border-slate-100 shadow-sm text-primary w-fit rounded-xl sm:rounded-2xl mb-5 sm:mb-6 relative z-10 group-hover:-translate-y-1 transition-transform">
                  <LucideIcon name={srv.icon} size={22} className="stroke-[2] sm:size-[24px]" />
                </div>

                <div className="relative z-10">
                  {/* <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider">
                    SERVICE : {srv.id.toUpperCase()}
                  </span> */}
                  
                  <h3 className="mt-1 text-lg sm:text-xl font-display font-bold sm:font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                    {srv.title}
                  </h3>
                  
                  <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm text-slate-500 leading-relaxed font-sans min-h-[auto] sm:min-h-[60px]">
                    {srv.description}
                  </p>
                </div>

                {/* Summary checklist snippet inside the card of 3 values */}
                <div className="mt-5 sm:mt-6 space-y-2 relative z-10">
                  {srv.features.slice(0, 3).map((feat, index) => (
                    <div key={index} className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-600">
                      <Check size={11} className="text-[#06B6D4] stroke-[3.5] sm:size-[12px]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
