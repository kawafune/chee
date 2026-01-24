import { useState, useRef } from 'react';
import { MapPin, MousePointer2, ZoomIn, ZoomOut } from 'lucide-react';
import { MAP_PATHS } from '../MapData';
import { allVideosData } from '../data';

export const JapanMap = ({ onSelectPrefecture }: any) => {
  const activePrefs = Array.from(new Set(allVideosData.map((v: any) => v.location.substring(0, 2))));
  
  // --- 状態管理 ---
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 地図の位置
  const [scale, setScale] = useState(1);                // 拡大率
  const [isDragging, setIsDragging] = useState(false);  // ドラッグ中かどうか
  const [cursor, setCursor] = useState('cursor-grab');  // カーソルの見た目

  // --- 内部変数 (Ref) ---
  const lastPos = useRef({ x: 0, y: 0 });
  const lastDist = useRef<number | null>(null);         // ピンチ操作用の距離
  const isClick = useRef(false);

  // ピンの座標を取得する関数
  const getPinPosition = (d: string) => {
    const match = d.match(/M\s*([\d\.]+)[,\s]+([\d\.]+)/);
    return match ? { x: parseFloat(match[1]), y: parseFloat(match[2]) } : { x: 0, y: 0 };
  };

  // --- ズーム機能 ---
  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(prev + delta, 0.5), 8)); // 0.5倍〜8倍まで制限
  };

  // 1. ホイールズーム (PC)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomAmount = -e.deltaY * 0.001;
    handleZoom(zoomAmount);
  };

  // 2. ドラッグ開始
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    isClick.current = true;
    setCursor('cursor-grabbing');
    lastPos.current = { x: clientX, y: clientY };
  };

  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastDist.current = dist; // ★修正: setLastDist -> lastDist.current
      setIsDragging(false);
    } else {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // 3. ドラッグ & ピンチ操作中
  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const deltaX = clientX - lastPos.current.x;
    const deltaY = clientY - lastPos.current.y;

    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) isClick.current = false;

    setOffset(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
    lastPos.current = { x: clientX, y: clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
  
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastDist.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const zoomChange = (dist - lastDist.current) * 0.01;
      handleZoom(zoomChange);
      lastDist.current = dist; // ★修正: setLastDist -> lastDist.current
      return;
    }
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  // 4. 操作終了
  const handleEnd = () => {
    setIsDragging(false);
    setCursor('cursor-grab');
    lastDist.current = null; // ★修正: setLastDist -> lastDist.current
  };

  // 5. クリック処理
  const handlePrefClick = (prefName: string, e: any) => {
    if (!isClick.current) return;
    e.stopPropagation();
    onSelectPrefecture(prefName);
  };

  return (
    <div className={`w-full h-full overflow-hidden bg-slate-100 relative ${cursor}`}
         onMouseDown={onMouseDown}
         onMouseMove={onMouseMove}
         onMouseUp={handleEnd}
         onMouseLeave={handleEnd}
         onTouchStart={onTouchStart}
         onTouchMove={onTouchMove}
         onTouchEnd={handleEnd}
         onWheel={handleWheel}
    >
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 items-start">
        <div className="bg-white/80 backdrop-blur px-3 py-2 rounded-lg shadow-sm text-xs text-slate-500 pointer-events-none flex items-center gap-2">
          <MousePointer2 size={16} className="text-slate-400" />
          移動・拡大
        </div>
        <div className="flex flex-col bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
          <button className="p-2 hover:bg-slate-50 border-b border-slate-100 transition-colors" onClick={(e) => { e.stopPropagation(); handleZoom(0.2); }}>
            <ZoomIn size={20} className="text-slate-600"/>
          </button>
          <button className="p-2 hover:bg-slate-50 transition-colors" onClick={(e) => { e.stopPropagation(); handleZoom(-0.2); }}>
            <ZoomOut size={20} className="text-slate-600"/>
          </button>
        </div>
      </div>

      <svg className="w-full h-full touch-none" viewBox="0 0 1000 1000">
        <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
          <g transform="translate(-100, -100)">
            {MAP_PATHS.map((pref, i) => {
              const isActive = activePrefs.some(p => pref.name.startsWith(p));
              const pinPos = getPinPosition(pref.d || "");
              
              return (
                <g 
                  key={i}
                  onClick={(e) => isActive && handlePrefClick(pref.name.substring(0, 2), e)}
                  onTouchEnd={(e) => isActive && handlePrefClick(pref.name.substring(0, 2), e)}
                  className={`transition-colors duration-300 ${isActive ? 'cursor-pointer hover:opacity-80' : 'fill-white stroke-slate-300'}`}
                  transform={(pref as any).transform}
                >
                  <path d={pref.d} fill={isActive ? "#ccfbf1" : "#ffffff"} stroke="#64748b" strokeWidth={1 / scale} /> 
                  
                  {isActive && pinPos.x !== 0 && (
                    <g transform={`translate(${pinPos.x + 10}, ${pinPos.y + 10}) scale(${0.9 / scale})`}>
                      <circle cx="0" cy="0" r="14" fill="#0d9488" className="animate-pulse opacity-70" />
                      <circle cx="0" cy="0" r="6" fill="white" />
                      <MapPin size={24} className="text-teal-700 -translate-x-3 -translate-y-5 drop-shadow-md" fill="currentColor" />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
};