import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';

export const ClosingStatement = () => {
  const containerVars = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.25, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <Section id="closing" className="relative flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden mt-12 border-t border-white/5">
      {/* Background Gradient & Minimal Noise */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30,30,35,0.5) 0%, #050505 50%, #000000 100%)'
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.03] z-[1] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />
      
      <motion.div
        variants={containerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 group"
      >
        {/* Breathing loop applied via a wrapper that continues indefinitely */}
        <motion.div
          animate={{ opacity: [0.95, 1, 0.95] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="flex flex-col items-center hover:scale-[1.01] transition-transform duration-500 cursor-default"
        >
          <motion.h3 
            variants={itemVars} 
            className="text-lg md:text-2xl font-sans tracking-[0.05em] text-[#d0d0d5] font-light mb-6 transition-colors duration-300 group-hover:text-white"
          >
            Building intelligent systems for real-world impact.
          </motion.h3>

          <motion.h3 
            variants={itemVars} 
            className="text-lg md:text-2xl font-sans tracking-[0.05em] text-[#d0d0d5] font-light mb-8 transition-colors duration-300 group-hover:text-white"
          >
            Focused on scalable, practical AI solutions.
          </motion.h3>

          <motion.div variants={itemVars} className="flex flex-col items-center mt-2">
            <h3 className="text-xl md:text-3xl font-sans tracking-[0.08em] text-[#e5e5e5] font-medium mb-4 transition-colors duration-300 group-hover:text-[white]">
              Open to contributing and growing as an AI/ML Engineer.
            </h3>
            
            {/* Underline expanding smoothly from the center outwards */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }} // Delays so it fires nicely right after the text appears
              className="w-1/2 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#e5e5e5]/40 to-transparent mt-6 origin-center"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
};
