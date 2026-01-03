import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FACTIONS } from '../data';
import { GsapGlassCard, SectionHeader } from '../components/SciFiUI';
import { ChevronLeft } from 'lucide-react';

const BackButton: React.FC<{ factionId: string; color: string }> = ({ factionId, color }) => (
    <Link 
        to={`/${factionId}`} 
        className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-8 font-orbitron text-xs sm:text-sm uppercase tracking-widest hover:brightness-150 transition-all inline-block group"
        style={{ color }}
    >
        <ChevronLeft size={14} className="sm:w-[16px] sm:h-[16px] group-hover:-translate-x-1 transition-transform" /> 
        RETURN TO HUB
    </Link>
);

export const FactionInfo: React.FC = () => {
    const { factionId } = useParams<{ factionId: string }>();
    const faction = factionId ? FACTIONS[factionId] : null;
    if (!faction) return <Navigate to="/" />;

    return (
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-5xl">
            <BackButton factionId={faction.id} color={faction.color} />
            <SectionHeader title={`${faction.name} 资料库`} color={faction.color} />
            
            <div className="flex flex-col md:flex-row gap-4 sm:gap-8 items-start">
                <div className="w-full md:w-1/2 relative h-[200px] sm:h-[300px] md:h-[400px]">
                    <GsapGlassCard borderColor={faction.color} className="h-full p-0 relative">
                        <img src={faction.bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6">
                            <h3 className="text-sm sm:text-lg md:text-xl font-orbitron text-white italic tracking-wider">"{faction.tagline}"</h3>
                        </div>
                    </GsapGlassCard>
                </div>

                <div className="w-full md:w-1/2">
                    <GsapGlassCard borderColor={faction.color} className="p-4 sm:p-6 md:p-8">
                        <div className="space-y-3 sm:space-y-6 text-sm sm:text-base md:text-lg font-rajdhani text-gray-300 leading-relaxed text-justify">
                            {faction.description.map((paragraph, idx) => (
                                <p key={idx} className="first-letter:text-2xl sm:first-letter:text-3xl first-letter:float-left first-letter:mr-2 first-letter:font-orbitron first-letter:text-[var(--f-color)]" style={{ '--f-color': faction.color } as React.CSSProperties}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-white/10 flex justify-between text-[10px] sm:text-xs font-orbitron text-gray-500 uppercase">
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
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
            <BackButton factionId={faction.id} color={faction.color} />
            <SectionHeader title="舰队展示" color={faction.color} />
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
                {faction.ships.map((ship, idx) => (
                    <GsapGlassCard key={idx} borderColor={faction.color} delay={idx * 0.15} className="group">
                        <div className="h-24 sm:h-36 lg:h-48 mb-2 sm:mb-4 lg:mb-6 relative border-b border-white/10 bg-gradient-to-b from-transparent to-black/50">
                            <img src={ship.imageUrl} alt={ship.name} className="w-full h-full object-contain p-1 sm:p-2 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        
                        <div className="px-1.5 sm:px-2 pb-2">
                            <h3 className="text-sm sm:text-lg lg:text-2xl font-orbitron font-bold mb-0.5 sm:mb-1 truncate" style={{ color: faction.color }}>{ship.name}</h3>
                            <div className="text-[8px] sm:text-[10px] lg:text-xs font-orbitron text-gray-500 uppercase tracking-wider sm:tracking-widest mb-1 sm:mb-3 border border-gray-800 inline-block px-1 sm:px-2 py-0.5 sm:py-1">
                                {ship.class}
                            </div>
                            <p className="font-rajdhani text-gray-300 text-[10px] sm:text-xs lg:text-sm h-6 sm:h-8 lg:h-12 overflow-hidden leading-tight sm:leading-relaxed hidden sm:block">{ship.description}</p>
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
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-5xl">
            <BackButton factionId={faction.id} color={faction.color} />
            <SectionHeader title="宣传影像" color={faction.color} />
            
            <GsapGlassCard borderColor={faction.color} className="p-0.5 sm:p-1">
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
            <div className="mt-2 sm:mt-4 flex justify-between font-orbitron text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider sm:tracking-widest">
                <span className="flex items-center gap-1 sm:gap-2"><span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-500 animate-pulse"></span> TRANSMITTING...</span>
                <span className="hidden sm:inline">SECURE CHANNEL: {faction.shortName}_COMMS</span>
            </div>
        </div>
    );
};