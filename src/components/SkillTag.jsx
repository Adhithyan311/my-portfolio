import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const SkillTag = ({ name, tooltip }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
      }}
      className="relative inline-block m-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-4 py-2 border border-brutal-border bg-brutal-card font-mono text-sm cursor-help hover:bg-brutal-fg hover:text-brutal-bg transition-colors duration-200">
        {name}
      </div>
      
      {/* Tooltip */}
      {isHovered && tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 2 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs p-2 bg-brutal-fg text-brutal-bg text-xs font-sans z-10 pointer-events-none text-center leading-tight shadow-lg"
        >
          {tooltip}
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-brutal-fg" />
        </motion.div>
      )}
    </motion.div>
  );
};
