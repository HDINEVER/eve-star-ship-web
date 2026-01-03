import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FACTIONS } from '../data';
import { GsapGlassCard } from '../components/SciFiUI';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronRight, Zap } from 'lucide-react';

// 配置高刷新率支持
gsap.ticker.fps(144);
gsap.config({ force3D: true });

export const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Title Animation - 优化版本
    gsap.fromTo(titleRef.current,
        { opacity: 0, y: -50 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            force3D: true,
            willChange: "transform, opacity"
        }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[85vh] relative z-10">
      
      {/* Main Title - Pure Orbitron Dominance */}
      <div className="text-center mb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        <h1 ref={titleRef} className="relative z-10 text-6xl md:text-9xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-900 tracking-tighter drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
            NEW EDEN
        </h1>
        <div className="flex items-center justify-center gap-4 mt-2">
             <div className="h-[1px] w-12 bg-cyan-500/50" />
             <p className="text-sm text-cyan-400 font-['Noto_Sans_SC'] font-bold tracking-[0.8em] uppercase">
                星战前夜 / 编年史
             </p>
             <div className="h-[1px] w-12 bg-cyan-500/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {Object.values(FACTIONS).map((faction, index) => (
          <div key={faction.id} className="h-full">
            <Link to={`/${faction.id}`} className="block h-full perspective-1000">
              <GsapGlassCard 
                borderColor={faction.color} 
                glowColor={faction.glowColor}
                delay={index * 0.15 + 0.3}
                className="h-[550px] flex flex-col relative group transition-all duration-500"
              >
                
                {/* 1. Background Large Logo (Abstract & Decorative) */}
                <div className="absolute -right-16 -top-16 w-80 h-80 opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-700 ease-in-out pointer-events-none grayscale group-hover:grayscale-0">
                    <img src={faction.logo} alt="" className="w-full h-full object-contain" />
                </div>

                {/* 2. Content Container - Pushed to Bottom */}
                <div className="mt-auto relative z-10 p-2 flex flex-col h-full justify-end">
                    
                    {/* Faction ID Number */}
                    <div className="mb-auto pt-4 pl-2 font-rajdhani text-xs text-white/30 tracking-widest group-hover:text-white/60 transition-colors">
                        SEC_ID // 0{index + 1}
                    </div>

                    <div className="pl-4 border-l-2 transition-all duration-300 group-hover:border-l-4 pr-4" style={{ borderColor: faction.color }}>
                        {/* Dominant English Title */}
                        <h2 className="text-5xl font-orbitron font-black uppercase leading-none text-white drop-shadow-lg transform group-hover:translate-x-2 transition-transform duration-300">
                            {faction.shortName}
                        </h2>
                        
                        {/* Tiny Chinese Subtext (HeiTi / Noto Sans SC) */}
                        <div className="mt-2 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <span className="font-['Noto_Sans_SC'] font-bold text-[10px] tracking-[0.6em] text-white/80 bg-white/10 px-2 py-0.5 rounded-sm">
                                {faction.name}
                            </span>
                            <span className="h-[1px] flex-1 bg-gradient-to-r from-white/30 to-transparent"></span>
                        </div>

                        {/* Description Reveal on Hover */}
                        <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out mt-0 group-hover:mt-4">
                            <p className="font-rajdhani text-sm text-gray-300 leading-tight">
                                {faction.tagline}
                            </p>
                        </div>
                    </div>

                    {/* 3. New "Initialize" Button Area */}
                    <div className="mt-8 relative h-14 overflow-hidden">
                        {/* Default State: Thin Line & Text */}
                        <div className="absolute inset-0 flex items-center justify-between border-t border-white/10 px-4 group-hover:translate-y-full transition-transform duration-300">
                            <span className="font-orbitron text-xs tracking-[0.3em] text-gray-500">ACCESS DENIED</span>
                            <Zap size={14} className="text-gray-600" />
                        </div>

                        {/* Hover State: Full Color Block */}
                        <div 
                            className="absolute inset-0 flex items-center justify-between px-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                            style={{ backgroundColor: faction.color }}
                        >
                            <span className="font-orbitron font-bold text-black text-lg tracking-widest uppercase">
                                Initialize
                            </span>
                            <div className="bg-black/20 p-1 rounded">
                                <ChevronRight size={20} className="text-black" />
                            </div>
                        </div>
                    </div>
                </div>

              </GsapGlassCard>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};