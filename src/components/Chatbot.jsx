import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getBotResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('project') || lowerInput.includes('built') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
    return "Adhithyan is the architect behind the **AI Resume Checker**, an analytical NLP platform utilizing BERT and spaCy. He additionally engineered **SkillLink**, a scalable job recommendation engine driven by scikit-learn and native Python APIs.";
  }
  if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('framework') || lowerInput.includes('stack')) {
    return "His core proficiency lies in fusing Machine Learning with modern web backends. He actively utilizes **FastAPI, Python, React, NLP patterns (spaCy/BERT)**, and orchestrates AWS & Docker ecosystems effortlessly.";
  }
  if (lowerInput.includes('hire') || lowerInput.includes('why') || lowerInput.includes('value') || lowerInput.includes('recruit')) {
    return "Adhithyan bridges the rare gap between rigid software engineering and experimental Artificial Intelligence. Rather than relying purely on external APIs, he actively researches and builds scalable model logic into native production architectures.";
  }
  if (lowerInput.includes('education') || lowerInput.includes('study') || lowerInput.includes('college') || lowerInput.includes('school')) {
    return "He is currently pursuing his B.Tech in Computer Science at NSS College of Engineering (graduating 2027). Additionally, he holds a strong analytical foundation from a prior Diploma in Mechanical Engineering!";
  }
  if (lowerInput.includes('ai') || lowerInput.includes('system') || lowerInput.includes('automation') || lowerInput.includes('machine learning')) {
    return "Adhithyan's AI implementations heavily favor Natural Language Processing. He excels at optimizing neural pipelines and deploying intelligent assessment infrastructures optimized for high-traffic scalability.";
  }
  if (lowerInput.includes('certif') || lowerInput.includes('course') || lowerInput.includes('interest')) {
    return "He holds official certifications including 'Agentic AI' through IBM SkillsBuild and extensive Python data paradigms algorithms through NPTEL.";
  }
  if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('reach')) {
    return "You can reach him instantly via email at adhithyanps90@gmail.com, or drop him a standard message on his LinkedIn profile!";
  }
  if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey') || lowerInput.includes('greet')) {
    return "Hello there! I'm ADHI_OS, Adhithyan's personal assistant. Feel free to ask me anything regarding his engineering stack or projects!";
  }
  
  return "That's a very specific question! While I don't have the exact schematics for that in my memory banks, I suggest emailing him straight at adhithyanps90@gmail.com for the answer!";
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi, I’m Adhithyan’s AI assistant. I can tell you about his projects, skills, and experience.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textOverride = null) => {
    const query = textOverride || inputVal;
    if (!query.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI networking delay
    setTimeout(() => {
      const response = getBotResponse(query);
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
      setIsTyping(false);
    }, 600 + Math.random() * 800); // 0.6s - 1.4s delay for realism
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const suggestions = [
    "Tell me about your projects",
    "What skills do you have?",
    "Why should we hire you?",
    "Explain your AI systems"
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[350px] shadow-2xl rounded-2xl bg-[#050505] border border-cyan-500/30 overflow-hidden flex flex-col z-[200]"
          >
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-white font-mono text-sm tracking-wide">ADHI_OS ASSISTANT</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 max-h-[400px] min-h-[300px] overflow-y-auto p-4 custom-scrollbar flex flex-col gap-4">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-cyan-500/20 text-white border border-cyan-500/30 rounded-br-none' 
                        : 'bg-white/5 text-gray-300 border border-white/10 rounded-bl-none'
                    }`}
                  >
                    {/* Render bold text simply for markdown mock */}
                    {msg.text.split('**').map((part, index) => 
                      index % 2 === 1 ? <span key={index} className="text-white font-bold">{part}</span> : part
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 rounded-xl rounded-bl-none px-4 py-3 flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
              
              <div ref={endOfMessagesRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 pb-2 flex flex-col gap-2">
                {suggestions.map(sug => (
                  <button 
                    key={sug}
                    onClick={() => handleSend(sug)}
                    className="text-left text-xs text-cyan-400 hover:text-white bg-cyan-500/5 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg px-3 py-2 transition-colors duration-200"
                  >
                    "{sug}"
                  </button>
                ))}
              </div>
            )}

            {/* Input block */}
            <div className="border-t border-white/10 p-3 bg-black/40 flex items-center gap-2">
              <input 
                type="text" 
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500/50 transition-colors placeholder:text-gray-600"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!inputVal.trim() || isTyping}
                className="bg-cyan-500/20 text-cyan-400 p-2 rounded-lg hover:bg-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:right-8 z-[200] w-14 h-14 bg-cyan-500/10 border border-cyan-500/40 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:bg-cyan-500/20 hover:text-white transition-colors backdrop-blur-md"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
        )}
      </motion.button>
    </>
  );
};
