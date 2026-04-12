import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const SkillLinkDemo = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [copiedText, setCopiedText] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const credentials = [
    {
      role: 'Student User',
      email: 'user@gmail.com',
      password: 'user12',
      tag: 'Student Access',
      icon: <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
    {
      role: 'Retailer',
      email: 'retailer@email.com',
      password: 'test12',
      tag: 'Retailer Access',
      icon: <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    },
  ];

  useEffect(() => {
    const handleHighlight = (e) => {
      if (e.detail === 'skilllink-demo') {
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 2000);
      }
    };
    window.addEventListener('highlightSection', handleHighlight);
    return () => window.removeEventListener('highlightSection', handleHighlight);
  }, []);

  return (
    <div className={`w-full relative flex flex-col items-center justify-center py-16 px-4 md:px-8 transition-all duration-1000 ${isHighlighted ? 'bg-cyan-500/10 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)]' : ''}`}>
      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl text-center mb-16"
      >
        <p className="text-brutal-muted text-sm md:text-base leading-relaxed font-mono">
          SkillLink is an AI-powered job recommendation platform that intelligently matches student skills with relevant job opportunities using machine learning and smart filtering.
        </p>
      </motion.div>

      {/* Embedded Demo Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="w-full md:w-[75%] lg:w-[70%] max-w-4xl mx-auto relative group mt-4 mb-20 p-2 md:p-4 rounded-[24px] bg-white/[0.02] border border-white/5"
      >
        <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 rounded-[26px] blur-md opacity-30 group-hover:opacity-80 transition duration-700 pointer-events-none group-hover:scale-[1.015]"></div>
        
        {/* Proportional Scale Box */}
        <div className="relative w-full h-[350px] md:h-auto md:aspect-[16/10] bg-[#050505] border border-white/10 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center transition-all duration-500 ease-out group-hover:scale-[1.015] group-hover:border-cyan-500/20 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] z-10">
          
          {/* Skeleton loader while iframe is hidden/loading */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
               <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
               <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">Loading Preview...</span>
            </div>
          )}

          <iframe
            src="https://skilink-sl.vercel.app/"
            title="SkillLink Live Demo"
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
            className={`absolute top-0 left-0 w-full h-full border-none z-10 transition-opacity duration-700 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </motion.div>

      {/* Demo Access Credentials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full md:w-[85%] lg:w-[80%] max-w-5xl mx-auto flex flex-col items-center mt-[-30px] mb-12 px-2 z-20 relative"
      >
        <h3 className="text-base md:text-lg font-medium text-white/90 mb-5 font-mono tracking-wider">Try the Demo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {credentials.map((cred, idx) => (
            <div key={idx} className="bg-[#0f0f0f] border border-white/5 rounded-[16px] p-5 flex flex-col items-start hover:bg-[#141414] hover:border-white/10 transition-colors relative group shadow-lg">
              <div className="flex items-center gap-2 mb-5 w-full justify-between">
                <div className="flex items-center gap-2">
                  {cred.icon}
                  <span className="text-[13px] font-semibold text-white/90 tracking-wide">{cred.role}</span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full whitespace-nowrap">{cred.tag}</span>
              </div>
              
              <div className="flex flex-col gap-3 w-full border-t border-white/5 pt-4">
                {/* Email */}
                <div className="flex items-center justify-between w-full group/item">
                  <div className="flex flex-col overflow-hidden mr-2">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Email</span>
                    <span className="text-xs font-mono text-gray-300 truncate">{cred.email}</span>
                  </div>
                  <button onClick={() => handleCopy(cred.email)} className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10 group/btn flex-shrink-0 relative">
                    {copiedText === cred.email ? (
                      <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    )}
                    {/* Tooltip */}
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#222] text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-lg">
                      {copiedText === cred.email ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
                
                {/* Password */}
                <div className="flex items-center justify-between w-full group/item">
                  <div className="flex flex-col overflow-hidden mr-2">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Password</span>
                    <span className="text-xs font-mono text-gray-300 truncate">{cred.password}</span>
                  </div>
                  <button onClick={() => handleCopy(cred.password)} className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10 group/btn flex-shrink-0 relative">
                    {copiedText === cred.password ? (
                      <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    )}
                    {/* Tooltip */}
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#222] text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-lg">
                      {copiedText === cred.password ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Admin Portal Access */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full mt-6 bg-[#080808] border border-white/5 hover:border-white/10 transition-colors rounded-[16px] p-6 shadow-lg relative group"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <h4 className="text-base md:text-lg font-bold text-white tracking-wide">Admin Portal Access</h4>
              </div>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Demo credentials for testing purposes only</p>
            </div>
            
            <a 
              href="https://skilink-sl.vercel.app/admin-portal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 hover:border-cyan-400/50 transition-all rounded-full text-xs font-mono tracking-widest uppercase flex items-center gap-2 group/btn shrink-0"
            >
              Open Admin Dashboard
              <svg className="w-3.5 h-3.5 transform transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Email */}
            <div className="flex items-center justify-between w-full md:w-1/2 group/item bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div className="flex flex-col overflow-hidden mr-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Admin Email</span>
                <span className="text-sm font-mono text-gray-300 truncate">admin123@skillink.com</span>
              </div>
              <button onClick={() => handleCopy('admin123@skillink.com')} className="text-gray-500 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10 group/btn flex-shrink-0 relative">
                {copiedText === 'admin123@skillink.com' ? (
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#222] text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-lg">
                  {copiedText === 'admin123@skillink.com' ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>
            
            {/* Password */}
            <div className="flex items-center justify-between w-full md:w-1/2 group/item bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div className="flex flex-col overflow-hidden mr-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Admin Password</span>
                <span className="text-sm font-mono text-gray-300 truncate">admin123</span>
              </div>
              <button onClick={() => handleCopy('admin123')} className="text-gray-500 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10 group/btn flex-shrink-0 relative">
                {copiedText === 'admin123' ? (
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#222] text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-lg">
                  {copiedText === 'admin123' ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3 mt-8"
      >
        {['FastAPI', 'React', 'MongoDB', 'Machine Learning (NLP)'].map((tech, idx) => (
          <span 
            key={idx} 
            className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-brutal-text bg-white/5 border border-white/10 rounded-full select-none"
          >
            {tech}
          </span>
        ))}
      </motion.div>

      {/* Fallback Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12"
      >
        <a 
          href="https://skilink-sl.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative inline-flex font-mono items-center justify-center px-8 py-3 text-sm font-medium text-white transition-all duration-300 bg-transparent border border-white/20 rounded-full hover:scale-105 hover:bg-white/5 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest">
            Open Full Demo
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </a>
      </motion.div>

    </div>
  );
};
