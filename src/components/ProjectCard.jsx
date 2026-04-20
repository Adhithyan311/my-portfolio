import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectCard = ({ id = 'default', title, subtitle, description, keyFeatures = [], tech = [], link, github }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Stop click propagation when inside the modal
  const handleModalClick = (e) => e.stopPropagation();

  return (
    <>
      {/* The base card that acts as layout origin */}
      <motion.div
        layoutId={`card-container-${id}`}
        onClick={() => setIsOpen(true)}
        className="group/card relative w-full h-full cursor-pointer flex flex-col rounded-[20px] opacity-100 group-hover/grid:opacity-40 hover:!opacity-100 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-2 hover:scale-[1.02] shadow-lg hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)]"
      >
        {/* Glow border overlay tied to hover */}
        <motion.div
          layoutId={`card-glow-${id}`}
          className="absolute -inset-[2px] rounded-[22px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none bg-[linear-gradient(45deg,#06b6d4,#10b981,#06b6d4)] bg-[length:200%_auto] animate-gradient-slow"
        />
        
        {/* The sharp dotted/glowing border matching the prompt */}
        <motion.div
          layoutId={`card-border-${id}`}
          className="absolute -inset-[1px] rounded-[21px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none border border-cyan-400 border-dashed"
        />

        <motion.div layoutId={`card-bg-${id}`} className="absolute inset-0 bg-[#0d1117] group-hover/card:bg-[#121820] rounded-[20px] transition-colors duration-300 z-0" />
        
        <motion.div className="relative z-10 p-6 md:p-8 flex flex-col h-full m-[1px]">
          <div className="flex justify-between items-start mb-4 text-cyan-400">
            {/* Minimal Sparkle Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
            <motion.div layoutId={`card-arrow-${id}`} className="text-cyan-500/50 group-hover/card:text-cyan-400 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </motion.div>
          </div>
          
          <motion.h3 layoutId={`card-title-${id}`} className="text-2xl font-bold font-sans text-white mb-1 tracking-tight">{title}</motion.h3>
          <motion.p layoutId={`card-subtitle-${id}`} className="text-sm text-emerald-400/80 mb-5 font-mono">{subtitle}</motion.p>
          
          <motion.p layoutId={`card-desc-${id}`} className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {description}
          </motion.p>
          
          <motion.div layoutId={`card-tags-${id}`} className="flex flex-wrap gap-2 mt-auto">
            {tech.slice(0,4).map((t) => (
              <span key={t} className="px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded bg-black/40 border border-white/10 text-cyan-100/70 shadow-sm">
                {t}
              </span>
            ))}
            {tech.length > 4 && <span className="px-2 py-1 text-[10px] text-cyan-100/50">+{tech.length-4}</span>}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Expanded Modal Layer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" onClick={() => setIsOpen(false)}>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            
            <motion.div 
              layoutId={`card-container-${id}`}
              onClick={handleModalClick}
              className="relative w-full max-w-2xl rounded-3xl p-[2px] shadow-[0_0_50px_rgba(6,182,212,0.2)]"
            >
              <motion.div layoutId={`card-glow-${id}`} className="absolute inset-0 rounded-[24px] bg-[linear-gradient(45deg,#06b6d4,#10b981,#06b6d4)] blur-sm opacity-50" />
              <motion.div layoutId={`card-border-${id}`} className="absolute inset-[1px] rounded-[23px] border border-cyan-400/50" />
              <motion.div layoutId={`card-bg-${id}`} className="absolute inset-[2px] bg-[#0a0c10] rounded-[22px] z-0" />

              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                <div className="flex items-center gap-4 mb-2">
                   <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                   </div>
                   <div>
                     <motion.h3 layoutId={`card-title-${id}`} className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</motion.h3>
                     <motion.p layoutId={`card-subtitle-${id}`} className="text-md text-emerald-400/90 font-mono mt-1">{subtitle}</motion.p>
                   </div>
                </div>

                <motion.p layoutId={`card-desc-${id}`} className="text-gray-300 text-base md:text-lg leading-relaxed mt-6 mb-8">
                  {description}
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                     <h4 className="text-cyan-400 font-mono text-xs tracking-widest mb-3">KEY_FEATURES</h4>
                     <ul className="space-y-2">
                       {keyFeatures.map((f, i) => (
                         <motion.li 
                           initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i*0.05 }}
                           key={f} className="flex items-start text-sm text-gray-300"
                         >
                           <span className="text-cyan-500 mr-2">›</span> {f}
                         </motion.li>
                       ))}
                     </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-cyan-400 font-mono text-xs tracking-widest mb-3">TECH_STACK</h4>
                    <motion.div layoutId={`card-tags-${id}`} className="flex flex-wrap gap-2">
                      {tech.map((t) => (
                        <span key={t} className="px-2 py-1 text-xs font-medium rounded bg-black/40 border border-white/10 text-cyan-100/90">
                          {t}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="flex gap-4 mt-auto pt-6 border-t border-white/10"
                >
                  <a 
                    href={link} 
                    onClick={(e) => {
                      if (link?.startsWith('#')) {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsOpen(false);
                        
                        setTimeout(() => {
                          const id = link.substring(1);
                          const element = document.getElementById(id);
                          if (element) {
                            const offset = 80;
                            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                            window.scrollTo({
                              top: elementPosition - offset,
                              behavior: 'smooth'
                            });
                            
                            window.dispatchEvent(new CustomEvent('highlightSection', { detail: id }));
                          }
                        }, 200);
                      }
                    }}
                    className="flex-1 text-center py-3 px-4 bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-black font-bold rounded-xl transition-all duration-200"
                  >
                    Live Demo
                  </a>
                  <a href={github} className="flex-1 text-center py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors">
                    GitHub Code
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
