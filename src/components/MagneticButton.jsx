import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const MagneticButton = ({ children, className = '', onClick, href, target, download }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.05, filter: "drop-shadow(0px 8px 16px rgba(34,211,238,0.25))" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center font-mono focus:outline-none ${className}`}
      onClick={onClick}
      href={href}
      target={target || (href?.startsWith('http') ? '_blank' : undefined)}
      rel={target === '_blank' || href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      download={download}
    >
      {children}
    </Component>
  );
};
