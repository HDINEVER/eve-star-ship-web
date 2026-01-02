import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FACTIONS } from '../data';
import { GlassCard, SectionHeader } from '../components/SciFiUI';
import { ChevronLeft } from 'lucide-react';

const BackButton: React.FC<{ factionId: string; color: string }> = ({ factionId, color }) => (
    <Link 
        to={`/${factionId}`} 
        className="flex items-center gap-2 mb-6 font-orbitron text-sm uppercase tracking-widest hover:brightness-150 transition-all"
        style={{ color }}
    >
        <ChevronLeft size={16} /> Return to Hub
    </Link>
);

export const FactionInfo: React.FC = () => {
    const { factionId } = useParams<{ factionId: string }>();
    const faction = factionId ? FACTIONS[factionId] : null;
    if (!faction) return <Navigate to="/" />;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <BackButton factionId={faction.id} color={faction.color} />
            <SectionHeader title={`${faction.shortName} Archive`} color={faction.color} />
            
            <GlassCard borderColor={faction.color} className="p-8 md:p-12">
                <div className="space-y-6 text-lg font-rajdhani text-gray-300 leading-relaxed text-justify">
                    {faction.description.map((paragraph, idx) => (
                        <motion.p 
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700/50 flex justify-between text-xs font-orbitron text-gray-500 uppercase">
                    <span>Encrypted Transmission</span>
                    <span>Origin: New Eden</span>
                </div>
            </GlassCard>
        </div>
    );
};

export const FactionShips: React.FC = () => {
    const { factionId } = useParams<{ factionId: string }>();
    const faction = factionId ? FACTIONS[factionId] : null;
    if (!faction) return <Navigate to="/" />;

    return (
        <div className="container mx-auto px-4 py-8">
            <BackButton factionId={faction.id} color={faction.color} />
            <SectionHeader title="Naval Assets" color={faction.color} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {faction.ships.map((ship, idx) => (
                    <GlassCard key={idx} borderColor={faction.color} delay={idx * 0.15} className="group">
                        <div className="overflow-hidden h-48 mb-4 border-b border-gray-700">
                            <img src={ship.imageUrl} alt={ship.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <h3 className="text-2xl font-orbitron font-bold" style={{ color: faction.color }}>{ship.name}</h3>
                        <div className="text-xs font-orbitron text-gray-500 uppercase tracking-widest mb-3">{ship.class} Class</div>
                        <p className="font-rajdhani text-gray-300 text-sm">{ship.description}</p>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export const FactionVideo: React.FC = () => {
    const { factionId } = useParams<{ factionId: string }>();
    const faction = factionId ? FACTIONS[factionId] : null;
    if (!faction) return <Navigate to="/" />;

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <BackButton factionId={faction.id} color={faction.color} />
            <SectionHeader title="Visual Feed" color={faction.color} />
            
            <GlassCard borderColor={faction.color} className="p-1">
                <div className="relative w-full aspect-video bg-black overflow-hidden border border-gray-800">
                    <video 
                        className="w-full h-full object-cover" 
                        controls 
                        poster={faction.bgImage}
                    >
                        <source src={faction.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    {/* Overlay Scanlines */}
                    <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
                </div>
            </GlassCard>
            <div className="mt-4 text-center font-orbitron text-sm text-gray-500 uppercase tracking-widest animate-pulse">
                Receiving Stream... Quality: Lossless
            </div>
        </div>
    );
};