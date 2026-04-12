import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TerminalEasterEgg = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'INITIATING OVERRIDE SEQUENCE...' },
    { type: 'system', text: 'CONNECTION ESTABLISHED. ADHI_OS v1.0.4 ONLINE.' },
    { type: 'info', text: 'Type "help" for a list of available commands.' }
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', text: `user:~/$ ${input}` }];
      
      switch(cmd) {
        case 'help':
          newHistory.push({ type: 'info', text: 'Commands: help, show_edu, show_certs, clear, exit' });
          break;
        case 'show_edu':
          newHistory.push({ type: 'data', text: '[B.Tech Computer Science] NSS College (7.9 CGPA)' });
          newHistory.push({ type: 'data', text: '[Diploma Mech. Engineering] (7.81 CGPA)' });
          break;
        case 'show_certs':
          newHistory.push({ type: 'data', text: '> Agentic AI – IBM SkillsBuild' });
          newHistory.push({ type: 'data', text: '> NPTEL: Joy of Computing Using Python' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
          onClose();
          return;
        case '':
          break;
        default:
          newHistory.push({ type: 'error', text: `Command not found: ${cmd}` });
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] bg-black bg-opacity-90 flex items-center justify-center p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl h-[70vh] bg-[#050505] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(34,211,238,0.15)] flex flex-col overflow-hidden font-mono text-sm"
        onClick={(e) => { e.stopPropagation(); inputRef.current?.focus(); }}
      >
        <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-gray-400">
          <span>root@adhi_os: ~</span>
          <button onClick={onClose} className="hover:text-red-400">✕</button>
        </div>
        
        <div className="flex-grow p-6 overflow-y-auto custom-scrollbar flex flex-col gap-2">
          {history.map((line, idx) => (
            <div key={idx} className={`${
              line.type === 'system' ? 'text-cyan-400 font-bold' :
              line.type === 'error' ? 'text-red-400' :
              line.type === 'info' ? 'text-gray-400' :
              line.type === 'user' ? 'text-white' : 'text-emerald-400'
            }`}>
              {line.text}
            </div>
          ))}
          <div className="flex mt-2">
            <span className="text-cyan-400 mr-2">user:~/$</span>
            <input 
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-grow bg-transparent outline-none text-white shadow-none"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
