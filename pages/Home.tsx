import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FACTIONS } from '../data';
import { GlassCard } from '../components/SciFiUI';

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl md:text-8xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-cyan-400 tracking-wider mb-4 animate-pulse">
          EVE
        </h1>
        <p className="text-xl text-gray-400 font-rajdhani tracking-[0.5em] uppercase border-t border-b border-gray-800 py-2 inline-block">
          Select Your Allegiance
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {Object.values(FACTIONS).map((faction, index) => (
          <Link to={`/${faction.id}`} key={faction.id}>
            <GlassCard 
              borderColor={faction.color} 
              delay={index * 0.2}
              className="h-full flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:bg-white/5 cursor-pointer"
            >
              <div className="relative w-32 h-32 mb-6 rounded-full border-2 p-1" style={{ borderColor: faction.color, boxShadow: `0 0 20px ${faction.glowColor}` }}>
                 <div className="w-full h-full rounded-full overflow-hidden bg-black">
                    <img 
                        src={faction.logo} 
                        alt={faction.name} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                    />
                 </div>
              </div>
              
              <h2 className="text-2xl font-orbitron font-bold mb-2 uppercase" style={{ color: faction.color }}>
                {faction.name}
              </h2>
              <p className="text-gray-400 font-rajdhani text-sm mb-4 border-t border-gray-700/50 pt-2 w-full">
                {faction.tagline}
              </p>
              
              <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-widest font-orbitron" style={{ color: faction.color }}>
                [ INITIATE WARP ]
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
};