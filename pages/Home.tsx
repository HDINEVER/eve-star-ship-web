import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FACTIONS } from '../data';
import { GsapGlassCard } from '../components/SciFiUI';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronRight, Zap } from 'lucide-react';

// 配置高刷新率支持
gsap.ticker.fps(144);
gsap.config({ force3D: true });

// 阵营飞船图片配置
const FACTION_SHIP_IMAGES: Record<string, string[]> = {
  amarr: ['/mars-4.webp', '/mars-5.webp', '/mars-6.webp'],
  caldari: ['/jupiter-4.webp', '/jupiter-5.webp', '/jupiter-6.webp'],
  gallente: ['/pluto-4.webp', '/pluto-5.webp', '/pluto-6.webp'],
};

// 图片轮播组件 - 广告牌式左右滚动
const ImageCarousel: React.FC<{ images: string[]; isActive: boolean; color: string }> = ({ images, isActive, color }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      setCurrentIndex(0);
      return;
    }
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500); // 每2.5秒切换一张

    return () => clearInterval(interval);
  }, [isActive, images.length]);

  // 使用GSAP实现平滑的左右滑动动画
  useEffect(() => {
    if (carouselRef.current && isActive) {
      gsap.to(carouselRef.current, {
        x: `-${currentIndex * 100}%`,
        duration: 0.8,
        ease: "power2.inOut",
        force3D: true
      });
    }
  }, [currentIndex, isActive]);

  return (
    <div className={`
      absolute inset-0 overflow-hidden transition-opacity duration-500
      ${isActive ? 'opacity-100' : 'opacity-0'}
    `}>
      {/* 图片滑动容器 */}
      <div 
        ref={carouselRef}
        className="flex h-full"
        style={{ width: `${images.length * 100}%` }}
      >
        {images.map((img, idx) => (
          <div
            key={img}
            className="relative h-full flex-shrink-0"
            style={{ width: `${100 / images.length}%` }}
          >
            <img 
              src={img} 
              alt={`Ship ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* 渐变遮罩确保文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none" />
      {/* 左右渐变边缘 */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
      {/* 顶部光晕 */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 opacity-50 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${color}20, transparent)` }}
      />
      {/* 扫描线效果 */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      {/* 图片指示器 - 广告牌风格 */}
      <div className="absolute bottom-20 sm:bottom-24 left-4 flex gap-2">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 sm:w-10' : 'w-2'}`}
            style={{ backgroundColor: idx === currentIndex ? color : 'rgba(255,255,255,0.3)' }}
          />
        ))}
      </div>
      {/* 当前图片编号 */}
      <div className="absolute bottom-20 sm:bottom-24 right-4 font-orbitron text-xs text-white/50">
        <span style={{ color }}>{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        <span>{String(images.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hoveredFaction, setHoveredFaction] = useState<string | null>(null);

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
    <div ref={containerRef} className="container mx-auto px-3 sm:px-4 py-6 sm:py-12 flex flex-col items-center justify-center min-h-[85vh] relative z-10">
      
      {/* Main Title - Pure Orbitron Dominance */}
      <div className="text-center mb-8 sm:mb-20 relative">
        {/* Enhanced Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
        
        <h1 ref={titleRef} className="relative z-10 text-4xl sm:text-6xl md:text-9xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-600 tracking-tighter" style={{ textShadow: '0 0 60px rgba(34,211,238,0.5), 0 0 120px rgba(34,211,238,0.3)' }}>
            NEW EDEN
        </h1>
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 sm:mt-4">
             <div className="h-[1px] sm:h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400/70" />
             <p className="text-[10px] sm:text-sm text-cyan-300 font-['Noto_Sans_SC'] font-bold tracking-[0.4em] sm:tracking-[0.8em] uppercase px-2 sm:px-4 py-1 bg-black/30 backdrop-blur-sm rounded border border-cyan-500/20">
                星战前夜 / 编年史
             </p>
             <div className="h-[1px] sm:h-[2px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400/70" />
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
                className="h-[280px] sm:h-[350px] lg:h-[550px] flex flex-col relative group transition-all duration-500"
              >
                
                {/* 飞船图片轮播背景 */}
                <ImageCarousel 
                  images={FACTION_SHIP_IMAGES[faction.id] || []}
                  isActive={hoveredFaction === faction.id}
                  color={faction.color}
                />

                {/* 1. Background Large Logo (Abstract & Decorative) */}
                <div className={`absolute -right-8 sm:-right-16 -top-8 sm:-top-16 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 transition-all duration-700 ease-in-out pointer-events-none grayscale group-hover:grayscale-0 ${hoveredFaction === faction.id ? 'opacity-30 rotate-12' : 'opacity-10'}`}>
                    <img src={faction.logo} alt="" className="w-full h-full object-contain" />
                </div>

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