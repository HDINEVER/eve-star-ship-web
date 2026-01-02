import React, { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FACTIONS } from '../data';
import { GsapGlassCard, SectionHeader } from '../components/SciFiUI';
import { BookOpen, Crosshair, MonitorPlay } from 'lucide-react';

export const FactionHub: React.FC = () => {
  const { factionId } = useParams<{ factionId: string }>();
  const faction = factionId ? FACTIONS[factionId] : null;
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  if (!faction) {
    return <Navigate to="/" />;
  }

  useGSAP(() => {
    // 3D Tilt Effect for Logo
    const logo = logoRef.current;
    if (logo) {
        gsap.fromTo(logo, 
            { rotationY: 90, opacity: 0 },
            { rotationY: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
        );

        // Idle floating animation
        gsap.to(logo, {
            y: -15,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8 flex flex-col items-center max-w-5xl">
      
      {/* Top Section: Title & Large Logo */}
      <div className="w-full flex flex-col items-center mb-16 relative">
          <SectionHeader title={faction.name} color={faction.color} />

          <div className="relative w-full h-[400px] flex items-center justify-center perspective-1000 mt-8">
             {/* Glow Background behind Logo */}
             <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-20 z-0" style={{ backgroundColor: faction.color }} />
             
             {/* Large Central Logo Container with Sci-Fi borders */}
             <div 
                className="relative z-10 p-10 border border-white/5 bg-black/40 backdrop-blur-sm"
                style={{ 
                    borderColor: faction.color,
                    clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' 
                }}
             >
                 {/* Corner Decorations */}
                 <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: faction.color }} />
                 <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: faction.color }} />

                 <img 
                    ref={logoRef}
                    src={faction.logo} 
                    alt={faction.name} 
                    className="w-[300px] h-[300px] object-contain filter drop-shadow-2xl"
                 />
                 <div className="absolute -bottom-6 left-0 right-0 text-center font-orbitron text-3xl tracking-[0.2em] uppercase opacity-80" style={{ color: faction.color }}>
                    {faction.shortName}
                 </div>
             </div>
          </div>
      </div>

      {/* Bottom Section: 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        
        {/* Card 1: Intro */}
        <Link to={`/${faction.id}/info`}>
            <GsapGlassCard 
                borderColor={faction.color} 
                glowColor={faction.glowColor} 
                delay={0.5}
                className="h-56 flex flex-col items-center justify-between py-8 hover:bg-white/5 transition-colors cursor-pointer group"
            >
                <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen size={32} style={{ color: faction.color }} />
                </div>
                
                <div className="w-full px-8">
                     <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4" />
                     <h3 className="text-xl font-orbitron font-bold text-center uppercase tracking-widest" style={{ color: faction.color }}>
                        {faction.id === 'amarr' ? '帝国介绍' : faction.id === 'caldari' ? '合众国介绍' : '联邦介绍'}
                     </h3>
                </div>
            </GsapGlassCard>
        </Link>

        {/* Card 2: Ships */}
        <Link to={`/${faction.id}/ships`}>
            <GsapGlassCard 
                borderColor={faction.color} 
                glowColor={faction.glowColor} 
                delay={0.7}
                className="h-56 flex flex-col items-center justify-between py-8 hover:bg-white/5 transition-colors cursor-pointer group"
            >
                <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                     <Crosshair size={32} style={{ color: faction.color }} />
                </div>

                <div className="w-full px-8">
                     <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4" />
                     <h3 className="text-xl font-orbitron font-bold text-center uppercase tracking-widest" style={{ color: faction.color }}>
                        舰船展示
                     </h3>
                </div>
            </GsapGlassCard>
        </Link>

        {/* Card 3: Video */}
        <Link to={`/${faction.id}/video`}>
            <GsapGlassCard 
                borderColor={faction.color} 
                glowColor={faction.glowColor} 
                delay={0.9}
                className="h-56 flex flex-col items-center justify-between py-8 hover:bg-white/5 transition-colors cursor-pointer group"
            >
                <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <MonitorPlay size={32} style={{ color: faction.color }} />
                </div>

                <div className="w-full px-8">
                     <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4" />
                     <h3 className="text-xl font-orbitron font-bold text-center uppercase tracking-widest" style={{ color: faction.color }}>
                        {faction.id === 'amarr' ? '视频宣传' : '视频宣传'}
                     </h3>
                </div>
            </GsapGlassCard>
        </Link>

      </div>
    </div>
  );
};