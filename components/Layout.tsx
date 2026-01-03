import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Download, Headset, RefreshCw, ChevronRight, Activity } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 配置 GSAP 高刷新率支持
gsap.ticker.fps(144);
gsap.ticker.lagSmoothing(0);
gsap.config({ force3D: true });

const NavItem = ({ to, icon: Icon, children }: { to: string; icon: any; children?: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative flex items-center gap-2 px-4 py-2 font-orbitron text-xs font-bold uppercase tracking-widest transition-all duration-300 group overflow-hidden rounded-sm
      ${isActive 
        ? 'text-cyan-400 bg-cyan-900/20' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`
    }
  >
    {({ isActive }) => (
      <>
        {/* Hover/Active Glitch Line */}
        <span className={`absolute left-0 top-0 w-[2px] h-full bg-cyan-400 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
        
        <Icon size={14} className={`transition-transform duration-300 ${isActive ? 'scale-110 shadow-cyan-400' : 'group-hover:scale-110'}`} />
        <span>{children}</span>
        
        {/* Active Glow Bottom */}
        <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      </>
    )}
  </NavLink>
);

export const Layout: React.FC = () => {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null); // Ref for the new background
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Scroll Logic & Background Parallax - 优化版本
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    
    // 使用 quickTo 预先创建动画实例，大幅提升性能
    const quickY = bgRef.current ? gsap.quickTo(bgRef.current, "y", { duration: 0.3, ease: "power1.out" }) : null;
    const quickOpacity = bgRef.current ? gsap.quickTo(bgRef.current, "opacity", { duration: 0.3, ease: "power1.out" }) : null;
    
    const handleScroll = () => {
      if (!ticking) {
        // 使用 requestAnimationFrame 确保与显示器同步
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const maxScroll = document.body.scrollHeight - window.innerHeight;
          const scrollProgress = Math.min(currentScrollY / (maxScroll || 1), 1);
          
          // Determine if at top
          setIsScrolled(currentScrollY > 20);

          // Determine Direction (Threshold of 10px to avoid jitter)
          if (Math.abs(currentScrollY - lastScrollY) > 10) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
              setIsNavVisible(false);
            } else {
              setIsNavVisible(true);
            }
            lastScrollY = currentScrollY;
          }

          // Background "若隐若现" - 使用 quickTo 优化性能
          if (quickY && quickOpacity) {
            quickY(currentScrollY * 0.1);
            quickOpacity(0.15 + (scrollProgress * 0.25));
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial Animation & Breathing Effect for Background - 优化版本
  useGSAP(() => {
    // Nav Animation - 使用 force3D 启用 GPU 加速
    gsap.to(navRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.4,
      ease: "power3.out",
      force3D: true,
      willChange: "transform, opacity"
    });

    // Background Breathing (Ghostly effect) - 优化模糊动画
    if (bgRef.current) {
        gsap.to(bgRef.current, {
            filter: 'blur(5px)',
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true
        });
    }
  }, [isNavVisible]);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-rajdhani overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* --- DYNAMIC BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* The Citadel / Station Image */}
        {/* Note: Using a high-res EVE Online Citadel artwork URL. Replace with local path if needed. */}
        <div 
            ref={bgRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform gpu-accelerated"
            style={{ 
                // Using a reliable EVE Citadel wallpaper URL
                backgroundImage: `url('https://images.contentstack.io/v3/assets/blt71c4c37f37d37704/blt6d5257e844502012/5ea74e7c706d991b1d7d07c0/EVE_Online_Citadel_KeyArt_1920x1080.jpg')`,
                opacity: 0.15, // Start very faint
                filter: 'blur(3px)', // Initial Partial Blur
                transform: 'scale(1.1) translate3d(0, 0, 0)', // GPU 加速 + 允许视差移动
                backfaceVisibility: 'hidden',
                perspective: 1000
            }}
        />
        
        {/* Dark Overlay Gradient to ensure text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Tech Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 mix-blend-screen" />
        
        {/* Top Horizon Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
      </div>

      {/* 
         --- FLOATING HUD NAVIGATION --- 
         Centered, Floating, Auto-Hiding 
      */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
        <nav 
            ref={navRef}
            className={`
                pointer-events-auto
                flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-500
                ${isScrolled 
                    ? 'bg-black/70 backdrop-blur-xl border-white/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]' 
                    : 'bg-transparent border-transparent'
                }
            `}
        >
            {/* Left Decorative Cap */}
            <div className={`hidden md:flex items-center gap-2 pl-4 pr-2 border-r border-white/10 mr-2 text-xs font-orbitron text-gray-500 ${isScrolled ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <Activity size={14} className="animate-pulse text-green-500" />
                <span>ONLINE</span>
            </div>

            <div className="flex items-center">
                <NavItem to="/" icon={Home}>Nexus</NavItem>
                
                <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
                
                <a href="#" onClick={(e) => e.preventDefault()} className="group relative flex items-center gap-2 px-4 py-2 font-orbitron text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors cursor-not-allowed">
                    <Download size={14} /> Download
                </a>
                
                <a href="#" onClick={(e) => e.preventDefault()} className="group relative flex items-center gap-2 px-4 py-2 font-orbitron text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors cursor-not-allowed">
                    <Headset size={14} /> Comms
                </a>
            </div>

            {/* Right Action Button */}
            <div className="ml-2 pl-2 border-l border-white/10">
                <button 
                    onClick={handleReload} 
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-all duration-300"
                    title="System Reset"
                >
                    <RefreshCw size={14} />
                </button>
            </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-32 min-h-screen flex flex-col">
         {/* Animated Breadcrumb Mockup - Pushed down slightly */}
        <div className="container mx-auto px-6 mb-4 flex items-center text-[10px] text-cyan-500/60 font-orbitron tracking-widest opacity-80">
            <span className="w-2 h-2 bg-cyan-500/50 rounded-full mr-2 animate-pulse"></span>
            <span>SYSTEM</span>
            <ChevronRight size={10} />
            <span>{location.pathname === '/' ? 'ROOT' : location.pathname.split('/')[1].toUpperCase()}</span>
            {location.pathname.split('/').length > 2 && (
                <>
                    <ChevronRight size={10} />
                    <span>{location.pathname.split('/')[2].toUpperCase()}</span>
                </>
            )}
        </div>

        <Outlet />
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent z-40 pointer-events-none flex justify-between px-8 items-end pb-2 text-[10px] text-gray-600 font-orbitron">
        <span>CONCORD // SECURE CONNECTION</span>
        <span>VERSION 2.4.1 // YC 125</span>
      </div>
    </div>
  );
};