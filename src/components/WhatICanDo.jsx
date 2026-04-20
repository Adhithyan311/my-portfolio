import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Minimal inline SVG icons for maximum performance
const BrainIcon = () => (<svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.418 6 7.4c0 1.94 1.18 3.65 2.94 4.54v2.52C8.94 16.15 6.5 19.34 6.5 22h11c0-2.66-2.44-5.85-2.44-7.54v-2.52c1.76-.89 2.94-2.6 2.94-4.54C18 4.418 15.314 2 12 2zM12 2v20m3-15h-6M9 11h6M10 15h4"/></svg>);
const ServerIcon = () => (<svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="18" height="8" x="3" y="4" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/><rect width="18" height="8" x="3" y="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" d="M6 8h.01M6 18h.01M10 8h8M10 18h8"/></svg>);
const LayersIcon = () => (<svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m12 2 10 5-10 5L2 7l10-5zm0 10 10 5-10 5-10-5 10-5zM2 12l10 5 10-5"/></svg>);
const LightningIcon = () => (<svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>);

const cards = [
  {
    title: "Architect scalable backend systems and intelligent platforms",
    desc: "Engineered data processing pipelines and backend architectures utilizing Python and modern databases to power seamless, data-driven user experiences.",
    icon: BrainIcon
  },
  {
    title: "Design scalable, high-performance backend APIs with FastAPI and Python",
    desc: "Developed high-performance REST APIs with FastAPI, including authentication, middleware, and optimized request handling.",
    icon: ServerIcon
  },
  {
    title: "Develop full-stack applications with clean, modular architecture",
    desc: "Engineered complete applications using React and FastAPI with modular architecture, ensuring scalability and maintainability.",
    icon: LayersIcon
  },
  {
    title: "Create intelligent automation solutions for real-world problems",
    desc: "Created AI-driven automation tools to streamline recruitment workflows and reduce manual effort.",
    icon: LightningIcon
  }
];

const CapabilityCard = ({ title, desc, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      className="group relative bg-[#07070a]/80 border border-white/5 rounded-xl p-6 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-cyan-500/20 hover:bg-[#0a0c12] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)] cursor-default overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Soft Hover Glow Inside */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Subtle indicator line */}
      <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-y-50 group-hover:scale-y-100" />
      
      <div className="flex items-start gap-4 relative z-10 h-full flex-col sm:flex-row">
        <div className="text-gray-500 group-hover:text-cyan-400 transition-colors duration-300 mt-1">
          <Icon />
        </div>
        <div className="flex-1 flex flex-col justify-start">
          <h3 className="text-[#c0c0c8] group-hover:text-[#e5e5e5] font-bold text-[15px] leading-relaxed tracking-wide transition-colors duration-300">
            {title}
          </h3>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -5 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -5 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-gray-400 text-sm leading-relaxed mt-4 opacity-80 font-light border-t border-white/5 pt-3">
                  {desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export const WhatICanDo = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-2 px-4 max-w-5xl mx-auto w-full">
      {/* Section Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-[#a0a0a5] font-light text-center text-sm md:text-base max-w-2xl mb-12 opacity-80 tracking-wide"
      >
        I build robust backend architectures and scalable software to solve complex real-world problems.
      </motion.p>
      
      <motion.div 
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
      >
        {cards.map((card, idx) => (
          <CapabilityCard key={idx} {...card} />
        ))}
      </motion.div>
    </div>
  );
};
