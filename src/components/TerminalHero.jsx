import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const terminalLines = [
  "> Initializing AI Systems...",
  "> Booting Backend Architectures...",
  "> Optimizing Neural Pipelines...",
  "> Welcome, I’m Adhithyan PS"
];

export const TerminalHero = () => {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' -> 'readable'
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Preload profile image for instant display
  useEffect(() => {
    const img = new Image();
    img.fetchPriority = 'high';
    img.src = '/profile.png';
  }, []);

  useEffect(() => {
    if (phase !== 'typing') return;

    if (currentLineIndex < terminalLines.length) {
      const currentLine = terminalLines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          // Process 1 character at a time, synced closer to natural frame budget to avoid stutter
          setCurrentCharIndex(prev => prev + 1);
        }, 24); 
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setLines(prev => [...prev, currentLine]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 150); // Smooth transition to next line
        return () => clearTimeout(timeout);
      }
    } else {
      // Start exit transition instantly after intro finishes
      const timeout = setTimeout(() => setPhase('readable'), 100); 
      return () => clearTimeout(timeout);
    }
  }, [phase, currentLineIndex, currentCharIndex]);

  return (
    <div className="min-h-[45vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {phase === 'typing' ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className="font-mono text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)] text-sm md:text-base flex flex-col gap-1"
          >
            {lines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
            {currentLineIndex < terminalLines.length && (
              <div>
                {terminalLines[currentLineIndex].slice(0, currentCharIndex)}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block w-2.5 h-4 bg-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] ml-1 align-middle"
                />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="readable"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-5xl overflow-hidden"
          >
            {/* Avatar Profile Section - Slide from Left */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative shrink-0 group mt-2 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
              title="View full image"
            >
              <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 pointer-events-none"></div>
              <img 
                src="/profile.png" 
                alt="Adhithyan PS" 
                width="176"
                height="176"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-white/5 shadow-2xl filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 relative z-10 hover:border-cyan-500/30"
              />
            </motion.div>

            {/* Text Section - Slide from Right */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 text-brutal-fg">
                ADHITHYAN.<span className="text-brutal-muted italic font-mono text-[var(--color-brutal-fg)]">PS</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6 text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.4)]">
                Software Development Engineer (SDE) | Backend Development | Full-Stack | Problem Solving
              </h2>
              <p className="text-xl md:text-xl text-brutal-muted leading-relaxed font-sans max-w-2xl mb-4 font-bold">
                Building robust backend architectures and scalable web technologies to solve complex real-world problems.
              </p>
              <p className="text-base text-brutal-muted leading-relaxed font-sans max-w-2xl mb-8">
                Final-year B.Tech Computer Science student with a multidisciplinary foundation in Mechanical Engineering and strong expertise in full-stack development. Skilled in building robust web applications using Python (FastAPI), React, and modern databases. Experienced in developing end-to-end solutions including recruitment automation platforms and scalable recommendation systems, with a strong focus on backend architecture, API design, and Docker-based deployment.
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a 
                  href="/resume.pdf" 
                  download="Adhithyan_Software_Engineer_Resume.pdf"
                  className="px-6 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg font-bold font-mono text-sm tracking-wide transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  DOWNLOAD RESUME
                </a>
                
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-brutal-fg border border-white/20 rounded-lg font-bold font-mono text-sm tracking-wide transition-all hover:scale-105 flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  VIEW RESUME
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Profile Photo Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-pointer"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src="/profile.png"
              alt="Adhithyan PS"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10 cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
