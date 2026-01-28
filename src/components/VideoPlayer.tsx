import { X, Lock, Play, Clock, Calendar, MapPin, Heart, Share2, ExternalLink } from 'lucide-react';
import { instructorsData } from '../data';

// ★ onRequireAuth を受け取る
export const VideoPlayer = ({ video, onClose, likedVideos, toggleLike, setView, onRequireAuth }: any) => {
  if (!video) return null;

  const instructor = instructorsData[video.instructor];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-slate-900 w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] rounded-none md:rounded-2xl shadow-2xl overflow-y-auto relative flex flex-col animate-in zoom-in-95 duration-200">
        
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={onClose} 
            className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="aspect-video w-full bg-black relative shrink-0">
          <img src={video.image} className="w-full h-full object-cover opacity-50" alt="thumbnail" />
          
          {video.isPremium ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/60 backdrop-blur-sm">
              <Lock className="w-10 h-10 md:w-16 md:h-16 text-yellow-400 mb-2 md:mb-6 drop-shadow-lg" />
              <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-white">この動画は会員限定です</h3>
              <p className="text-slate-300 mb-4 md:mb-8 text-xs md:text-lg max-w-lg">
                月額会員になると、{video.instructor}先生のすべての動画が見放題になります。
              </p>
              <button 
                onClick={onRequireAuth} // ★ここ
                className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-sm md:text-xl font-bold px-6 py-2 md:px-10 md:py-4 rounded-full shadow-lg hover:scale-105 transition transform"
              >
                今すぐ無料体験を始める
              </button>
            </div>
          ) : (
            <div 
              onClick={onRequireAuth} // ★ここ
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition duration-300 border-2 border-white/50">
                <Play className="fill-white text-white translate-x-1" size={32} />
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm font-mono text-white">
                再生中: 00:00 / {video.duration}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-900">
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 text-teal-400 font-bold mb-2">
                <span className="bg-teal-900/50 px-3 py-1 rounded text-xs border border-teal-700">{video.category}</span>
                <span className="flex items-center gap-1 text-xs"><Clock size={14}/> {video.duration}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-white">{video.title}</h1>
              <div className="flex items-center gap-6 text-slate-400 text-sm">
                <span className="flex items-center gap-1"><Calendar size={16}/> 公開: {video.date}</span>
                <span className="flex items-center gap-1"><MapPin size={16}/> {video.location}</span>
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h3 className="font-bold text-lg mb-2 text-slate-200">動画の概要</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">{video.description}</p>
            </div>

            <div className="flex gap-4">
              <button onClick={(e) => toggleLike(e, video.id)} className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${likedVideos.includes(video.id) ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                <Heart size={20} fill={likedVideos.includes(video.id) ? "currentColor" : "none"} />
                {likedVideos.includes(video.id) ? 'お気に入り済み' : 'お気に入り'}
              </button>
              <button 
                onClick={onRequireAuth} // ★ここ
                className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              >
                <Share2 size={20} /> シェアする
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <img src={instructor?.image} className="w-16 h-16 rounded-full border-2 border-slate-600" />
                <div>
                  <div className="text-xs text-teal-400 font-bold mb-1">INSTRUCTOR</div>
                  <h3 className="font-bold text-lg text-white">{video.instructor}</h3>
                  <p className="text-xs text-slate-400">{instructor?.title}</p>
                </div>
              </div>
              <button 
                onClick={() => { onClose(); onRequireAuth(); }} // ★ここ
                className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-bold transition"
              >
                プロフィールを見る
              </button>
            </div>

            <div className="bg-gradient-to-br from-teal-900 to-emerald-900 p-6 rounded-2xl border border-teal-700/50 shadow-lg">
              <h3 className="font-bold text-lg mb-2 text-white">教室に行ってみる？</h3>
              <p className="text-teal-200 text-sm mb-4">動画の先生から直接習うことができます。体験予約はこちらから。</p>
              <button 
                onClick={onRequireAuth} // ★ここ
                className="w-full bg-white text-teal-900 font-bold py-3 rounded-xl hover:bg-teal-50 transition flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} /> 教室を予約する
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};