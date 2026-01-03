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
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      {/* 模态框容器 */}
      <div 
        ref={containerRef}
        className={`relative z-10 flex flex-col bg-black/95 border border-white/20 shadow-2xl transition-all duration-300 ${
          isFullscreen 
            ? 'w-full h-full rounded-none' 
            : 'w-[95vw] h-[90vh] max-w-7xl rounded-lg'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部工具栏 */}
        <div 
          className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 border-b border-white/10 bg-black/80 backdrop-blur-md shrink-0"
          style={{ borderColor: `${factionColor}40` }}
        >
          {/* 飞船信息 */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
            <div 
              className="w-1.5 sm:w-2 h-6 sm:h-8 rounded-full shrink-0"
              style={{ backgroundColor: factionColor }}
            />
            <div className="overflow-hidden">
              <h2 
                className="text-sm sm:text-xl font-orbitron font-bold truncate"
                style={{ color: factionColor }}
              >
                {shipName}
              </h2>
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider truncate">
                {shipClass} • 3D MODEL VIEWER
              </p>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* 在新窗口打开 */}
            <button
              onClick={() => window.open(modelUrl, '_blank')}
              className="p-1.5 sm:p-2 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              title="在新窗口打开"
            >
              <ExternalLink size={16} className="sm:w-5 sm:h-5" />
            </button>
            
            {/* 全屏切换 */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              title={isFullscreen ? '退出全屏' : '全屏'}
            >
              {isFullscreen ? (
                <Minimize2 size={16} className="sm:w-5 sm:h-5" />
              ) : (
                <Maximize2 size={16} className="sm:w-5 sm:h-5" />
              )}
            </button>
            
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-md hover:bg-red-500/20 transition-colors text-gray-400 hover:text-red-400"
              title="关闭 (ESC)"
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* iframe容器 */}
        <div className="relative flex-1 overflow-hidden bg-black">
          {/* 加载状态 */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
              <Loader2 
                size={48} 
                className="animate-spin mb-4" 
                style={{ color: factionColor }}
              />
              <p className="text-sm text-gray-400 font-orbitron">
                正在加载3D模型...
              </p>
              <p className="text-xs text-gray-600 mt-2">
                INITIALIZING HOLOGRAPHIC DISPLAY
              </p>
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

          {/* 装饰性角标 */}
          <div 
            className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 pointer-events-none opacity-50"
            style={{ borderColor: factionColor }}
          />
          <div 
            className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 pointer-events-none opacity-50"
            style={{ borderColor: factionColor }}
          />
          <div 
            className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 pointer-events-none opacity-50"
            style={{ borderColor: factionColor }}
          />
          <div 
            className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 pointer-events-none opacity-50"
            style={{ borderColor: factionColor }}
          />
        </div>

        {/* 底部状态栏 */}
        <div 
          className="flex items-center justify-between px-3 sm:px-6 py-1.5 sm:py-2 border-t border-white/10 bg-black/80 backdrop-blur-md shrink-0 text-[10px] sm:text-xs font-orbitron text-gray-500"
          style={{ borderColor: `${factionColor}40` }}
        >
          <span className="flex items-center gap-2">
            <span 
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: isLoading ? '#facc15' : '#22c55e' }}
            />
            {isLoading ? 'LOADING...' : 'CONNECTED'}
          </span>
          <span className="hidden sm:inline">PRESS ESC TO CLOSE • INTERACTIVE 3D</span>
          <span className="sm:hidden">ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};

export default ShipModelViewer;
