import React, { useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FACTIONS } from '../data';
import { SectionHeader } from '../components/SciFiUI';
import { BookOpen, Anchor, MonitorPlay, ChevronRight, Binary, Crosshair, Radio } from 'lucide-react';

export const FactionHub: React.FC = () => {
  const { factionId } = useParams<{ factionId: string }>();
  const faction = factionId ? FACTIONS[factionId] : null;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  if (!faction) {
    return <Navigate to="/" />;
  }

  // Cards Configuration
  const cards = [
    {
        id: 'info',
        title: 'ARCHIVES',
        subtitle: 'DATABASE ACCESS',
        icon: BookOpen,
        bgIcon: Binary,
        link: `/${faction.id}/info`,
        desc: "Access historical records, cultural data, and classified directives.",
        bgImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.8), rgba(0,0,0,0.2))' 
    },
    {
        id: 'ships',
        title: 'FLEET',
        subtitle: 'MILITARY ASSETS',
        icon: Anchor,
        bgIcon: Crosshair,
        link: `/${faction.id}/ships`,
        desc: "Inspect capital ships, cruisers, and advanced weapon systems.",
        // Use the first ship image as background
        bgImage: `url(${faction.ships[0]?.imageUrl})`,
        bgSize: 'contain'
    },
    {
        id: 'video',
        title: 'COMMS',
        subtitle: 'ENCRYPTED FEED',
        icon: MonitorPlay,
        bgIcon: Radio,
        link: `/${faction.id}/video`,
        desc: "Intercept secure transmissions and propaganda broadcasts.",
        bgImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.9), rgba(0,0,0,0.4))'
    }
  ];

  useGSAP(() => {
    // Intro Animation for the cards sliding in
    gsap.from(".accordion-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });
    
    // Background Logo subtle float
    gsap.to(".bg-logo-watermark", {
        y: -20,
        rotation: 5,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-4 flex flex-col items-center justify-center min-h-[85vh] relative overflow-hidden">
      
      {/* 
         --- BACKGROUND WATERMARK LOGO --- 
         Keeps the faction logo always visible in the center
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
         <img 
            src={faction.logo} 
            alt="Watermark" 
            className="bg-logo-watermark w-[60vh] h-[60vh] object-contain opacity-10 blur-[2px] mix-blend-screen transition-all duration-1000"
            style={{ filter: `drop-shadow(0 0 50px ${faction.color}30)` }}
         />
      </div>

      {/* Top Header - Compact */}
      <div className="relative z-10 w-full mb-6">
          <SectionHeader title={faction.name} color={faction.color} />
      </div>

      {/* 
         --- ACCORDION CONTAINER --- 
         Flex row that handles the expansion logic
      */}
      <div className="relative z-10 w-full h-[60vh] flex flex-col md:flex-row gap-2 md:gap-4 perspective-1000">
        
        {cards.map((card) => {
            const isHovered = hoveredCard === card.id;
            const isAnyHovered = hoveredCard !== null;
            
            return (
                <Link 
                    key={card.id}
                    to={card.link}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`
                        accordion-card
                        relative overflow-hidden
                        flex-1 
                        transition-[flex-grow,filter,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                        border border-white/10 bg-black/40 backdrop-blur-md
                        group
                        hover:border-white/30
                    `}
                    style={{
                        // If hovered, grow to 3x size. If another is hovered, shrink to 1. If none, equal.
                        flexGrow: isHovered ? 3.5 : (isAnyHovered ? 0.8 : 1),
                        borderColor: isHovered ? faction.color : 'rgba(255,255,255,0.1)',
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' // Sci-Fi Corner Cut
                    }}
                >
                    {/* Dynamic Glow Gradient */}
                    <div 
                        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
                        style={{ background: `radial-gradient(circle at center, ${faction.glowColor}20, transparent 80%)` }}
                    />

                    {/* Background Visuals */}
                    <div 
                        className="absolute inset-0 bg-no-repeat bg-center transition-all duration-700 ease-out opacity-40 group-hover:opacity-60 group-hover:scale-110"
                        style={{ 
                            backgroundImage: card.bgImage,
                            backgroundSize: card.bgSize || 'cover',
                        }}
                    >
                         {/* Scanline Effect Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    </div>

                    {/* Large Background Icon Decoration */}
                    <card.bgIcon 
                        className={`
                            absolute -bottom-12 -right-12 w-64 h-64 text-white/5 
                            transition-all duration-500 
                            ${isHovered ? 'rotate-0 scale-100 opacity-20' : '-rotate-45 scale-75 opacity-0'}
                        `} 
                    />

                    {/* --- CONTENT LAYOUT --- */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        
                        {/* Header Area */}
                        <div className="flex items-start justify-between">
                            {/* Icon Box */}
                            <div 
                                className="w-10 h-10 flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-sm transition-colors duration-300"
                                style={{ borderColor: isHovered ? faction.color : 'rgba(255,255,255,0.1)' }}
                            >
                                <card.icon size={20} color={isHovered ? faction.color : 'white'} />
                            </div>

                            {/* Vertical Text (Visible when COLLAPSED or NOT HOVERED) */}
                            <div 
                                className={`
                                    absolute right-4 top-20 writing-vertical-rl text-xs font-orbitron tracking-[0.5em] text-gray-500 uppercase transition-all duration-300
                                    ${isHovered ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}
                                    ${!isAnyHovered ? 'opacity-50' : ''} 
                                `}
                            >
                                {card.title}
                            </div>
                        </div>

                        {/* Main Info (Visible ONLY when HOVERED) */}
                        <div 
                            className={`
                                flex flex-col gap-4 max-w-lg transition-all duration-500 delay-100
                                ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                            `}
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: faction.color }}></span>
                                    <span className="font-rajdhani text-xs tracking-[0.3em] uppercase text-cyan-400">{card.subtitle}</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-orbitron font-black uppercase text-white leading-none shadow-black drop-shadow-lg">
                                    {card.title}
                                </h3>
                            </div>

                            <p className="font-rajdhani text-gray-300 text-sm md:text-base leading-relaxed border-l-2 pl-4" style={{ borderColor: faction.color }}>
                                {card.desc}
                            </p>

                            <div 
                                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 w-fit transition-all group-active:scale-95"
                            >
                                <span className="font-orbitron text-xs font-bold uppercase tracking-widest">INITIALIZE</span>
                                <ChevronRight size={14} />
                            </div>
                        </div>

                        {/* Collapsed State Title (Visible when NOT hovered but layout is balanced) */}
                        <div className={`
                            absolute bottom-6 left-6 transition-all duration-500
                            ${isHovered ? 'opacity-0 translate-y-10' : 'opacity-100'}
                            ${isAnyHovered && !isHovered ? 'opacity-0' : ''} 
                        `}>
                             {!isHovered && (
                                <h3 className="text-xl font-orbitron font-bold uppercase text-gray-400 tracking-wider">
                                    {card.title}
                                </h3>
                             )}
                        </div>

                    </div>
                </Link>
            );
        })}
      </div>

    </div>
  );
};