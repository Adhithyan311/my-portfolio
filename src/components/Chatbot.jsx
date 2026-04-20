import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getBotResponse = (input) => {
  const text = input.toLowerCase();
  
  // 1. Identify Intent using Regex mapping
  const isWhyHire = text.match(/(why.+hire|different|stand out|value|recruit|unique)/);
  const isStrength = text.match(/(strength|good at|best at|expert|strongest)/);
  const isGoals = text.match(/(future|goal|plan|roadmap|vision|5 years)/);
  const isProject = text.match(/(project|built|work|portfolio|resume|skilllink)/);
  const isSkills = text.match(/(skill|tech|framework|stack|use|tool)/);
  const isLeadership = text.match(/(lead|ncc|cqms|responsibilit|manage|team)/);
  const isEducation = text.match(/(education|study|college|degree|school|university)/);
  const isGreeting = text.match(/(hi|hello|hey|greet|who are you)/);
  const isContact = text.match(/(contact|email|phone|reach)/);
  
  // 2. Confident, direct responses based on core intents
  if (isWhyHire) {
    return "What makes me different is my ability to bridge experimental Artificial Intelligence with production-ready software engineering. I don't just call LLM APIs—I build scalable model logic into native architectures, ensuring top-tier performance for real-world problems.";
  }
  if (isStrength) {
    return "My core strength is solving complex logic problems and architecting intelligent systems from the ground up. Whether it's training NLP models for an AI Resume Builder or orchestrating Docker ecosystems for a Python backend, I focus heavily on scalability and outcome-driven engineering.";
  }
  if (isGoals) {
    return "My immediate goal is to join an ambitious engineering team where I can architect robust backend services and deliver scalable web products. Ultimately, I want to build systems that directly improve user experiences on a massive scale.";
  }
  if (isProject) {
    return "I've developed highly sophisticated platforms like the **AI Resume Builder**, leveraging automated analysis pipelines for real-time feedback. I also architected **SkillLink**, an intricate job recommendation engine powered by Python and robust database modeling. Both focus heavily on practical user value.";
  }
  if (isSkills) {
    return "I specialize in fusing AI with full-stack systems. My core stack relies on **Python, FastAPI, and NLP frameworks like spaCy/BERT** on the backend, and **React** for the frontend, all containerized and scaled with **Docker**.";
  }
  if (isLeadership) {
    return "Beyond coding, I serve as the **Company Quarter Master Sergeant (CQMS)** for the National Cadet Corps (NCC). This rigorous role forged my discipline, resource management, and ability to lead and coordinate teams efficiently under pressure.";
  }
  if (isEducation) {
    return "I'm pursuing my B.Tech in Computer Science at NSS College of Engineering (Class of 2027). Before this, I built a strong analytical and hardware foundation through a Diploma in Mechanical Engineering.";
  }
  if (isContact) {
    return "You can reach him at adhithyanps90@gmail.com, or drop a message on his LinkedIn profile!";
  }
  if (isGreeting) {
    return "Hello! I am Adhithyan's AI assistant. I'm trained on his portfolio, projects, and thinking workflows. How can I help you today?";
  }
  
  // 3. Intelligent Fallback Inference
  const knownTech = ["react", "python", "fastapi", "docker", "api", "backend", "database", "mongodb", "architecture", "javascript"];
  const mentionedTech = knownTech.find(tech => text.includes(tech));
  
  if (mentionedTech) {
    return `You mentioned ${mentionedTech}. I have deep, hands-on experience integrating ${mentionedTech} into production environments. For example, my work on SkillLink and the AI Resume Builder extensively relies on these concepts to ensure fast, reliable performance.`;
  }
  
  return "That's an interesting question. While my core focus has been heavily concentrated on architecting AI systems and scalable web platforms (like SkillLink), I apply a very logical, fast-learning engineering mindset to any technical challenge. I'd love to discuss this directly with you—feel free to reach out via email!";
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi, I’m Adhithyan’s AI assistant. I can help you explore his work and experience.' }
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
    }, 200 + Math.random() * 300); // Faster processing delay (0.2s - 0.5s)
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const suggestions = [
    "Why should we hire you?",
    "What makes you different?",
    "Explain your strengths",
    "What are your future goals?"
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
