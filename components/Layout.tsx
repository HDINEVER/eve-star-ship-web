import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Download, Headset, Pin, ChevronRight, Activity } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useModal } from '../contexts/ModalContext';

// 设备自适应性能配置
const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 根据设备类型调整帧率：移动端 60fps，桌面 144fps
gsap.ticker.fps(isMobileDevice ? 60 : 144);
gsap.ticker.lagSmoothing(isMobileDevice ? 500 : 0);
gsap.config({ force3D: true });

const NavItem = ({ to, icon: Icon, children, end }: { to: string; icon: any; children?: React.ReactNode; end?: boolean }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `relative flex items-center gap-2 px-4 py-2 font-orbitron text-xs font-bold uppercase tracking-widest transition-all duration-300 group overflow-hidden rounded-sm
       active:scale-95 active:bg-cyan-900/40 touch-manipulation
      ${isActive 
        ? 'text-cyan-400 bg-cyan-900/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`
    }
  >
    {({ isActive }) => (
      <>
        {/* Hover/Active Glitch Line (Desktop) */}
        <span className={`absolute left-0 top-0 w-[2px] h-full bg-cyan-400 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
        
        {/* Scanline Effect (Hover) */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out pointer-events-none" />

        <Icon size={14} className={`transition-transform duration-300 ${isActive ? 'scale-110 shadow-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' : 'group-hover:scale-110 group-active:scale-95'}`} />
        <span>{children}</span>
        
        {/* Active Glow Bottom */}
        <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
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
  const [isNavPinned, setIsNavPinned] = useState(true);
  const [isNavHovered, setIsNavHovered] = useState(false);

  // Get modal state from context
  const { isModalOpen } = useModal();

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
          // 只在未固定状态下响应滚动隐藏
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
    // 固定状态或悬停时显示，否则根据滚动状态显示
    // 如果模态框打开，则隐藏导航栏
    const shouldShow = !isModalOpen && (isNavPinned || isNavHovered || isNavVisible);
    gsap.to(navRef.current, {
      y: shouldShow ? 0 : -100,
      opacity: shouldShow ? 1 : 0,
      duration: 0.4,
      ease: "power3.out",
      force3D: true,
      willChange: "transform, opacity"
    });

    // Background Breathing (Ghostly effect) - 全设备启用动画，通过帧率控制性能
    if (bgRef.current && !prefersReducedMotion) {
        gsap.to(bgRef.current, {
            scale: isMobileDevice ? 1.03 : 1.08, // 移动端幅度稍小
            duration: isMobileDevice ? 30 : 25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true // 强制 GPU 加速
        });
    }

    // 浮动高斯模糊层动画 - 保留动画但确保 GPU 加速
    if (!prefersReducedMotion) {
        // 移动端也保留动画，依靠 GSAP 的 60fps 限制和 force3D 优化性能
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
    }
  }, [isNavVisible, isNavPinned, isNavHovered, isModalOpen]);

  const togglePin = () => {
    setIsNavPinned(!isNavPinned);
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-rajdhani overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* ... (Background layers remain the same, ommitted for brevity if using replace, but replacing Layout logic so need to keep structure) ... */}
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
        
        <div 
            ref={blurLayer1Ref}
            className="absolute w-[60vw] h-[60vw] rounded-full will-change-transform"
            style={{
                top: '-10%',
                right: '-10%',
                background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)',
                filter: isMobileDevice ? 'none' : 'blur(80px)', // 桌面端启用模糊，移动端禁用
                transform: 'translate3d(0, 0, 0)',
            }}
        />
        
        <div 
            ref={blurLayer2Ref}
            className="absolute w-[50vw] h-[50vw] rounded-full will-change-transform"
            style={{
                bottom: '-15%',
                left: '-10%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
                filter: isMobileDevice ? 'none' : 'blur(100px)', // 桌面端启用模糊，移动端禁用
                transform: 'translate3d(0, 0, 0)',
            }}
        />
        
        <div 
            ref={blurLayer3Ref}
            className="absolute w-[40vw] h-[40vw] rounded-full will-change-transform"
            style={{
                top: '40%',
                left: '30%',
                background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)',
                filter: isMobileDevice ? 'none' : 'blur(60px)', // 桌面端启用模糊，移动端禁用
                transform: 'translate3d(0, 0, 0)',
            }}
        />

        {/* 额外的动态光点 */}
        <div className="absolute w-[30vw] h-[30vw] rounded-full animate-pulse"
            style={{
                top: '20%',
                right: '20%',
                background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)',
                filter: isMobileDevice ? 'none' : 'blur(40px)', // 桌面端启用模糊，移动端禁用
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
        
        {/* 底部发光线 - removed fixed bottom line since footer is now static at bottom of content */}
        {/* <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" /> */}
      </div>

      {/* 
         --- FLOATING HUD NAVIGATION --- 
         Centered, Floating, Auto-Hiding 
      */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6 pointer-events-none"
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
      >
        <nav 
            ref={navRef}
            className={`
                pointer-events-auto
                flex items-center gap-1 px-3 py-2 sm:px-2 rounded-full border transition-all duration-500
                ${isScrolled 
                    ? 'bg-black/80 backdrop-blur-xl border-white/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]' 
                    : 'bg-transparent border-transparent'
                }
            `}
        >
            {/* Left Decorative Cap */}
            <div className={`hidden md:flex items-center gap-2 pl-4 pr-2 border-r border-white/10 mr-2 text-xs font-orbitron text-gray-500 ${isScrolled ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <Activity size={14} className="animate-pulse text-green-500" />
                <span>ONLINE</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-0">
                <NavItem to="/" icon={Home} end>Nexus</NavItem>
                
                <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
                
                {/* Official Website */}
                <a 
                  href="https://www.eveonline.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 font-orbitron text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-sm"
                  title="Official Site"
                >
                    <Activity size={14} className="group-hover:scale-110 transition-transform duration-300" /> 
                    <span className="hidden sm:inline">Official Site</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                
                {/* Download Game */}
                <a 
                  href="https://www.eveonline.com/download" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 font-orbitron text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-sm"
                  title="Download"
                >
                    <Download size={14} className="group-hover:scale-110 transition-transform duration-300" /> 
                    <span className="hidden sm:inline">Download</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
            </div>

            {/* Right Action Button - 固定/取消固定导航栏 */}
            <div className="ml-2 pl-2 border-l border-white/10">
                <button 
                    onClick={togglePin} 
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                        isNavPinned 
                            ? 'bg-cyan-500/20 text-cyan-400' 
                            : 'bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400'
                    }`}
                    title={isNavPinned ? "Unpin Navigation" : "Pin Navigation"}
                >
                    <Pin size={14} className={`transition-transform duration-300 ${isNavPinned ? 'rotate-45' : ''}`} />
                </button>
            </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-28 sm:pt-32 min-h-screen flex flex-col pb-20">
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

      {/* Footer Decoration & Credits - Now STATIC relative to document flow (not fixed) */}
      {/* Hide when modal is open */}
      {!isModalOpen && (
      <div className="relative z-40 w-full border-t border-white/5 mt-auto bg-gradient-to-t from-black/60 to-transparent">
        <div className="container mx-auto px-6 py-8 flex flex-col items-center justify-center gap-4">
            
            {/* Credits Bar */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-[10px] sm:text-xs text-gray-500 font-orbitron tracking-wider">
                <span className="flex items-center gap-2">
                    <span className="text-gray-600">ARCHITECT</span> 
                    <a href="https://github.com/HDINEVER" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-300 transition-colors">HDINEVER</a>
                </span>
                <span className="text-gray-800">|</span>
                <span className="flex items-center gap-2">
                    <span className="text-gray-600">DESIGN</span> 
                    <span className="text-gray-400">墨羽辰</span>
                </span>
                <span className="text-gray-800">|</span>
                <span className="flex items-center gap-2">
                    <span className="text-gray-600">CONTRIBUTOR</span> 
                    <span className="text-gray-400">悠子</span>
                </span>
            </div>

            {/* System Info */} 
            <div className="flex items-center gap-2 text-[9px] text-gray-700 font-orbitron tracking-widest opacity-60">
                <span>CONCORD // SECURE CONNECTION</span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span>YC 125</span>
            </div>
            
        </div>
        
        {/* Bottom glowing line decoration */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />
      </div>
      )}
    </div>
  );
};