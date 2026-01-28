import { useState, useEffect } from 'react';
import { ExternalLink, LogOut } from 'lucide-react';
import { Header } from './components/Navigation';
import { BecomeInstructorPage, RegisterPage, PrivacyPage, MyPage } from './components/Pages';
import { VideoPlayer } from './components/VideoPlayer';
import { LoginModal } from './components/Auth';
import { Hero } from './components/Hero';
import { VideoList } from './components/VideoList';
import { MapPage } from './components/MapPage';
import { instructorsData, allVideosData } from './data';

export default function ChiikuriApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [view, setView] = useState<'home' | 'map' | 'register' | 'become-instructor' | 'privacy' | 'mypage'>('home');
  
  // ユーザー情報
  const [userInfo, setUserInfo] = useState({
    name: "ちぃくり 太郎",
    region: "東京都杉並区",
    icon: "https://placehold.co/150x150/0d9488/ffffff?text=User",
    followedInstructors: [] as string[]
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [playingVideo, setPlayingVideoState] = useState<any>(null);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);

  // --- 認証ロジック (24時間ルール) ---
  useEffect(() => {
    const savedAuth = localStorage.getItem('chiicri_auth');
    if (savedAuth) {
      try {
        const { timestamp } = JSON.parse(savedAuth);
        if (new Date().getTime() - timestamp < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('chiicri_auth');
        }
      } catch (e) {
        localStorage.removeItem('chiicri_auth');
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('chiicri_auth', JSON.stringify({ timestamp: new Date().getTime() }));
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('chiicri_auth');
    alert("ログアウトしました。機能制限が有効になります。");
    setView('home');
  };

  // ★追加: 汎用的な認証チェック関数
  const handleRequireAuth = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  };

  // --- アクションの制御 ---
  const setPlayingVideo = (video: any) => {
    setPlayingVideoState(video);
  };

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setLikedVideos(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans relative">
      <Header setView={setView} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} notifications={notifications} setNotifications={setNotifications} />
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLoginSuccess} 
        />
      )}

      {playingVideo && (
        <VideoPlayer 
          video={playingVideo} 
          onClose={() => setPlayingVideo(null)} 
          likedVideos={likedVideos} 
          toggleLike={toggleLike} 
          setView={setView}
          onRequireAuth={handleRequireAuth} // ★これを渡す
        />
      )}

      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero onRequireAuth={handleRequireAuth} /> {/* ★これを渡す */}
            <VideoList 
              setPlayingVideo={setPlayingVideo}
              toggleLike={toggleLike}
              likedVideos={likedVideos}
            />
          </>
        )}

        {view === 'map' && <MapPage setPlayingVideo={setPlayingVideo} />}
        
        {view === 'mypage' && <MyPage userInfo={userInfo} setUserInfo={setUserInfo} allVideosData={allVideosData} instructorsData={instructorsData} likedVideos={likedVideos} toggleLike={toggleLike} setView={setView} setPlayingVideo={setPlayingVideo} />}
        
        {view === 'register' && <RegisterPage setView={setView} onRequireAuth={handleRequireAuth} />} {/* ★これを渡す */}
        
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
            {isAuthenticated && (
              <button onClick={handleLogout} className="text-red-400 hover:text-red-600 transition flex items-center gap-1">
                <LogOut size={14} /> ログアウト
              </button>
            )}
          </div>
          <p className="text-xs text-slate-400">© 2026 Happiino LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}