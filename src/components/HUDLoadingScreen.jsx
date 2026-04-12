import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const HUDLoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Determine loading process duration
    const duration = 3000; // 3 seconds
    const interval = 30; // updates every 30ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, (currentStep / steps) * 100));
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400); // 400ms lag at 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Circumference for a 116 radius circle
  const circumference = 2 * Math.PI * 116;

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] overflow-hidden font-mono text-cyan-400 select-none"
    >
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-80" />

      {/* HUD Corner Brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
      <div className="absolute top-8 right-8 w-12 h-12 md:w-16 md:h-16 border-t-2 border-r-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
      <div className="absolute bottom-8 left-8 w-12 h-12 md:w-16 md:h-16 border-b-2 border-l-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
      <div className="absolute bottom-8 right-8 w-12 h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

      {/* Center Circular UI */}
      <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
        
        {/* Outer Dashed Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute inset-0 rounded-full border-[3px] border-dashed border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
        />

        {/* Middle Smooth Arc */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="absolute inset-4 rounded-full border-[3px] border-transparent border-t-blue-400 border-r-blue-400 opacity-60 shadow-[0_0_15px_rgba(96,165,250,0.5)]"
        />

        {/* Inner Glowing Progress Ring */}
        <svg viewBox="0 0 240 240" className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] -rotate-90 overflow-visible">
          <circle
            cx="120" cy="120" r="116"
            fill="none"
            stroke="rgba(6,182,212,0.1)"
            strokeWidth="4"
          />
          <circle
            cx="120" cy="120" r="116"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            className="drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] transition-all duration-75"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span 
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-lg md:text-xl font-bold tracking-[0.3em] text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
          >
            LOADING
          </motion.span>
          <div className="w-24 h-[3px] bg-cyan-900/50 mt-2 rounded overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs mt-2 text-cyan-500/80 tracking-widest">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Left Side Panel (Data Bars) */}
      <div className="absolute left-8 md:left-16 bottom-16 w-32 hidden md:flex flex-col gap-2 opacity-70">
        <div className="text-[10px] tracking-widest text-cyan-500 mb-1">SYS.MEM.ALLOC</div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-1.5 bg-cyan-900/40 rounded overflow-hidden">
            <motion.div
              animate={{ width: ['0%', '100%', '0%'] }}
              transition={{ repeat: Infinity, duration: 1.5 + Math.random(), delay: Math.random(), ease: "easeInOut" }}
              className="h-full bg-blue-500"
            />
          </div>
        ))}
      </div>

      {/* Right Side Panel (System Info + Small Ring) */}
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 w-48 hidden md:flex flex-col items-end gap-4 opacity-70">
        <div className="text-right">
          <div className="text-[10px] tracking-widest text-cyan-500">UPLINK STATUS</div>
          <motion.div 
            animate={{ opacity: [1, 0.5, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-sm font-bold text-teal-400 drop-shadow-[0_0_4px_rgba(45,212,191,0.8)] mt-1"
          >
            ESTABLISHED
          </motion.div>
        </div>
        
        <div className="text-right mt-4">
          <div className="text-[10px] tracking-widest text-cyan-500">NEURAL NET MTX</div>
          <div className="text-[11px] text-blue-400 mt-1 font-mono">0x{Math.floor(Math.random()*16777215).toString(16).toUpperCase()}</div>
          <div className="text-[11px] text-blue-400 font-mono">0x{Math.floor(Math.random()*16777215).toString(16).toUpperCase()}</div>
        </div>

        <div className="relative w-16 h-16 mt-4 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[3px] border-dashed border-teal-500/50"
          />
          <div className="w-2 h-2 rounded-full bg-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,1)] animate-ping" />
        </div>
      </div>
    </motion.div>
  );
};
