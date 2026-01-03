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
  const bgRef = useRef<HTMLDivElement>(null);
  const blurLayer1Ref = useRef<HTMLDivElement>(null);
  const blurLayer2Ref = useRef<HTMLDivElement>(null);
  const blurLayer3Ref = useRef<HTMLDivElement>(null);
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
            quickY(currentScrollY * 0.08);
            quickOpacity(0.35 + (scrollProgress * 0.2)); // 提高基础透明度
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

    // Background Breathing (Ghostly effect) - 优化动画更加明显
    if (bgRef.current) {
        // 主背景缓慢缩放
        gsap.to(bgRef.current, {
            scale: 1.08,
            duration: 25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true
        });
    }

    // 浮动高斯模糊层动画
    if (blurLayer1Ref.current) {
        gsap.to(blurLayer1Ref.current, {
            x: 100,
            y: -50,
            scale: 1.2,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true
        });
    }
    if (blurLayer2Ref.current) {
        gsap.to(blurLayer2Ref.current, {
            x: -80,
            y: 60,
            scale: 0.9,
            duration: 18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true
        });
    }
    if (blurLayer3Ref.current) {
        gsap.to(blurLayer3Ref.current, {
            x: 50,
            y: 80,
            scale: 1.1,
            duration: 22,
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
        
        {/* 主背景图片层 */}
        <div 
            ref={bgRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform gpu-accelerated"
            style={{ 
                backgroundImage: `
                  url('/bg-main.webp'),
                  url('https://images.contentstack.io/v3/assets/blt71c4c37f37d37704/blt6d5257e844502012/5ea74e7c706d991b1d7d07c0/EVE_Online_Citadel_KeyArt_1920x1080.jpg'),
                  linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)
                `,
                opacity: 0.5,
                transform: 'scale(1.1) translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
            }}
        />

        {/* === 浮动高斯模糊层 - 高级视觉效果 === */}
        
        {/* 模糊层 1 - 青色光晕 */}
        <div 
            ref={blurLayer1Ref}
            className="absolute w-[60vw] h-[60vw] rounded-full will-change-transform"
            style={{
                top: '-10%',
                right: '-10%',
                background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)',
                filter: 'blur(80px)',
                transform: 'translate3d(0, 0, 0)',
            }}
        />
        
        {/* 模糊层 2 - 紫色光晕 */}
        <div 
            ref={blurLayer2Ref}
            className="absolute w-[50vw] h-[50vw] rounded-full will-change-transform"
            style={{
                bottom: '-15%',
                left: '-10%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
                filter: 'blur(100px)',
                transform: 'translate3d(0, 0, 0)',
            }}
        />
        
        {/* 模糊层 3 - 蓝色光晕 */}
        <div 
            ref={blurLayer3Ref}
            className="absolute w-[40vw] h-[40vw] rounded-full will-change-transform"
            style={{
                top: '40%',
                left: '30%',
                background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)',
                filter: 'blur(60px)',
                transform: 'translate3d(0, 0, 0)',
            }}
        />

        {/* 额外的动态光点 */}
        <div className="absolute w-[30vw] h-[30vw] rounded-full animate-pulse"
            style={{
                top: '20%',
                right: '20%',
                background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)',
                filter: 'blur(40px)',
            }}
        />
        
        {/* 暗色渐变覆盖层 - 确保文字可读性 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* 细微噪点纹理 - 增加质感 */}
        <div className="absolute inset-0 opacity-[0.02]" 
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
        />

        {/* Tech Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 mix-blend-screen" />
        
        {/* 顶部发光线 */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        
        {/* 底部发光线 */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
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