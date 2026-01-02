import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  delay?: number;
}

export const GlassCard: React.FC<CardProps> = ({ children, className = '', borderColor = '#44ffdd', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, type: 'spring' }}
      className={`relative group bg-ui-glass backdrop-blur-md border border-ui-border p-6 overflow-hidden ${className}`}
      style={{
        clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
      }}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor }} />
      
      {/* Scanline Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

      {children}
    </motion.div>
  );
};

export const SectionHeader: React.FC<{ title: string; color: string }> = ({ title, color }) => (
    <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: "100%" }} 
        className="mb-8 border-b border-gray-800 pb-2 relative"
    >
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold uppercase tracking-widest relative z-10" style={{ color, textShadow: `0 0 20px ${color}` }}>
            {title}
        </h2>
        <div className="absolute bottom-[-2px] left-0 h-[2px] w-32" style={{ backgroundColor: color }} />
        <div className="absolute -bottom-1 right-0 text-xs text-gray-600 font-orbitron">SEC.LEVEL 0.0</div>
    </motion.div>
);
