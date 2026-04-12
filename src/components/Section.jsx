import React from 'react';
import { motion } from 'framer-motion';

export const Section = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`py-24 max-w-6xl mx-auto px-6 ${className}`}>
      {title && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="mb-12 border-b-2 border-brutal-border pb-4"
        >
          <h2 className="text-4xl font-bold font-sans">{title}</h2>
        </motion.div>
      )}
      {children}
    </section>
  );
};
