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
    // Entrance Animation
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: delay, ease: "power3.out" }
    );

    // Hover Effects
    if (hoverEffect && cardRef.current) {
        const card = cardRef.current;
        const glow = glowRef.current;
        
        card.addEventListener('mouseenter', () => {
            // Card Lift & Scale
            gsap.to(card, { 
                y: -10, 
                scale: 1.02,
                borderColor: borderColor,
                boxShadow: `0 20px 50px -20px ${glowColor}`,
                duration: 0.4, 
                ease: "power2.out" 
            });
            
            // Fast Scanline
            gsap.fromTo(scanlineRef.current, 
                { top: '-20%', opacity: 0 },
                { top: '120%', opacity: 0.8, duration: 0.6, ease: "power1.in" }
            );

            // Background Glow Intensity
            gsap.to(glow, { opacity: 0.4, duration: 0.5 });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                y: 0, 
                scale: 1, 
                borderColor: 'rgba(255,255,255,0.1)',
                boxShadow: 'none',
                duration: 0.5, 
                ease: "power2.out" 
            });
            gsap.to(glow, { opacity: 0, duration: 0.5 });
        });
    }
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef}
      className={`relative group bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden ${className}`}
      style={{
        // More aggressive Cyberpunk angled cut
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'
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
        <div ref={headerRef} className="mb-12 relative overflow-hidden">
            <h2 ref={textRef} className="text-4xl md:text-5xl font-orbitron font-bold uppercase tracking-widest relative z-10" style={{ color, textShadow: `0 0 20px ${color}60` }}>
                {title}
            </h2>
            <div ref={lineRef} className="h-[2px] mt-4 relative" style={{ backgroundColor: color }}>
                <div className="absolute bottom-[-2px] left-0 h-[2px] w-32 bg-white mix-blend-overlay" />
                <div className="absolute right-0 -top-1 w-2 h-3 bg-white" />
            </div>
            <div className="absolute top-0 right-0 text-xs font-rajdhani text-gray-500 tracking-[0.5em] opacity-50">
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