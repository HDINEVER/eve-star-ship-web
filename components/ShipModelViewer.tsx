import React, { useEffect, useRef, useState } from 'react';
import { X, Maximize2, Minimize2, ExternalLink, Loader2 } from 'lucide-react';

interface ShipModelViewerProps {
  isOpen: boolean;
  onClose: () => void;
  modelUrl: string;
  shipName: string;
  shipClass: string;
  factionColor: string;
}

export const ShipModelViewer: React.FC<ShipModelViewerProps> = ({
  isOpen,
  onClose,
  modelUrl,
  shipName,
  shipClass,
  factionColor
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 处理ESC键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, isFullscreen, onClose]);

  // 处理全屏切换
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('全屏切换失败:', err);
    }
  };

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // iframe加载完成
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // 重置加载状态
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, modelUrl]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* 背景遮罩 - 增强效果 */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm">
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(${factionColor}40 1px, transparent 1px),
            linear-gradient(90deg, ${factionColor}40 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        
        {/* 渐变光晕 */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at center, ${factionColor}40 0%, transparent 70%)`
          }}
        />
      </div>
      
      {/* 模态框容器 - 增强科技感 */}
      <div 
        ref={containerRef}
        className={`relative z-10 flex flex-col bg-black/95 shadow-2xl transition-all duration-500 animate-in zoom-in-95 ${
          isFullscreen 
            ? 'w-full h-full rounded-none' 
            : 'w-[95vw] h-[90vh] max-w-7xl rounded-lg'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          border: `2px solid ${factionColor}60`,
          boxShadow: `
            0 0 20px ${factionColor}40,
            0 0 40px ${factionColor}20,
            inset 0 0 60px ${factionColor}10
          `
        }}
      >
        {/* 扫描线效果 */}
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg opacity-30"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${factionColor}20 2px,
              ${factionColor}20 4px
            )`
          }}
        >
          <div 
            className="absolute inset-x-0 h-32 animate-scan"
            style={{
              background: `linear-gradient(to bottom, transparent, ${factionColor}40, transparent)`,
              animation: 'scan 3s linear infinite'
            }}
          />
        </div>
        
        {/* 角落装饰 - 增强版 */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-full border-l-4 border-t-4 animate-pulse"
            style={{ 
              borderColor: factionColor,
              filter: `drop-shadow(0 0 8px ${factionColor})`
            }}
          />
          <div 
            className="absolute top-2 left-2 w-3 h-3 animate-ping will-change-transform"
            style={{ backgroundColor: factionColor }}
          />
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
          <div 
            className="absolute top-0 right-0 w-full h-full border-r-4 border-t-4 animate-pulse"
            style={{ 
              borderColor: factionColor,
              filter: `drop-shadow(0 0 8px ${factionColor})`
            }}
          />
          <div 
            className="absolute top-2 right-2 w-3 h-3 animate-ping will-change-transform"
            style={{ backgroundColor: factionColor }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
          <div 
            className="absolute bottom-0 left-0 w-full h-full border-l-4 border-b-4 animate-pulse"
            style={{ 
              borderColor: factionColor,
              filter: `drop-shadow(0 0 8px ${factionColor})`
            }}
          />
          <div 
            className="absolute bottom-2 left-2 w-3 h-3 animate-ping will-change-transform"
            style={{ backgroundColor: factionColor }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
          <div 
            className="absolute bottom-0 right-0 w-full h-full border-r-4 border-b-4 animate-pulse"
            style={{ 
              borderColor: factionColor,
              filter: `drop-shadow(0 0 8px ${factionColor})`
            }}
          />
          <div 
            className="absolute bottom-2 right-2 w-3 h-3 animate-ping will-change-transform"
            style={{ backgroundColor: factionColor }}
          />
        </div>
        {/* 顶部工具栏 - 增强科技感 */}
        <div 
          className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 border-b backdrop-blur-md shrink-0 relative overflow-hidden"
          style={{ 
            borderColor: `${factionColor}60`,
            background: `linear-gradient(to right, ${factionColor}10, transparent, ${factionColor}10)`,
            boxShadow: `0 2px 20px ${factionColor}20`
          }}
        >
          {/* 顶部装饰线 */}
          <div 
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(to right, transparent, ${factionColor}, transparent)`
            }}
          />
          
          {/* 飞船信息 */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden relative z-10">
            <div 
              className="w-1.5 sm:w-2 h-6 sm:h-8 rounded-full shrink-0 animate-pulse"
              style={{ 
                backgroundColor: factionColor,
                boxShadow: `0 0 10px ${factionColor}, 0 0 20px ${factionColor}80`
              }}
            />
            <div className="overflow-hidden">
              <h2 
                className="text-sm sm:text-xl font-orbitron font-bold truncate"
                style={{ 
                  color: factionColor,
                  textShadow: `0 0 10px ${factionColor}80, 0 0 20px ${factionColor}40`
                }}
              >
                {shipName}
              </h2>
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider truncate font-orbitron">
                {shipClass} • 3D MODEL VIEWER • HOLOGRAPHIC DISPLAY
              </p>
            </div>
          </div>

          {/* 控制按钮 - 增强样式 */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 relative z-10">
            {/* 在新窗口打开 */}
            <button
              onClick={() => window.open(modelUrl, '_blank')}
              className="p-1.5 sm:p-2 rounded-md transition-all text-gray-400 hover:text-white relative group"
              title="在新窗口打开"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <ExternalLink size={16} className="sm:w-5 sm:h-5" />
              <div 
                className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                style={{
                  background: `${factionColor}20`,
                  boxShadow: `0 0 15px ${factionColor}60`
                }}
              />
            </button>
            
            {/* 全屏切换 */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 rounded-md transition-all text-gray-400 hover:text-white relative group"
              title={isFullscreen ? '退出全屏' : '全屏'}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {isFullscreen ? (
                <Minimize2 size={16} className="sm:w-5 sm:h-5" />
              ) : (
                <Maximize2 size={16} className="sm:w-5 sm:h-5" />
              )}
              <div 
                className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                style={{
                  background: `${factionColor}20`,
                  boxShadow: `0 0 15px ${factionColor}60`
                }}
              />
            </button>
            
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-md transition-all text-gray-400 hover:text-red-400 relative group"
              title="关闭 (ESC)"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <X size={16} className="sm:w-5 sm:h-5" />
              <div 
                className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)'
                }}
              />
            </button>
          </div>
        </div>

        {/* iframe容器 - 增强科技感 */}
        <div className="relative flex-1 overflow-hidden bg-black">
          {/* 加载状态 - 增强效果 */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
              {/* 旋转外环 */}
              <div className="relative mb-8">
                <div 
                  className="w-24 h-24 rounded-full border-4 border-transparent animate-spin"
                  style={{
                    borderTopColor: factionColor,
                    borderRightColor: `${factionColor}60`,
                    boxShadow: `0 0 30px ${factionColor}60`
                  }}
                />
                <div 
                  className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent animate-spin"
                  style={{
                    borderBottomColor: factionColor,
                    borderLeftColor: `${factionColor}60`,
                    animationDirection: 'reverse',
                    animationDuration: '2s'
                  }}
                />
                <Loader2 
                  size={48} 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" 
                  style={{ 
                    color: factionColor,
                    filter: `drop-shadow(0 0 10px ${factionColor})`
                  }}
                />
              </div>
              
              <p 
                className="text-lg font-orbitron font-bold tracking-wider animate-pulse mb-2"
                style={{
                  color: factionColor,
                  textShadow: `0 0 10px ${factionColor}80`
                }}
              >
                正在加载3D模型...
              </p>
              <p className="text-xs text-gray-600 font-mono uppercase tracking-widest">
                &gt;&gt; INITIALIZING HOLOGRAPHIC DISPLAY
              </p>
              <p className="text-xs text-gray-700 font-mono mt-1">
                &gt;&gt; QUANTUM RENDERING IN PROGRESS...
              </p>
              
              {/* 加载进度条 */}
              <div className="w-64 h-1 bg-gray-900 rounded-full mt-6 overflow-hidden">
                <div 
                  className="h-full animate-loading-bar rounded-full"
                  style={{
                    backgroundColor: factionColor,
                    boxShadow: `0 0 10px ${factionColor}`
                  }}
                />
              </div>
            </div>
          )}

          {/* 3D模型iframe */}
          <iframe
            ref={iframeRef}
            src={modelUrl}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen"
            allowFullScreen
            title={`${shipName} 3D Model`}
          />

          {/* 装饰性角标 - 增强版 */}
          <div 
            className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 pointer-events-none animate-pulse"
            style={{ 
              borderColor: factionColor,
              filter: `drop-shadow(0 0 5px ${factionColor})`
            }}
          />
          <div 
            className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 pointer-events-none animate-pulse"
            style={{ 
              borderColor: factionColor,
              filter: `drop-shadow(0 0 5px ${factionColor})`
            }}
          />
          <div 
            className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 pointer-events-none animate-pulse"
            style={{ 
              borderColor: factionColor,
              filter: `drop-shadow(0 0 5px ${factionColor})`
            }}
          />
          <div 
            className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 pointer-events-none animate-pulse"
            style={{ 
              borderColor: factionColor,
              filter: `drop-shadow(0 0 5px ${factionColor})`
            }}
          />
          
          {/* 边缘光效 */}
          <div 
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: `linear-gradient(to right, transparent, ${factionColor}60, transparent)`
            }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: `linear-gradient(to right, transparent, ${factionColor}60, transparent)`
            }}
          />
        </div>

        {/* 底部状态栏 - 增强科技感 */}
        <div 
          className="flex items-center justify-between px-3 sm:px-6 py-1.5 sm:py-2 border-t backdrop-blur-md shrink-0 text-[10px] sm:text-xs font-orbitron relative overflow-hidden"
          style={{ 
            borderColor: `${factionColor}60`,
            background: `linear-gradient(to right, ${factionColor}10, transparent, ${factionColor}10)`,
            boxShadow: `0 -2px 20px ${factionColor}20`
          }}
        >
          {/* 底部装饰线 */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(to right, transparent, ${factionColor}, transparent)`
            }}
          />
          
          <span className="flex items-center gap-2 relative z-10">
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ 
                backgroundColor: isLoading ? '#facc15' : '#22c55e',
                boxShadow: isLoading 
                  ? '0 0 8px #facc15, 0 0 15px #facc1580' 
                  : '0 0 8px #22c55e, 0 0 15px #22c55e80'
              }}
            />
            <span 
              className="font-bold tracking-wider"
              style={{
                color: isLoading ? '#facc15' : '#22c55e',
                textShadow: isLoading 
                  ? '0 0 5px #facc1580' 
                  : '0 0 5px #22c55e80'
              }}
            >
              {isLoading ? 'LOADING...' : 'CONNECTED'}
            </span>
            {!isLoading && (
              <span className="text-gray-600 ml-2 hidden sm:inline">
                [SIGNAL: STRONG]
              </span>
            )}
          </span>
          
          <span className="hidden sm:inline text-gray-500 relative z-10 tracking-wider">
            PRESS <span className="text-gray-300 font-bold">ESC</span> TO CLOSE • INTERACTIVE 3D HOLOGRAM
          </span>
          <span className="sm:hidden text-gray-500 relative z-10">
            ESC TO CLOSE
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShipModelViewer;
