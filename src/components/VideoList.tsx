import { LayoutGrid, ChevronRight, Lock, Play, MapPin, Calendar, Heart } from 'lucide-react';
import { categories, allVideosData, instructorsData } from '../data';

export const VideoList = ({ setPlayingVideo, toggleLike, likedVideos }: any) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
      {categories.map(cat => (
        <section key={cat} className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
              <LayoutGrid className="text-teal-500" size={28} /> {cat}
            </h2>
            <a href="#" className="text-teal-600 font-bold flex items-center gap-1 hover:text-teal-800 transition">
              もっと見る <ChevronRight size={18} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allVideosData.filter(v => v.category === cat).map(v => {
              const instructor = instructorsData[v.instructor as keyof typeof instructorsData];
              return (
                <div key={v.id} onClick={() => { setPlayingVideo(v); }} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video bg-slate-200 relative overflow-hidden">
                    <img src={v.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={v.title} />
                    {v.isPremium && <div className="absolute top-3 right-3 bg-slate-900/60 backdrop-blur-sm p-1.5 rounded-full"><Lock size={16} className="text-yellow-400" /></div>}
                    <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1"><Play size={10} fill="currentColor"/>{v.duration}</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-lg text-slate-800 line-clamp-2 leading-snug group-hover:text-teal-700 transition">{v.title}</h3>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                        <img src={instructor?.image || "/api/placeholder/32/32"} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt={v.instructor}/>
                        <span>{v.instructor}</span>
                      </div>
                      <button onClick={(e) => toggleLike(e, v.id)} className="text-slate-300 hover:text-pink-500 transition hover:scale-110">
                        <Heart size={20} fill={likedVideos.includes(v.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium border-t pt-3">
                      <span className="flex items-center gap-1 text-teal-600"><MapPin size={14} /> {v.location}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {v.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};