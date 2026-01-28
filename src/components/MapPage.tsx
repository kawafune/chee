import { useState } from 'react';
import { MapPin, Map as MapIcon } from 'lucide-react';
import { JapanMap } from './JapanMap';
import { allVideosData } from '../data';

export const MapPage = ({ setPlayingVideo }: any) => {
  const [selectedPrefVideos, setSelectedPrefVideos] = useState<any[]>([]);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row font-sans">
      <div className="flex-grow bg-slate-200 relative overflow-hidden cursor-default shadow-inner">
        <JapanMap onSelectPrefecture={(pref: string) => {
          setSelectedPrefVideos(allVideosData.filter(v => v.location.includes(pref.substring(0, 2))));
        }} />
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl text-sm text-slate-600 shadow-lg pointer-events-none flex items-center gap-2">
          <MapPin className="text-teal-500" size={18}/> ドラッグ・ピンチ操作で移動・拡大
        </div>
      </div>
      <div className="w-full md:w-96 bg-white p-6 overflow-y-auto border-l shadow-2xl z-10 relative">
        <h2 className="font-bold text-xl mb-6 flex items-center gap-2 text-slate-800"><MapIcon className="text-teal-500" size={24}/> 地域から探す</h2>
        {selectedPrefVideos.length > 0 ? (
          <div className="space-y-4 animate-in slide-in-from-right">
            <div className="flex justify-between items-center border-b pb-2"><h3 className="font-bold text-lg">{selectedPrefVideos[0].location.substring(0,2)}の教室</h3><button onClick={()=>setSelectedPrefVideos([])} className="text-xs text-slate-400">クリア</button></div>
            {selectedPrefVideos.map(v => (
            <div key={v.id} className="group flex gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition" onClick={() => { setPlayingVideo(v); }}>
              <img src={v.image} className="w-20 h-14 rounded-lg object-cover group-hover:shadow-md transition" alt={v.title} />
              <div><p className="text-sm font-bold line-clamp-2 group-hover:text-teal-700 transition">{v.title}</p><p className="text-xs text-slate-500 mt-1">{v.instructor}</p></div>
            </div>
          ))}</div>
        ) : <div className="text-center text-slate-400 py-12 opacity-50"><MapIcon size={64} className="mx-auto mb-4"/><p>地図を選択してください</p></div>}
      </div>
    </div>
  );
};