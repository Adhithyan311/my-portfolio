import React from 'react';
import { motion } from 'framer-motion';

export const Section = ({ id, title, children, className = '' }) => {
  return (
    <motion.section 
      id={id} 
      className={`py-24 max-w-6xl mx-auto px-6 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {title && (
        <div className="mb-12 border-b-2 border-brutal-border pb-4">
          <h2 className="text-4xl font-bold font-sans">{title}</h2>
        </div>
      )}
      {children}
    </motion.section>
  );
};
