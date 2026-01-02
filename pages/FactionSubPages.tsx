import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FACTIONS } from '../data';
import { GsapGlassCard, SectionHeader } from '../components/SciFiUI';
import { ChevronLeft } from 'lucide-react';

const BackButton: React.FC<{ factionId: string; color: string }> = ({ factionId, color }) => (
    <Link 
        to={`/${factionId}`} 
        className="flex items-center gap-2 mb-8 font-orbitron text-sm uppercase tracking-widest hover:brightness-150 transition-all inline-block group"
        style={{ color }}
    >
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        RETURN TO HUB
    </Link>
);

export const FactionInfo: React.FC = () => {
    const { factionId } = useParams<{ factionId: string }>();
    const faction = factionId ? FACTIONS[factionId] : null;
    if (!faction) return <Navigate to="/" />;

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <BackButton factionId={faction.id} color={faction.color} />
            <SectionHeader title={`${faction.name} 资料库`} color={faction.color} />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/2 relative h-[400px]">
                    <GsapGlassCard borderColor={faction.color} className="h-full p-0 relative">
                        <img src={faction.bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-xl font-orbitron text-white italic tracking-wider">"{faction.tagline}"</h3>
                        </div>
                    </GsapGlassCard>
                </div>

                <div className="w-full md:w-1/2">
                    <GsapGlassCard borderColor={faction.color} className="p-8">
                        <div className="space-y-6 text-lg font-rajdhani text-gray-300 leading-relaxed text-justify">
                            {faction.description.map((paragraph, idx) => (
                                <p key={idx} className="first-letter:text-3xl first-letter:float-left first-letter:mr-2 first-letter:font-orbitron first-letter:text-[var(--f-color)]" style={{ '--f-color': faction.color } as React.CSSProperties}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        <div className="mt-8 pt-4 border-t border-white/10 flex justify-between text-xs font-orbitron text-gray-500 uppercase">
                             <span>DATA_PACKET_ID: {faction.shortName}_001</span>
                             <span>ENCRYPTED</span>
                        </div>
                    </GsapGlassCard>
                </div>
            </div>
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
            <SectionHeader title="舰队展示" color={faction.color} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {faction.ships.map((ship, idx) => (
                    <GsapGlassCard key={idx} borderColor={faction.color} delay={idx * 0.15} className="group">
                        <div className="h-48 mb-6 relative border-b border-white/10 bg-gradient-to-b from-transparent to-black/50">
                            <img src={ship.imageUrl} alt={ship.name} className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        
                        <div className="px-2">
                            <h3 className="text-2xl font-orbitron font-bold mb-1" style={{ color: faction.color }}>{ship.name}</h3>
                            <div className="text-xs font-orbitron text-gray-500 uppercase tracking-widest mb-3 border border-gray-800 inline-block px-2 py-1">
                                {ship.class}
                            </div>
                            <p className="font-rajdhani text-gray-300 text-sm h-12 overflow-hidden leading-relaxed">{ship.description}</p>
                        </div>
                    </GsapGlassCard>
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
            <SectionHeader title="宣传影像" color={faction.color} />
            
            <GsapGlassCard borderColor={faction.color} className="p-1">
                <div className="relative w-full aspect-video bg-black overflow-hidden border border-gray-800">
                    <video 
                        className="w-full h-full object-cover" 
                        controls 
                        poster={faction.bgImage}
                    >
                        <source src={faction.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    {/* Overlay Grid */}
                    <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-20" />
                </div>
            </GsapGlassCard>
            <div className="mt-4 flex justify-between font-orbitron text-xs text-gray-500 uppercase tracking-widest">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> TRANSMITTING...</span>
                <span>SECURE CHANNEL: {faction.shortName}_COMMS</span>
            </div>
        </div>
    );
};