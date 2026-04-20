import React from 'react';
import { motion } from 'framer-motion';

export const CTASection = () => {
  const containerVars = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
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
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] py-32 px-4 overflow-hidden border-t border-white/5 bg-[#050505]">
      {/* Background Gradient & Minimal Noise */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(30,30,35,0.4) 0%, #050505 50%, #000000 100%)'
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
        className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full"
      >
        <motion.h2 
          variants={itemVars}
          className="text-4xl md:text-5xl font-bold font-sans text-white mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          Let’s Build Something Meaningful
        </motion.h2>

        <motion.p 
          variants={itemVars}
          className="text-gray-400 text-base md:text-lg mb-4 leading-relaxed font-light opacity-90"
        >
          I’m open to opportunities where I can apply my skills in AI, backend engineering, and full-stack development to solve real-world problems.
        </motion.p>
        
        <motion.p 
          variants={itemVars}
          className="text-gray-300 text-base md:text-lg mb-12 font-medium tracking-wide"
        >
          Let’s connect and create impact together.
        </motion.p>

        {/* Contact Information */}
        <motion.div variants={itemVars} className="flex flex-col gap-4 mb-14 text-sm md:text-base font-mono text-gray-400">
          <a href="mailto:adhithyanps90@gmail.com" className="hover:text-cyan-400 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 group">
            <span className="text-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity">EMAIL //</span> adhithyanps90@gmail.com
          </a>
          <a href="tel:+918157913983" className="hover:text-cyan-400 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 group">
            <span className="text-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity">PHONE //</span> +91 8157913983
          </a>
          <a href="https://linkedin.com/in/adhithyan-ps-a370a03b6" target="_blank" rel="noreferrer" className="hover:text-cyan-400 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 group">
            <span className="text-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity">LINKEDIN //</span> linkedin.com/in/adhithyan-ps-a370a03b6
          </a>
        </motion.div>

        {/* Button Actions */}
        <motion.div variants={itemVars} className="flex flex-wrap items-center justify-center gap-4 w-full">
          <a 
            href="mailto:adhithyanps90@gmail.com"
            className="group px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-50 font-medium hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(34,211,238,0.25)]"
          >
            Contact Me
          </a>
          
          <a 
            href="https://linkedin.com/in/adhithyan-ps-a370a03b6" 
            target="_blank" 
            rel="noreferrer"
            className="group px-8 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,255,255,0.1)]"
          >
            View LinkedIn
          </a>

          <a 
            href="#" 
            className="group px-8 py-3 rounded-full bg-transparent border border-white/5 text-gray-500 font-medium hover:bg-white/5 hover:border-white/10 hover:text-gray-300 transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,255,255,0.05)]"
          >
            Download Resume
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
};
