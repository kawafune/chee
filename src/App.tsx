import { useState } from 'react';
import { MapPin, Map as MapIcon, Lock, Play, Search, LayoutGrid, ChevronRight, Heart, Calendar, ExternalLink } from 'lucide-react';
import { Header } from './components/Navigation';
import { BecomeInstructorPage, RegisterPage, PrivacyPage, MyPage } from './components/Pages';
import { JapanMap } from './components/JapanMap';
import { VideoPlayer } from './components/VideoPlayer';
import { categories, instructorsData, allVideosData } from './data';

export default function ChiikuriApp() {
  const [view, setView] = useState<'home' | 'map' | 'register' | 'become-instructor' | 'privacy' | 'mypage'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [selectedPrefVideos, setSelectedPrefVideos] = useState<any[]>([]);
  const [playingVideo, setPlayingVideo] = useState<any>(null);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);

  // ユーザー情報
  const [userInfo, setUserInfo] = useState({
    name: "ちぃくり 太郎",
    region: "東京都杉並区",
    icon: "https://placehold.co/150x150/0d9488/ffffff?text=User",
    followedInstructors: [] as string[]
  });

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedVideos(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans relative">
      <Header setView={setView} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} notifications={notifications} setNotifications={setNotifications} />
      
      {/* 動画プレーヤー (ポップアップ/モーダルとして表示) */}
      {playingVideo && (
        <VideoPlayer 
          video={playingVideo} 
          onClose={() => setPlayingVideo(null)} 
          likedVideos={likedVideos} 
          toggleLike={toggleLike} 
          setView={setView} 
        />
      )}

      <main className="flex-grow">
        {/* 通常画面コンテンツ */}
        {view === 'home' && (
          <>
            {/* ヒーローセクション */}
            <div className="bg-slate-900 text-white animate-in fade-in">
              <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">地域の「技」と「心」に出逢う</h1>
                <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">日本中の公民館や教室で行われている素晴らしい授業を、あなたの手のひらに。</p>
                <div className="max-w-2xl mx-auto relative group">
                  <input type="text" placeholder="興味のあること、地域名、講師名でさがす..." className="w-full pl-12 pr-24 py-4 rounded-full text-slate-800 focus:outline-none focus:ring-4 focus:ring-teal-500/50 shadow-2xl text-lg transition-all" />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-teal-500 transition" size={24} />
                  <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 rounded-full font-bold hover:shadow-lg hover:scale-105 transition">検索</button>
                </div>
              </div>
            </div>

            {/* 動画リスト */}
            <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
              {categories.map(cat => (
                <section key={cat} className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3"><LayoutGrid className="text-teal-500" size={28} /> {cat}</h2>
                    <a href="#" className="text-teal-600 font-bold flex items-center gap-1 hover:text-teal-800 transition">もっと見る <ChevronRight size={18} /></a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allVideosData.filter(v => v.category === cat).map(v => {
                      const instructor = instructorsData[v.instructor as keyof typeof instructorsData];
                      return (
                      <div key={v.id} onClick={() => setPlayingVideo(v)} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                    )})}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}

        {view === 'map' && (
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
                  <div key={v.id} className="group flex gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition" onClick={() => setPlayingVideo(v)}>
                    <img src={v.image} className="w-20 h-14 rounded-lg object-cover group-hover:shadow-md transition" alt={v.title} />
                    <div><p className="text-sm font-bold line-clamp-2 group-hover:text-teal-700 transition">{v.title}</p><p className="text-xs text-slate-500 mt-1">{v.instructor}</p></div>
                  </div>
                ))}</div>
              ) : <div className="text-center text-slate-400 py-12 opacity-50"><MapIcon size={64} className="mx-auto mb-4"/><p>地図を選択してください</p></div>}
            </div>
          </div>
        )}

        {view === 'mypage' && <MyPage userInfo={userInfo} setUserInfo={setUserInfo} allVideosData={allVideosData} likedVideos={likedVideos} toggleLike={toggleLike} setView={setView} setPlayingVideo={setPlayingVideo} />}
        {view === 'register' && <RegisterPage setView={setView} />}
        {view === 'become-instructor' && <BecomeInstructorPage />}
        {view === 'privacy' && <PrivacyPage />}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 p-12 text-center font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          <img src="/chiicri_logo.png" alt="ちぃくり" className="h-10 mx-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition" />
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-600">
            <button onClick={() => setView('privacy')} className="hover:text-teal-600 transition">プライバシーポリシー</button>
            <a href="https://happiino.com/about" target="_blank" rel="noreferrer" className="hover:text-teal-600 transition flex items-center gap-1">運営会社: 合同会社Happiino <ExternalLink size={14}/></a>
            <a href="#" className="hover:text-teal-600 transition">お問い合わせ</a>
          </div>
          <p className="text-xs text-slate-400">© 2026 Happiino LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}