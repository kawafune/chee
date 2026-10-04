import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Header } from './components/Navigation';
import { BecomeInstructorPage, RegisterPage, PrivacyPage, MyPage } from './components/Pages';
import { VideoPlayer } from './components/VideoPlayer';
import { ComingSoonModal } from './components/ComingSoonModal';
import { Hero } from './components/Hero';
import { VideoList } from './components/VideoList';
import { MapPage } from './components/MapPage';
import type { UserInfo, Video, View } from './types';
import { LOGO_URL } from './lib/assets';

export default function ChiikuriApp() {
  const [showNotice, setShowNotice] = useState(false);
  const [view, setView] = useState<View>('home');
  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "ちぃくり 太郎",
    region: "東京都杉並区",
    icon: "https://placehold.co/150x150/0d9488/ffffff?text=User",
    followedInstructors: []
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);

  // --- 未実装機能の案内 ---
  const showComingSoon = () => setShowNotice(true);

  // --- アクション制御 ---
  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedVideos(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans relative">
      <Header setView={setView} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} notifications={notifications} setNotifications={setNotifications} />
      
      {showNotice && <ComingSoonModal onClose={() => setShowNotice(false)} />}

      {playingVideo && (
        <VideoPlayer 
          video={playingVideo} 
          onClose={() => setPlayingVideo(null)} 
          likedVideos={likedVideos} 
          toggleLike={toggleLike} 
          onComingSoon={showComingSoon}
        />
      )}

      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero onComingSoon={showComingSoon} />
            <VideoList 
              setPlayingVideo={setPlayingVideo}
              toggleLike={toggleLike}
              likedVideos={likedVideos}
            />
          </>
        )}

        {view === 'map' && <MapPage setPlayingVideo={setPlayingVideo} />}
        
        {view === 'mypage' && <MyPage userInfo={userInfo} setUserInfo={setUserInfo} likedVideos={likedVideos} toggleLike={toggleLike} setView={setView} setPlayingVideo={setPlayingVideo} />}
        
        {view === 'register' && <RegisterPage setView={setView} onComingSoon={showComingSoon} />}
        
        {view === 'become-instructor' && <BecomeInstructorPage />}
        {view === 'privacy' && <PrivacyPage />}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 p-12 text-center font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          <img src={LOGO_URL} alt="ちぃくり" className="h-10 mx-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition" />
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