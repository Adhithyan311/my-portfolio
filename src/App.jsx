import React, { useEffect, useState } from 'react';
import { BackgroundOverlay } from './components/BackgroundOverlay';
import { TerminalHero } from './components/TerminalHero';
import { MagneticButton } from './components/MagneticButton';
import { ProjectCard } from './components/ProjectCard';
import { SkillTag } from './components/SkillTag';
import { Section } from './components/Section';
import { CinematicIntro } from './components/CinematicIntro';
import { InteractiveResume } from './components/InteractiveResume';
import { TerminalEasterEgg } from './components/TerminalEasterEgg';
import { ClosingStatement } from './components/ClosingStatement';
import { WhatICanDo } from './components/WhatICanDo';
import { CTASection } from './components/CTASection';
import { Chatbot } from './components/Chatbot';
import { SkillLinkDemo } from './components/SkillLinkDemo';
import { motion, AnimatePresence } from 'framer-motion';

const SKILLS = [
  { name: 'Scikit-learn', tooltip: 'AI/ML' },
  { name: 'NLP', tooltip: 'AI/ML' },
  { name: 'BERT', tooltip: 'AI/ML' },
  { name: 'spaCy', tooltip: 'AI/ML' },
  { name: 'Python', tooltip: 'Backend' },
  { name: 'FastAPI', tooltip: 'Backend' },
  { name: 'React', tooltip: 'Frontend' },
  { name: 'Tailwind CSS', tooltip: 'Frontend' },
  { name: 'Docker', tooltip: 'Tools' },
  { name: 'AWS', tooltip: 'Tools' },
  { name: 'MongoDB', tooltip: 'Tools' },
];

const PROJECTS = [
  {
    id: 'ai-resume-checker',
    title: 'AI Resume Checker',
    subtitle: 'NLP-Powered Evaluation Engine',
    description: 'Developed an AI-powered platform for resume parsing, scoring, and candidate shortlisting. Integrated BERT and spaCy for NLP-based entity extraction and semantic analysis.',
    keyFeatures: ['NLP Entity Extraction (spaCy/BERT)', 'Automated Candidate Ranking & Scoring', 'Dockerized Architecture deployment on AWS', 'RESTful FastAPI Integration'],
    tech: ['React', 'Python', 'FastAPI', 'BERT', 'spaCy', 'Docker', 'AWS'],
    link: '#',
    github: '#'
  },
  {
    id: 'skilllink-platform',
    title: 'SkillLink',
    subtitle: 'AI Job Recommendation',
    description: 'Built an AI-based job recommendation system using scikit-learn. Developed full-stack application using React, FastAPI, and MongoDB.',
    keyFeatures: ['Advanced Recommendation Matrix', 'Modular Platform Architecture', 'Secure JWT Authentication', 'Robust MongoDB Data Modeling'],
    tech: ['React', 'FastAPI', 'MongoDB', 'Scikit-learn', 'Tailwind CSS'],
    link: '#skilllink-demo',
    github: '#'
  }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [terminalMode, setTerminalMode] = useState(false);
  const [systemLog, setSystemLog] = useState("LOG: System initialized. Loading core protocols...");
  const [uptime, setUptime] = useState("0:00");

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime) / 1000);
      const m = Math.floor(diff / 60);
      const s = diff % 60;
      setUptime(`${m}:${s.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Listen for Ctrl+Shift+L
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setTerminalMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll logic for navigation
  useEffect(() => {
    const handleNavClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <CinematicIntro key="cinematic-loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div 
            key="main-app-container"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }} 
            className="relative min-h-screen"
          >
            <BackgroundOverlay />
      
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference flex justify-between items-center text-white pointer-events-none">
        <div className="font-bold text-xl tracking-tighter uppercase pointer-events-auto">
          ADHI_OS
        </div>
        <nav className="flex gap-6 pointer-events-auto">
          {['About', 'Projects', 'Skills'].map((item) => (
            <MagneticButton key={item} href={`#${item.toLowerCase()}`} className="text-sm uppercase tracking-widest hover:text-brutal-muted transition-colors">
              {item}
            </MagneticButton>
          ))}
          <MagneticButton href="/resume.pdf" target="_blank" className="text-sm uppercase tracking-widest hover:text-brutal-muted transition-colors text-cyan-400 font-bold">
            Resume
          </MagneticButton>
          <MagneticButton href="https://github.com" className="ml-4 w-10 h-10 border border-white/20 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-colors">
            {/* Github Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </MagneticButton>
        </nav>
      </header>

      {/* Main Content Areas */}
      <main className="pt-32 pb-24">
        
        <Section id="about" className="min-h-[80vh] flex flex-col justify-center">
          <TerminalHero />
        </Section>

        <Section id="projects" title="SYS.PROJECTS">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 mt-12 group/grid">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="skilllink-demo" title="SkillLink – Live Demo">
          <SkillLinkDemo />
        </Section>

        <Section id="skills" title="SYS.CAPABILITIES">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="flex flex-wrap gap-4 mt-8 max-w-4xl"
          >
            {SKILLS.map(skill => (
              <SkillTag key={skill.name} name={skill.name} tooltip={skill.tooltip} />
            ))}
          </motion.div>
        </Section>

        <Section id="what-i-can-do" title="SYS.WHAT_I_CAN_DO" className="min-h-[40vh] flex flex-col justify-center">
          <WhatICanDo />
        </Section>

        <Section id="resume" title="SYS.RESUME">
          <InteractiveResume setSystemLog={setSystemLog} />
        </Section>

        {/* Recruiter Closing Statement */}
        <ClosingStatement />

        {/* Actionable CTA */}
        <CTASection />

      </main>
      
      <footer className="py-8 border-t border-brutal-border text-center font-mono text-xs text-brutal-muted z-10 relative">
        <p>SYSTEM REBOOT REQUIRED. END OF FILE.</p>
        <p className="mt-2">© {new Date().getFullYear()} ADHITHYAN PS</p>
      </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg Terminal Overlay */}
      <AnimatePresence>
        {terminalMode && <TerminalEasterEgg onClose={() => setTerminalMode(false)} />}
      </AnimatePresence>

      {/* Premium AI Conversational Chatbot Assistant Layer */}
      <Chatbot />

      {/* Global Status Footer Left/Right Data Overlays */}
      <div className="fixed bottom-6 left-6 text-[10px] font-mono text-gray-400/50 pointer-events-none z-[100] uppercase tracking-widest mix-blend-screen bg-black/20 p-1 rounded backdrop-blur-sm">
        {systemLog}
      </div>
      <div className="fixed bottom-6 right-6 text-[10px] font-mono text-cyan-400/50 pointer-events-none z-[100] uppercase tracking-widest mix-blend-screen bg-black/20 p-1 rounded backdrop-blur-sm">
        STATUS: ONLINE | LOAD: {(0.01 + Math.random() * 0.1).toFixed(2)}ms | UPTIME: {uptime}
      </div>

    </>
  );
}

export default App;
