import React, { useRef, useState } from 'react';
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
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hoveredFaction, setHoveredFaction] = useState<string | null>(null);

  useGSAP(() => {
    // Initial Entrance Animation
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

    // Scroll Effect Listener
    const handleScroll = () => {
        if (!titleContainerRef.current) return;
        const scrollY = window.scrollY;
        // Parallax & Fade effect
        gsap.to(titleContainerRef.current, {
            y: scrollY * 0.5, // Move down at half speed (parallax)
            opacity: 1 - scrollY / 500, // Fade out
            scale: 1 - scrollY / 1000, // Slight scale down
            duration: 0.1,
            overwrite: 'auto',
            ease: 'none'
        });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="container mx-auto px-3 sm:px-4 py-6 sm:py-12 flex flex-col items-center justify-center min-h-[85vh] relative z-10">
      
      {/* Main Title - Audiowide with Scroll Effects */}
      <div ref={titleContainerRef} className="text-center mb-12 sm:mb-24 relative perspective-1000 will-change-transform">
        {/* Enhanced Glow Background - Softened */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-blue-600/5 blur-[80px] rounded-full pointer-events-none mix-blend-overlay" />
        
        {/* Decorative Elements */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50" />
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        <h1 ref={titleRef} className="relative z-10 text-[6rem] sm:text-[9rem] md:text-[13rem] leading-none font-audiowide font-black tracking-[-0.05em] select-none group cursor-default flex items-center justify-center">
            {/* Split letters for Z-index layering */}
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)] animate-glitch-1">E</span>
            
            {/* The V - Larger and Behind */}
            <span className="relative z-0 text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-600 drop-shadow-[0_0_50px_rgba(34,211,238,0.8)] -mx-4 sm:-mx-8 transform scale-125 translate-y-2">V</span>
            
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)] animate-glitch-1">E</span>
        </h1>
        
        <div className="flex flex-col items-center gap-2 mt-4 sm:mt-8 relative z-10">
             <div className="flex items-center gap-4">
                 <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                 <p className="text-xs sm:text-base text-cyan-200 font-['Noto_Sans_SC'] font-bold tracking-[0.5em] sm:tracking-[0.8em] uppercase px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    星战前夜 <span className="text-cyan-600 mx-1">/</span> 阵营介绍
                 </p>
                 <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
             </div>
             <p className="text-[10px] text-cyan-500/50 font-orbitron tracking-[0.3em] uppercase mt-1">
                 CHRONICLES OF NEW EDEN // YC 125
             </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full max-w-7xl">
        {Object.values(FACTIONS).map((faction, index) => (
          <div key={faction.id} className="h-full">
            <Link 
              to={`/${faction.id}`} 
              className="block h-full perspective-1000"
              onMouseEnter={() => setHoveredFaction(faction.id)}
              onMouseLeave={() => setHoveredFaction(null)}
            >
              <GsapGlassCard 
                borderColor={faction.color} 
                glowColor={faction.glowColor}
                delay={index * 0.15 + 0.3}
                className="h-[280px] sm:h-[350px] lg:h-[550px] flex flex-col relative group transition-all duration-500 overflow-hidden"
              >
                
                {/* 阵营标志 - 非线性移动到右边，只露出2/3 */}
                <div 
                  className={`
                    absolute pointer-events-none z-0
                    w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80
                    transition-all duration-700
                    ${hoveredFaction === faction.id 
                      ? 'ease-[cubic-bezier(0.34,1.56,0.64,1)]' 
                      : 'ease-[cubic-bezier(0.25,0.1,0.25,1)]'
                    }
                  `}
                  style={{
                    // 默认在右上角，根据不同阵营图标形状微调位置
                    // 艾玛(index=0)图标偏上，加达里(index=1)和盖伦特(index=2)需要往上移
                    top: hoveredFaction === faction.id 
                      ? '50%' 
                      : index === 0 ? '-2rem' : '-4rem',
                    right: hoveredFaction === faction.id ? '-20%' : '-2rem',
                    transform: hoveredFaction === faction.id 
                      ? 'translateY(-50%) scale(1.3)' 
                      : 'translateY(0) scale(1)',
                  }}
                >
                  {/* 图标本身 */}
                  <img 
                    src={faction.logo} 
                    alt={faction.name}
                    className={`
                      w-full h-full object-contain transition-all duration-700
                      ${hoveredFaction === faction.id 
                        ? 'opacity-80 grayscale-0' 
                        : 'opacity-20 grayscale'
                      }
                    `}
                    style={{ 
                      filter: hoveredFaction === faction.id 
                        ? `drop-shadow(0 0 80px ${faction.color}) drop-shadow(0 0 160px ${faction.color}80)` 
                        : 'none'
                    }}
                  />
                </div>

                {/* 阵营名称文字 - 悬停时变大成为白色标题的阴影背景 */}
                <div 
                  className={`
                    absolute pointer-events-none font-orbitron font-black uppercase
                    transition-all duration-700
                    ${hoveredFaction === faction.id 
                      ? 'ease-[cubic-bezier(0.34,1.56,0.64,1)]' 
                      : 'ease-[cubic-bezier(0.25,0.1,0.25,1)]'
                    }
                  `}
                  style={{
                    // 默认跟随图标在右上角，悬停时移动到左下角与白字对齐
                    left: hoveredFaction === faction.id ? '0.75rem' : 'auto',
                    right: hoveredFaction === faction.id ? 'auto' : '1rem',
                    bottom: hoveredFaction === faction.id ? '5.5rem' : 'auto',
                    top: hoveredFaction === faction.id ? 'auto' : '6rem',
                    fontSize: hoveredFaction === faction.id ? 'clamp(3rem, 8vw, 6rem)' : 'clamp(1rem, 3vw, 1.5rem)',
                    opacity: hoveredFaction === faction.id ? 0.15 : 0.4,
                    color: faction.color,
                    letterSpacing: hoveredFaction === faction.id ? '0.05em' : '0.1em',
                    transform: hoveredFaction === faction.id ? 'translateX(0)' : 'translateX(0)',
                    zIndex: 0,
                    textShadow: `0 0 40px ${faction.color}40`,
                  }}
                >
                  {faction.shortName}
                </div>

                {/* 强烈的辉光效果 - 从右侧扩散 */}
                <div 
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${hoveredFaction === faction.id ? 'opacity-100' : 'opacity-0'}`}
                  style={{ 
                    background: `radial-gradient(circle at 100% 50%, ${faction.color}50 0%, ${faction.color}30 20%, ${faction.color}15 35%, transparent 55%)` 
                  }}
                />

                {/* 多层辉光增强效果 - 右侧边缘光 */}
                <div 
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${hoveredFaction === faction.id ? 'opacity-100' : 'opacity-0'}`}
                  style={{ 
                    background: `linear-gradient(to left, ${faction.color}40 0%, transparent 40%)`,
                    mixBlendMode: 'screen'
                  }}
                />

                {/* 扫描线效果 */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />

                {/* 2. Content Container - Pushed to Bottom */}
                <div className="mt-auto relative z-10 p-2 flex flex-col h-full justify-end">
                    
                    {/* Faction ID Number */}
                    <div className="mb-auto pt-2 sm:pt-4 pl-2 font-rajdhani text-[10px] sm:text-xs text-white/30 tracking-widest group-hover:text-white/60 transition-colors">
                        SEC_ID // 0{index + 1}
                    </div>

                    <div className="pl-3 sm:pl-4 border-l-2 transition-all duration-300 group-hover:border-l-4 pr-2 sm:pr-4" style={{ borderColor: faction.color }}>
                        {/* Dominant English Title */}
                        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-orbitron font-black uppercase leading-none text-white drop-shadow-lg transform group-hover:translate-x-2 transition-transform duration-300">
                            {faction.shortName}
                        </h2>
                        
                        {/* Tiny Chinese Subtext (HeiTi / Noto Sans SC) */}
                        <div className="mt-1 sm:mt-2 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <span className="font-['Noto_Sans_SC'] font-bold text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.6em] text-white/80 bg-white/10 px-1.5 sm:px-2 py-0.5 rounded-sm">
                                {faction.name}
                            </span>
                            <span className="h-[1px] flex-1 bg-gradient-to-r from-white/30 to-transparent"></span>
                        </div>

                        {/* Description Reveal on Hover - Hidden on mobile */}
                        <div className="hidden sm:block overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out mt-0 group-hover:mt-4">
                            <p className="font-rajdhani text-xs sm:text-sm text-gray-300 leading-tight">
                                {faction.tagline}
                            </p>
                        </div>
                    </div>

                    {/* 3. New "Initialize" Button Area */}
                    <div className="mt-4 sm:mt-8 relative h-10 sm:h-14 overflow-hidden">
                        {/* Default State: Thin Line & Text */}
                        <div className="absolute inset-0 flex items-center justify-between border-t border-white/10 px-3 sm:px-4 group-hover:translate-y-full transition-transform duration-300">
                            <span className="font-orbitron text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-gray-500">ACCESS DENIED</span>
                            <Zap size={12} className="text-gray-600 sm:w-[14px] sm:h-[14px]" />
                        </div>

                        {/* Hover State: Full Color Block */}
                        <div 
                            className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                            style={{ backgroundColor: faction.color }}
                        >
                            <span className="font-orbitron font-bold text-black text-sm sm:text-lg tracking-widest uppercase">
                                Initialize
                            </span>
                            <div className="bg-black/20 p-1 rounded">
                                <ChevronRight size={16} className="text-black sm:w-[20px] sm:h-[20px]" />
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