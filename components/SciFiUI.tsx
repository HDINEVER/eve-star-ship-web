import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  glowColor?: string;
  delay?: number;
  hoverEffect?: boolean;
}

// Register GSAP plugins
gsap.registerPlugin(useGSAP);

// 配置 GSAP ticker 支持高刷新率 (最高 144Hz)
gsap.ticker.fps(144);
// 使用 requestAnimationFrame 确保与显示器刷新率同步
gsap.ticker.lagSmoothing(0);
// 启用强制渲染优化
gsap.config({
  force3D: true, // 强制使用 3D transforms 进行 GPU 加速
  nullTargetWarn: false,
  autoSleep: 60,
  units: { left: '%', top: '%', rotation: 'rad' }
});

export const GsapGlassCard: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  borderColor = '#44ffdd', 
  glowColor = 'rgba(68, 255, 221, 0.3)',
  delay = 0,
  hoverEffect = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance Animation - 使用 transform 进行 GPU 加速
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        delay: delay, 
        ease: "power3.out",
        force3D: true, // 强制 GPU 加速
        willChange: "transform, opacity" // 提示浏览器优化
      }
    );

    // Hover Effects - 优化事件监听
    if (hoverEffect && cardRef.current) {
        const card = cardRef.current;
        const glow = glowRef.current;
        
        // 使用 GSAP 快速设置器优化性能
        const quickY = gsap.quickTo(card, "y", { duration: 0.3, ease: "power2.out" });
        const quickScale = gsap.quickTo(card, "scale", { duration: 0.3, ease: "power2.out" });
        const quickGlowOpacity = gsap.quickTo(glow, "opacity", { duration: 0.3, ease: "power2.out" });
        
        card.addEventListener('mouseenter', () => {
            // Card Lift & Scale - 使用 quickTo 提升性能
            quickY(-10);
            quickScale(1.02);
            
            gsap.to(card, { 
                borderColor: borderColor,
                boxShadow: `0 20px 50px -20px ${glowColor}`,
                duration: 0.3, 
                ease: "power2.out",
                force3D: true
            });
            
            // Fast Scanline
            gsap.fromTo(scanlineRef.current, 
                { top: '-20%', opacity: 0 },
                { top: '120%', opacity: 0.8, duration: 0.5, ease: "power1.in", force3D: true }
            );

            // Background Glow Intensity
            quickGlowOpacity(0.4);
        });

        card.addEventListener('mouseleave', () => {
            quickY(0);
            quickScale(1);
            quickGlowOpacity(0);
            
            gsap.to(card, { 
                borderColor: 'rgba(255,255,255,0.1)',
                boxShadow: 'none',
                duration: 0.4, 
                ease: "power2.out",
                force3D: true
            });
        });
    }
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef}
      className={`relative group bg-black/60 backdrop-blur-md border border-white/15 overflow-hidden will-change-transform gpu-accelerated shadow-2xl shadow-black/50 ${className}`}
      style={{
        // More aggressive Cyberpunk angled cut
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)',
        transform: 'translate3d(0, 0, 0)' // 启用 GPU 加速层
      }}
    >
      {/* Dynamic Glow Background */}
      <div 
        ref={glowRef}
        className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none"
        style={{ 
            background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)` 
        }}
      />
      
      {/* Card Inner Gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />

      {/* Tech Decoration Lines - Top Right */}
      <div className="absolute top-0 right-0 w-24 h-[2px] bg-white/10 group-hover:w-full group-hover:bg-white/30 transition-all duration-700 ease-out" />
      <div className="absolute top-0 right-0 w-[2px] h-12 bg-white/10 group-hover:h-full group-hover:bg-white/30 transition-all duration-500 ease-out delay-100" />
      
      {/* Corner Accents - Dynamic Color */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l transition-all duration-300 group-hover:w-16 group-hover:h-16 opacity-50 group-hover:opacity-100" style={{ borderColor }} />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-all duration-300 group-hover:w-4 group-hover:h-4 opacity-50 group-hover:opacity-100" style={{ borderColor }} />

      {/* Holographic Scanline */}
      <div 
        ref={scanlineRef}
        className="absolute left-0 w-full h-10 bg-gradient-to-b from-transparent via-white to-transparent opacity-0 pointer-events-none z-20 mix-blend-overlay"
        style={{ transform: 'skewY(-5deg)' }}
      />

      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export const SectionHeader: React.FC<{ title: string; color: string }> = ({ title, color }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(textRef.current, 
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(lineRef.current,
            { width: 0 },
            { width: '100%', duration: 1, ease: "expo.out" },
            "-=0.5"
        );
    }, { scope: headerRef });

    return (
        <div ref={headerRef} className="mb-6 sm:mb-12 relative overflow-hidden">
            <h2 ref={textRef} className="text-2xl sm:text-4xl md:text-5xl font-orbitron font-bold uppercase tracking-wider sm:tracking-widest relative z-10" style={{ color, textShadow: `0 0 20px ${color}60` }}>
                {title}
            </h2>
            <div ref={lineRef} className="h-[1px] sm:h-[2px] mt-2 sm:mt-4 relative" style={{ backgroundColor: color }}>
                <div className="absolute bottom-[-2px] left-0 h-[1px] sm:h-[2px] w-16 sm:w-32 bg-white mix-blend-overlay" />
                <div className="absolute right-0 -top-1 w-1.5 sm:w-2 h-2 sm:h-3 bg-white" />
            </div>
            <div className="absolute top-0 right-0 text-[8px] sm:text-xs font-rajdhani text-gray-500 tracking-[0.3em] sm:tracking-[0.5em] opacity-50 hidden sm:block">
                SEC.LEVEL 0.0
            </div>
        </div>
    );
};

export const AnimatedButton: React.FC<{ children: React.ReactNode; color: string; onClick?: () => void }> = ({ children, color, onClick }) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        const btn = btnRef.current;
        if(btn) {
             btn.addEventListener('mouseenter', () => {
                gsap.to(btn, { backgroundColor: color, color: '#000', letterSpacing: '0.3em', duration: 0.3 });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { backgroundColor: 'transparent', color: color, letterSpacing: '0.2em', duration: 0.3 });
            });
        }
    }, { scope: btnRef });

    return (
        <button 
            ref={btnRef}
            onClick={onClick}
            className="px-8 py-3 font-orbitron font-bold uppercase tracking-[0.2em] border transition-all relative overflow-hidden"
            style={{ borderColor: color, color: color }}
        >
            {children}
        </button>
    );
};