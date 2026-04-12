import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const terminalLines = [
  "> Initializing AI Systems...",
  "> Loading Machine Learning Models...",
  "> Optimizing Neural Pipelines...",
  "> Welcome, I’m Adhithyan PS"
];

export const TerminalHero = () => {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' -> 'transition' -> 'readable'

  useEffect(() => {
    if (phase !== 'typing') return;

    if (currentLineIndex < terminalLines.length) {
      const currentLine = terminalLines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1);
        }, 30); // Very fast typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setLines(prev => [...prev, currentLine]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 500); // Slight delay between computing each line
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => setPhase('transition'), 800);
      return () => clearTimeout(timeout);
    }
  }, [phase, currentLineIndex, currentCharIndex]);

  useEffect(() => {
    if (phase === 'transition') {
      const timer = setTimeout(() => {
        setPhase('readable');
      }, 500); // Smooth fade transition timer
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div className="min-h-[45vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {phase === 'typing' || phase === 'transition' ? (
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
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-5xl"
          >
            {/* Avatar Profile Section */}
            <div className="relative shrink-0 group mt-2">
              <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 pointer-events-none"></div>
              <img 
                src="/profile.png" 
                alt="Adhithyan PS" 
                className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-white/5 shadow-2xl filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 relative z-10 hover:border-cyan-500/30"
              />
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 text-brutal-fg">
                ADHITHYAN.<span className="text-brutal-muted italic font-mono text-[var(--color-brutal-fg)]">PS</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6 text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.4)]">
                AI Engineer | Machine Learning | NLP | Full-Stack
              </h2>
              <p className="text-xl md:text-xl text-brutal-muted leading-relaxed font-sans max-w-2xl mb-4 font-bold">
                Building intelligent systems that solve real-world problems using AI and scalable web technologies.
              </p>
              <p className="text-base text-brutal-muted leading-relaxed font-sans max-w-2xl">
                Final-year B.Tech Computer Science student with a multidisciplinary foundation in Mechanical Engineering and strong expertise in AI-powered full-stack development. Skilled in building intelligent systems using Python (FastAPI), React, and NLP frameworks such as BERT and spaCy. Experienced in developing end-to-end AI solutions including recruitment automation platforms and job recommendation systems, with focus on scalability, system architecture, and Docker-based deployment.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
