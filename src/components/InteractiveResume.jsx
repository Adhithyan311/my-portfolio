import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const eduDetails = {
  btech: {
    title: 'B.Tech Computer Science',
    coursework: ['Data Structures', 'Backend Architecture', 'Cloud Computing', 'Database Systems', 'Software Engineering'],
    labs: ['AI Lab - Neural Networks', 'Full-Stack Web Dev Lab']
  }
};

const certDetails = {
  agentic: {
    title: 'Agentic AI – IBM SkillsBuild',
    image: '/ibm-cert.png' 
  },
  python: {
    title: 'NPTEL: Joy of Computing Using Python',
    image: '/nptel-cert.png' 
  }
};

const DocIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const cgpaData = [
  { term: 'S1', val: 8.1 }, { term: 'S2', val: 7.8 }, { term: 'S3', val: 7.9 }, { term: 'S4', val: 8.0 }, { term: 'S5', val: 7.7 }
];

const MagneticTag = ({ children, onHoverStart, onHoverEnd }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.15;
    const y = (clientY - (top + height / 2)) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    onHoverEnd?.();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHoverStart}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block relative cursor-pointer"
    >
      <motion.span 
        animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="block px-3 py-1.5 font-mono text-xs border border-brutal-border text-brutal-muted transition-colors hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

export const InteractiveResume = ({ setSystemLog }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [hoveredInterest, setHoveredInterest] = useState(null);
  const [showCgpaTooltip, setShowCgpaTooltip] = useState(false);

  const containerVars = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };
  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const handleModalOpen = (type, data) => {
    setActiveModal({ type, data });
    setSystemLog(`LOG: Overlay active - Viewing ${data.title}`);
  };

  return (
    <div className="relative">
      <motion.div 
        variants={containerVars} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        onViewportEnter={() => setSystemLog("LOG: SYS.RESUME module fully loaded.")}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8"
      >
        {/* Education Column */}
        <motion.div variants={itemVars}>
          <h3 className="text-2xl font-bold font-sans mb-6">Education</h3>
          <div className="space-y-8">
            <motion.div 
              variants={itemVars}
              className="group cursor-pointer relative pl-4 border-l-[3px] border-transparent hover:border-cyan-400 transition-all duration-300"
              onClick={() => handleModalOpen('edu', eduDetails.btech)}
              onMouseEnter={() => setSystemLog("LOG: Scanning B.Tech credentials...")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -left-4 rounded-r-lg pointer-events-none" />
              <h4 className="font-bold text-lg text-brutal-fg group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">B.Tech Computer Science</h4>
              <p className="text-white/60 text-sm font-mono mt-1 transition-opacity">NSS College of Engineering</p>
              
              <div className="flex items-center gap-2 mt-3">
                <span className="text-white/50 text-xs font-mono">CGPA: 7.9</span>
                <div 
                  className="relative flex items-center justify-center w-4 h-4 rounded bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-[10px] text-white/50 cursor-help transition-colors"
                  onMouseEnter={(e) => { e.stopPropagation(); setShowCgpaTooltip(true); }}
                  onMouseLeave={(e) => { e.stopPropagation(); setShowCgpaTooltip(false); }}
                >
                  i
                  <AnimatePresence>
                    {showCgpaTooltip && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-3 bg-[#0a0c10]/95 backdrop-blur-md border border-cyan-500/30 rounded-lg shadow-xl z-50 cursor-default"
                      >
                        <p className="text-[10px] font-mono tracking-widest text-cyan-400 mb-2 border-b border-cyan-500/20 pb-1">PROGRESSION</p>
                        <div className="flex justify-between items-end h-10 gap-1 mt-3">
                          {cgpaData.map(d => (
                            <div key={d.term} className="group/bar relative flex flex-col justify-end w-full h-full">
                              <div className="w-full bg-cyan-900/40 hover:bg-cyan-400 transition-colors rounded-sm" style={{ height: `${(d.val / 10) * 100}%` }} />
                              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-white/40">{d.val}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-white/30 text-xs font-mono tracking-widest">| EXPECTED 2027</span>
              </div>
            </motion.div>

            <motion.div variants={itemVars} className="group relative pl-4 border-l-[3px] border-transparent hover:border-white/30 transition-all duration-300">
              <h4 className="font-bold text-lg text-brutal-fg group-hover:text-white transition-colors">Diploma in Mechanical Engineering</h4>
              <p className="text-white/60 text-xs font-mono mt-1">NSS Polytechnic College</p>
              <div className="mt-2 text-white/40 text-xs font-mono tracking-widest">CGPA: 7.81 | 2024</div>
            </motion.div>

            <motion.div variants={itemVars} className="group relative pl-4 border-l-[3px] border-transparent hover:border-white/30 transition-all duration-300">
              <h4 className="font-bold text-lg text-brutal-fg group-hover:text-white transition-colors">Class 10</h4>
              <div className="mt-2 text-white/40 text-xs font-mono tracking-widest">100% | 2021</div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Certifications and Interests */}
        <motion.div variants={itemVars} className="relative mt-8 md:mt-0">
          <div className="mb-14">
            <h3 className="text-2xl font-bold font-sans mb-6">Certifications</h3>
            <ul className="space-y-4 relative z-10">
              <motion.li 
                variants={itemVars}
                className={`relative flex items-center cursor-pointer group py-3 rounded-lg transition-all duration-300 hover:bg-white/5 pl-3 -ml-3 ${hoveredInterest === 'AI' ? 'bg-cyan-500/10' : ''}`}
                onClick={() => handleModalOpen('cert', certDetails.agentic)}
                onMouseEnter={() => setSystemLog("LOG: Verification queried for IBM Agentic AI")}
              >
                <div className={`absolute left-[2px] top-2 bottom-2 w-[2px] opacity-0 transition-all duration-300 transform scale-y-50 group-hover:scale-y-100 ${hoveredInterest === 'AI' ? 'bg-cyan-400 opacity-100 scale-y-100' : 'bg-cyan-400 group-hover:opacity-100'}`} />
                <span className={`transition-colors mr-3 ${hoveredInterest === 'AI' ? 'text-cyan-400' : 'text-brutal-border group-hover:text-cyan-400'}`}><DocIcon /></span>
                <span className="relative text-sm font-medium text-brutal-muted group-hover:text-white transition-colors">
                  Agentic AI – IBM SkillsBuild
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] tracking-widest text-cyan-400 font-mono bg-cyan-400/10 px-2 py-1 rounded">
                  VIEW
                </span>
              </motion.li>
              
              <motion.li 
                variants={itemVars}
                className="relative flex items-center cursor-pointer group py-3 rounded-lg transition-all duration-300 hover:bg-white/5 pl-3 -ml-3 mt-1"
                onClick={() => handleModalOpen('cert', certDetails.python)}
              >
                <div className="absolute left-[2px] top-2 bottom-2 w-[2px] bg-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-y-50 group-hover:scale-y-100" />
                <span className="text-brutal-border group-hover:text-cyan-400 transition-colors mr-3"><DocIcon /></span>
                <span className="relative text-sm font-medium text-brutal-muted group-hover:text-white transition-colors">
                  NPTEL: Joy of Computing Using Python
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] tracking-widest text-cyan-400 font-mono bg-cyan-400/10 px-2 py-1 rounded">
                  VIEW
                </span>
              </motion.li>
            </ul>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold font-sans mb-6">Areas of Interest</h3>
            <motion.div variants={itemVars} className="flex flex-wrap gap-3">
              <MagneticTag 
                onHoverStart={() => setSystemLog("LOG: Primary Focus -> Software Development Engineer (SDE)")}
              >
                Software Development Engineer (SDE)
              </MagneticTag>
              <MagneticTag 
                onHoverStart={() => {
                  setHoveredInterest('AI');
                  setSystemLog("LOG: Linking node [Artificial Intelligence] -> [Agentic AI]");
                }} 
                onHoverEnd={() => setHoveredInterest(null)}
              >
                Artificial Intelligence
              </MagneticTag>
              <MagneticTag>Cybersecurity</MagneticTag>
              <MagneticTag>Data Analytics</MagneticTag>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Glass Context Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={`relative w-full ${activeModal.type === 'cert' ? 'max-w-4xl' : 'max-w-lg'} bg-[#0a0c10]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col gap-6`}
            >
              <button 
                onClick={() => setActiveModal(null)} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
              
              {activeModal.type === 'edu' && (
                <>
                  <div>
                    <div className="text-[10px] text-cyan-500 font-mono tracking-widest mb-2">ACADEMIC_RECORD</div>
                    <h3 className="text-2xl font-bold text-white">{activeModal.data.title}</h3>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-mono tracking-widest mb-3">MAJOR COURSEWORK</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeModal.data.coursework.map(c => <span key={c} className="bg-white/5 border border-white/10 px-2 py-1 text-[11px] font-mono rounded text-cyan-100/70">{c}</span>)}
                    </div>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-xs text-gray-400 font-mono tracking-widest mb-3">RELEVANT LABS</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      {activeModal.data.labs.map(l => <li key={l} className="flex"><span className="text-cyan-500 mr-2">›</span>{l}</li>)}
                    </ul>
                  </div>
                </>
              )}

              {activeModal.type === 'cert' && (
                <div className="flex flex-col items-center w-full">
                  <div className="w-full mb-6 text-center">
                    <div className="text-[10px] text-emerald-500 font-mono tracking-widest mb-1">VERIFIED_CREDENTIAL</div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{activeModal.data.title}</h3>
                  </div>
                  <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center min-h-[300px]">
                    <div className="absolute inset-0 animate-pulse bg-white/5 z-0" />
                    <img 
                      src={activeModal.data.image} 
                      alt={activeModal.data.title} 
                      loading="lazy"
                      className="w-full h-auto max-h-[60vh] object-contain relative z-10"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden absolute text-gray-500 font-mono text-xs z-10 text-center px-4 leading-relaxed">
                      [IMAGE NOT FOUND]<br/><br/>Please place your verified certificate image into the<br/><span className="text-cyan-400">/public/</span> directory as <span className="text-cyan-400 font-bold">{activeModal.data.image.split('/')[1]}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
