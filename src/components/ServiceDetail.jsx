import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Zap,
  Layers,
  CodeXml,
  MessageSquare,
  ArrowLeft,
  X,
  Globe2,
  Clock,
  ShieldAlert,
  Flame,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import LucideIcon from './LucideIcon';
import Breadcrumbs from './Breadcrumbs';
import { PROCESS_STEPS } from '../data';

export const ServiceDetail = ({ service, onNavigate }) => {
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-display font-bold text-slate-900">Service Not Found</h1>
        <p className="mt-4 text-slate-600">The requested service page does not exist.</p>
        <a
          href="/services"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/services');
          }}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to All Services</span>
        </a>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Services', path: '/services' },
    { label: service.title, path: `/services/${service.slug}` }
  ];

  const formattedPrice = service.startingPriceUsd
    ? (service.startingPriceUsd.startsWith('$') ? service.startingPriceUsd : `$${service.startingPriceUsd}`)
    : '$300';

  return (
    <article className="pt-24 pb-16 sm:pt-28 sm:pb-24 bg-transparent relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
        </div>

        {/* Hero Section of Service (High-Impact 2-Column Split Layout) */}
        <header className="mb-16 sm:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tag Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="p-2 bg-primary/10 text-primary rounded-xl inline-flex items-center justify-center">
                <LucideIcon name={service.icon || 'Sparkles'} size={20} className="stroke-[2.2]" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                Specialized Engineering
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Target: US 🇺🇸 • UK 🇬🇧 • AU 🇦🇺
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.14]">
              {service.h1Title || service.title}
            </h1>

            {/* Long Description (Natural left alignment, scannable) */}
            <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed max-w-2xl text-left">
              {service.longDescription || service.description}
            </p>

            {/* Pricing & Key Signals Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xs">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  Starter Rate:
                </span>
                <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-lg">
                  {formattedPrice} USD
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-mono text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Booking Open</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-mono text-slate-600">
                <ShieldCheck size={14} className="text-primary" />
                <span>Zero Lock-in SLA</span>
              </div>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-primary hover:bg-[#1D4ED8] text-white font-sans text-sm font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer group"
              >
                <span>Get a Project Proposal</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/projects"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/projects');
                }}
                className="inline-flex items-center gap-2 px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-sans text-sm font-semibold rounded-2xl border border-slate-200/90 transition-all cursor-pointer"
              >
                <span>View Live Case Studies</span>
              </a>
            </div>

            {/* Trust Micro-Indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600 stroke-[3]" />
                <span>100% Custom Code (No Template Bloat)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600 stroke-[3]" />
                <span>Timezone-Synchronized Delivery</span>
              </span>
            </div>

          </div>

          {/* Right Column: High-Resolution Service Visual Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-lg">
              
              {/* Vibrant Accent Glow Behind Card */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 via-[#06B6D4]/20 to-primary/10 rounded-3xl blur-2xl opacity-70 pointer-events-none"></div>

              {/* Glass Showcase Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xl p-4 space-y-4">
                
                {/* Visual Image Preview */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner group">
                  <img
                    src={service.image || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=85&w=1200"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1200";
                    }}
                  />
                  
                  {/* Floating Live Architecture Badge */}
                  <div className="absolute top-3 left-3 bg-slate-950/90 text-white backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60 shadow-lg flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 absolute"></span>
                    <span className="ml-1.5">PRODUCTION-READY SYSTEM</span>
                  </div>

                  {/* Floating Price Pill */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800">
                    <LucideIcon name={service.icon || 'Sparkles'} size={14} className="text-primary" />
                    <span>From {formattedPrice} USD</span>
                  </div>
                </div>

                {/* Service Metadata Box */}
                <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 uppercase text-[10px] tracking-wider">
                      International Lead Fit
                    </span>
                    <span className="font-mono font-bold text-slate-800 flex items-center gap-1.5">
                      <span>USA 🇺🇸</span>
                      <span>UK 🇬🇧</span>
                      <span>AU 🇦🇺</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/70">
                    {service.technologies?.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                    <span className="text-[10px] font-mono text-primary font-bold ml-auto flex items-center gap-1">
                      <Check size={12} className="stroke-[3]" />
                      Turnkey SLA
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </header>

        {/* Problem vs Solution Comparison Section */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-2 font-bold">
              Strategic Diagnosis
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
              The Problem We Solve vs. How We Engineer It
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
            
            {/* The Challenge Card */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-rose-50/70 to-white/70 border border-rose-200/80 rounded-3xl backdrop-blur-md shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-rose-600 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertTriangle size={16} />
                <span>The Challenge / Industry Obstacles</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                Where Traditional Approaches Fail
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-left">
                {service.businessProblem}
              </p>

              <div className="pt-3 border-t border-rose-100 space-y-1.5 text-xs text-rose-800/90 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Unpredictable lead flow & tire-kicker drop-off</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Manual operational bottlenecks across timezones</span>
                </div>
              </div>
            </div>

            {/* The CodeNPixels Advantage Card */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-blue-50/70 to-white/70 border border-blue-200/80 rounded-3xl backdrop-blur-md shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 size={16} />
                <span>The CodeNPixels Advantage</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                Our Engineered Solution
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-left">
                {service.solution}
              </p>

              <div className="pt-3 border-t border-blue-100 space-y-1.5 text-xs text-blue-900 font-mono">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-primary stroke-[3]" />
                  <span>Sub-second responsive speed & 100% custom code</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-primary stroke-[3]" />
                  <span>Timezone-smart automations engineered for US, UK & AU</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Features & Deliverables Section */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3 font-bold">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900">
              Key Features & Deliverables
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base">
              Everything we engineer is built for long-term scalability, clean maintenance, and optimal speed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex items-start gap-3.5 text-left group"
              >
                <div className="p-2 bg-primary/10 text-primary rounded-xl shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Check size={16} className="stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {feat}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Turnkey milestone deliverable
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies Used Section */}
        <section className="mb-16 sm:mb-24 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl text-left">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 bg-white/10 px-3 py-1 rounded-full inline-block font-bold">
              Modern Technology Stack
            </span>

            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              Technologies & Frameworks We Employ
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We choose battle-tested, high-performance tools that guarantee security, longevity, and peak developer ergonomics across international cloud infrastructures.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 font-semibold shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 7-Step Delivery Process */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3 font-bold">
              How We Deliver
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900">
              Our 7-Step Delivery Process
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Structured sprint progression ensuring zero delays and complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.slice(0, 4).map((stp) => (
              <div
                key={stp.step}
                className="p-6 bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-2xl flex flex-col justify-between text-left hover:border-primary/40 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                      Step {stp.step}
                    </span>
                    <LucideIcon name={stp.icon} size={20} className="text-slate-400" />
                  </div>
                  <h3 className="text-base font-display font-bold text-slate-900 mb-2">{stp.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{stp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Benefits */}
        {service.benefits && service.benefits.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono tracking-widest text-secondary uppercase bg-cyan-500/10 px-3 py-1 rounded-full inline-block mb-3 font-bold">
                Value Proposition
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900">
                Tangible Business Outcomes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {service.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl flex items-start gap-4 shadow-xs"
                >
                  <div className="p-2.5 bg-gradient-to-tr from-primary to-[#06B6D4] text-white rounded-xl shrink-0 mt-0.5 shadow-sm">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {benefit.split(':')[0] || benefit.split(' for ')[0]}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Service FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3 font-bold">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900">
                Common Questions About {service.title}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    className="border border-slate-200/80 rounded-2xl bg-white/70 backdrop-blur-md overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-slate-900 hover:text-primary transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 text-left">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section className="bg-gradient-to-r from-primary to-[#06B6D4] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl text-left">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full inline-block font-bold">
              Ready to Build?
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight">
              Start Your {service.title} Project Today
            </h2>
            <p className="text-white/95 text-sm sm:text-base leading-relaxed">
              Serving high-growth businesses and founders across the United States, United Kingdom, and Australia with turnkey custom engineering.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
                className="px-6 py-3.5 bg-white hover:bg-slate-900 hover:text-white text-slate-900 transition-colors text-xs sm:text-sm font-bold rounded-xl shadow-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare size={14} />
                <span>Contact Engineering Team</span>
              </a>
              <a
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/services');
                }}
                className="px-6 py-3.5 bg-white/20 hover:bg-white/30 text-white transition-colors text-xs sm:text-sm font-bold rounded-xl inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Browse All Services</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
};

export default ServiceDetail;
