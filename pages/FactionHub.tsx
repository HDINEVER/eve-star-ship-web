import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FACTIONS } from '../data';
import { GlassCard, SectionHeader } from '../components/SciFiUI';
import { Book, Image as ImageIcon, Video, ArrowRight } from 'lucide-react';

export const FactionHub: React.FC = () => {
  const { factionId } = useParams<{ factionId: string }>();
  const faction = factionId ? FACTIONS[factionId] : null;

  if (!faction) {
    return <Navigate to="/" />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader title={faction.name} color={faction.color} />

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Main Visual */}
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
        >
            <div className="relative group overflow-hidden rounded-lg border-2" style={{ borderColor: faction.color }}>
                <img src={faction.bgImage} alt={faction.name} className="w-full h-auto object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-orbitron uppercase tracking-widest" style={{ color: faction.color }}>{faction.shortName} Territory</h3>
                </div>
            </div>
            
            <motion.div 
                className="mt-6 p-4 border-l-4 bg-white/5"
                style={{ borderColor: faction.color }}
            >
                <p className="font-rajdhani text-lg text-gray-300 italic">"{faction.tagline}"</p>
            </motion.div>
        </motion.div>

        {/* Navigation Grid */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            <Link to={`/${faction.id}/info`}>
                <GlassCard borderColor={faction.color} className="h-40 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer group">
                    <Book size={32} style={{ color: faction.color }} />
                    <div>
                        <h3 className="text-xl font-orbitron mb-1 group-hover:translate-x-2 transition-transform">Lore Database</h3>
                        <p className="text-xs text-gray-500 font-rajdhani uppercase">Access history and cultural data</p>
                    </div>
                    <ArrowRight className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" size={20} style={{ color: faction.color }} />
                </GlassCard>
            </Link>

            <Link to={`/${faction.id}/ships`}>
                <GlassCard borderColor={faction.color} className="h-40 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer group">
                    <ImageIcon size={32} style={{ color: faction.color }} />
                    <div>
                        <h3 className="text-xl font-orbitron mb-1 group-hover:translate-x-2 transition-transform">Fleet Registry</h3>
                        <p className="text-xs text-gray-500 font-rajdhani uppercase">View ship schematics</p>
                    </div>
                    <ArrowRight className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" size={20} style={{ color: faction.color }} />
                </GlassCard>
            </Link>

            <Link to={`/${faction.id}/video`} className="md:col-span-2">
                <GlassCard borderColor={faction.color} className="h-32 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-6">
                        <Video size={32} style={{ color: faction.color }} />
                        <div>
                            <h3 className="text-xl font-orbitron mb-1 group-hover:translate-x-2 transition-transform">Propaganda Feed</h3>
                            <p className="text-xs text-gray-500 font-rajdhani uppercase">Stream recruitment materials</p>
                        </div>
                    </div>
                     <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} style={{ color: faction.color }} />
                </GlassCard>
            </Link>
        </motion.div>
      </div>
    </div>
  );
};