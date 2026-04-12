import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CinematicIntro = ({ onComplete }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // 1.2s text animation + 0.8s pause = 2.0s timing
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-[150] flex flex-col justify-center items-center overflow-hidden bg-black"
      style={{
        background: 'radial-gradient(circle at center, #050505 0%, #000000 80%)'
      }}
    >
      {/* Highly optimized static noise map (3-5% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      {/* Cinematic Spotlight System - Pure CSS */}
      <motion.div
        animate={{ opacity: [0.65, 0.95, 0.65], y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none flex flex-col items-center origin-top z-0"
      >
        <div 
          className="relative w-full h-full flex flex-col items-center top-0 transition-transform duration-75"
          style={{ transform: `translate(${mousePos.x * 2.5}px, ${mousePos.y * 2.5}px)` }}
        >
          {/* Soft Cone Beam Effect (Pure gradient) */}
          <div 
            className="absolute top-[-10%] w-[150%] md:w-[80%] h-[120%]"
            style={{ background: 'radial-gradient(ellipse at top center, rgba(230, 230, 240, 0.1) 0%, rgba(200, 200, 220, 0.015) 50%, transparent 65%)' }}
          />

          {/* 1. Core Light (Bright Center) */}
          <div 
            className="absolute top-[-5%] w-[40%] h-[30%]" 
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, transparent 60%)' }}
          />
          
          {/* 2. Outer Fade (Soft diffusion) */}
          <div 
            className="absolute top-[-5%] w-[70%] h-[50%]" 
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)' }}
          />
        </div>
      </motion.div>

      {/* Cinematic Text Reveal Block */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 flex flex-col items-center justify-center pointer-events-auto text-center px-6"
      >
        <motion.div
          animate={{ opacity: [0.95, 1, 0.95] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          {/* Letter Spacing Expanding Animation */}
          <motion.h1 
            initial={{ letterSpacing: "0.05em" }}
            animate={{ letterSpacing: "0.18em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl md:text-[5.5rem] font-sans mb-3 text-[#e5e5e5] font-bold"
          >
            ADHITHYAN PS
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-xl font-sans tracking-[0.4em] text-[#e5e5e5] font-light uppercase mb-4"
          >
            Crafting Intelligent Systems
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs md:text-sm font-mono tracking-widest text-[#e5e5e5] uppercase"
          >
            Open to opportunities <span className="opacity-40 mx-2">•</span> Building scalable AI solutions
          </motion.p>
        </motion.div>
      </motion.div>

    </motion.div>
  );
};
