import { useState, useEffect } from 'react';
import { Play, Users, MapPin, ChevronRight, Search, LayoutGrid, Map as MapIcon, Menu, X, Calendar, Lock, LogIn } from 'lucide-react';

// ==========================================
// データ定義
// ==========================================

// カテゴリ定義
const categories = ["郷土料理", "伝統工芸", "健康・暮らし"];

// 動画データ（地図上のピン位置を微調整しました）
const allVideos = [
  // 郷土料理
  { 
    id: 101, 
    category: "郷土料理", 
    title: "鯖のへしこ：秋の仕込み", 
    instructor: "田中 節子", 
    location: "福井県敦賀市", 
    coordinates: { top: "50%", left: "48%" },
    date: "2026.02.15(土) 10:00~",
    image: "https://placehold.co/640x360/e2e8f0/1e293b?text=Local+Food+1", 
    duration: "15:00" 
  },
  { 
    id: 102, 
    category: "郷土料理", 
    title: "山菜おこわの蒸し方", 
    instructor: "佐藤 ヨネ", 
    location: "長野県安曇野市", 
    coordinates: { top: "48%", left: "55%" },
    date: "2026.02.18(水) 13:00~",
    image: "https://placehold.co/640x360/ffedd5/9a3412?text=Local+Food+2", 
    duration: "12:30" 
  },
  { 
    id: 103, 
    category: "郷土料理", 
    title: "手作り味噌：大豆の処理", 
    instructor: "鈴木 健造", 
    location: "新潟県長岡市", 
    coordinates: { top: "42%", left: "58%" },
    date: "2026.02.20(金) 10:00~",
    image: "https://placehold.co/640x360/fef3c7/92400e?text=Miso+Making", 
    duration: "25:00" 
  },
  { 
    id: 104, 
    category: "郷土料理", 
    title: "梅干し作り：塩加減", 
    instructor: "田中 節子", 
    location: "福井県敦賀市", 
    coordinates: { top: "50%", left: "48%" },
    date: "2026.03.01(日) 10:00~",
    image: "https://placehold.co/640x360/fee2e2/991b1b?text=Umeboshi", 
    duration: "08:45" 
  },
  { 
    id: 105, 
    category: "郷土料理", 
    title: "秋刀魚のぬか漬け", 
    instructor: "高橋 漁太", 
    location: "岩手県釜石市", 
    coordinates: { top: "30%", left: "70%" },
    date: "2026.02.25(水) 09:00~",
    image: "https://placehold.co/640x360/e0f2fe/075985?text=Sanma", 
    duration: "18:20" 
  },
  { 
    id: 106, 
    category: "郷土料理", 
    title: "伝統こんにゃく作り", 
    instructor: "山下 権三", 
    location: "群馬県下仁田町", 
    coordinates: { top: "50%", left: "62%" },
    date: "2026.02.22(日) 14:00~",
    image: "https://placehold.co/640x360/f1f5f9/475569?text=Konnyaku", 
    duration: "30:10" 
  },

  // 伝統工芸
  { 
    id: 201, 
    category: "伝統工芸", 
    title: "竹細工：基本の竹割り", 
    instructor: "山本 健一", 
    location: "長野県松本市", 
    coordinates: { top: "49%", left: "54%" },
    date: "2026.02.28(土) 13:00~",
    image: "https://placehold.co/640x360/dcfce7/166534?text=Bamboo+Craft", 
    duration: "20:00" 
  },
  { 
    id: 202, 
    category: "伝統工芸", 
    title: "和紙漉き体験", 
    instructor: "川上 紙匠", 
    location: "福井県越前市", 
    coordinates: { top: "51%", left: "49%" },
    date: "2026.03.05(木) 10:00~",
    image: "https://placehold.co/640x360/f8fafc/475569?text=Washi+Paper", 
    duration: "15:45" 
  },
  { 
    id: 203, 
    category: "伝統工芸", 
    title: "藍染め：絞りの技法", 
    instructor: "藍田 染子", 
    location: "徳島県徳島市", 
    coordinates: { top: "65%", left: "38%" },
    date: "2026.03.10(火) 11:00~",
    image: "https://placehold.co/640x360/dbeafe/1e40af?text=Indigo+Dye", 
    duration: "22:15" 
  },
  { 
    id: 204, 
    category: "伝統工芸", 
    title: "陶芸：ろくろの回し方", 
    instructor: "土屋 陶吉", 
    location: "栃木県益子町", 
    coordinates: { top: "48%", left: "64%" },
    date: "2026.02.21(土) 10:00~",
    image: "https://placehold.co/640x360/78716c/f5f5f4?text=Pottery", 
    duration: "40:00" 
  },
  { 
    id: 205, 
    category: "伝統工芸", 
    title: "寄木細工の幾何学", 
    instructor: "木村 工", 
    location: "神奈川県箱根町", 
    coordinates: { top: "55%", left: "66%" },
    date: "2026.03.14(土) 13:00~",
    image: "https://placehold.co/640x360/fcd34d/78350f?text=Wood+Work", 
    duration: "18:30" 
  },
  { 
    id: 206, 
    category: "伝統工芸", 
    title: "南部鉄器の手入れ", 
    instructor: "鉄山 釜太郎", 
    location: "岩手県盛岡市", 
    coordinates: { top: "28%", left: "68%" },
    date: "2026.02.26(木) 14:00~",
    image: "https://placehold.co/640x360/1e293b/f8fafc?text=Iron+Ware", 
    duration: "10:00" 
  },

  // 健康・暮らし
  { 
    id: 301, 
    category: "健康・暮らし", 
    title: "毎朝のラジオ体操", 
    instructor: "健康 太郎", 
    location: "東京都杉並区", 
    coordinates: { top: "54%", left: "67%" },
    date: "毎週月〜金 06:30~",
    image: "https://placehold.co/640x360/ccfbf1/115e59?text=Radio+Exercise", 
    duration: "05:00" 
  },
  { 
    id: 302, 
    category: "健康・暮らし", 
    title: "椅子に座ってヨガ", 
    instructor: "美空 ハナ", 
    location: "神奈川県横浜市", 
    coordinates: { top: "55%", left: "68%" },
    date: "2026.02.19(木) 10:30~",
    image: "https://placehold.co/640x360/fce7f3/9d174d?text=Chair+Yoga", 
    duration: "15:00" 
  },
  { 
    id: 303, 
    category: "健康・暮らし", 
    title: "古着のリメイク術", 
    instructor: "縫井 糸子", 
    location: "東京都世田谷区", 
    coordinates: { top: "54%", left: "66%" },
    date: "2026.02.24(火) 13:00~",
    image: "https://placehold.co/640x360/ede9fe/5b21b6?text=Remake", 
    duration: "25:30" 
  },
];


export default function ChiikuriApp() {
  // 認証状態
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authId, setAuthId] = useState("");
  const [authPw, setAuthPw] = useState("");
  const [authError, setAuthError] = useState("");

  // アプリ状態
  const [view, setView] = useState<'home' | 'map'>('home');
  const [playingVideo, setPlayingVideo] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMapPin, setSelectedMapPin] = useState<any>(null);

  // 【追加】初回読み込み時に、ブラウザに保存されたログイン情報をチェック
  useEffect(() => {
    const savedAuth = localStorage.getItem('chiicri_auth');
    if (savedAuth) {
      try {
        const { timestamp } = JSON.parse(savedAuth);
        // 24時間以内ならログイン有効 (24 * 60 * 60 * 1000 ms)
        if (new Date().getTime() - timestamp < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem('chiicri_auth');
      }
    }
  }, []);

  // ログイン処理
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authId === "chee" && authPw === "0710") {
      setIsAuthenticated(true);
      // 【追加】ログイン成功時に保存する
      localStorage.setItem('chiicri_auth', JSON.stringify({
        timestamp: new Date().getTime()
      }));
    } else {
      setAuthError("IDまたはパスワードが違います");
    }
  };

  // ログインしていない場合はログイン画面を表示
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="flex justify-center mb-6">
             <div className="bg-teal-100 p-4 rounded-full">
               <Lock className="w-8 h-8 text-teal-600" />
             </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">関係者ログイン</h2>
          <p className="text-center text-slate-500 mb-6 text-sm">プロトタイプ閲覧用のIDとパスワードを入力してください</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ID</label>
              <input 
                type="text" 
                value={authId}
                onChange={(e) => setAuthId(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="IDを入力"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={authPw}
                onChange={(e) => setAuthPw(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="パスワードを入力"
              />
            </div>
            {authError && <p className="text-red-500 text-sm font-bold text-center">{authError}</p>}
            
            <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2">
              <LogIn size={18} /> ログイン
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ログイン後のアプリ画面
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { setView('home'); setPlayingVideo(null); window.scrollTo(0,0); }}
          >
            <img src="/chiicri_logo.png" alt="ちぃくり" className="h-8 md:h-10 object-contain" />
          </div>
          
          {/* PC用ナビゲーション */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 absolute left-1/2 -translate-x-1/2">
            <button 
              onClick={() => setView('home')}
              className={`hover:text-teal-600 transition flex items-center gap-1 ${view === 'home' ? 'text-teal-600 font-bold' : ''}`}
            >
              {/* 【追加】アイコンを表示 */}
              <LayoutGrid size={16} />
              カテゴリーから教室を探す
            </button>
            <button 
              onClick={() => setView('map')}
              className={`hover:text-teal-600 transition flex items-center gap-1 ${view === 'map' ? 'text-teal-600 font-bold' : ''}`}
            >
              <MapIcon size={16} />
              地図から探す
            </button>
            <a href="#" className="hover:text-teal-600 transition">講師になる</a>
            <a href="#" className="hover:text-teal-600 transition">マイページ</a>
          </nav>
          
          {/* 右側エリア */}
          <div className="flex items-center gap-3 md:gap-4">
            <button className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold hover:opacity-90 transition shadow-md whitespace-nowrap">
              会員登録
            </button>
            <button 
              className="md:hidden text-slate-600 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* スマホ用メニュー */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg animate-in slide-in-from-top-2">
            <div className="flex flex-col p-4 gap-4 text-slate-600 font-medium text-sm">
              <button 
                onClick={() => { setView('home'); setIsMenuOpen(false); }}
                className="text-left py-2 border-b border-slate-50 hover:text-teal-600 flex items-center gap-2"
              >
                {/* スマホメニューにもアイコン追加 */}
                <LayoutGrid size={18} /> カテゴリーから教室を探す
              </button>
              <button 
                onClick={() => { setView('map'); setIsMenuOpen(false); }}
                className="text-left py-2 border-b border-slate-50 hover:text-teal-600 flex items-center gap-2"
              >
                <MapIcon size={18} /> 地図から探す
              </button>
              <a href="#" className="py-2 border-b border-slate-50 hover:text-teal-600">講師になる</a>
              <a href="#" className="py-2 hover:text-teal-600">マイページ</a>
            </div>
          </div>
        )}
      </header>

      {/* メインエリア：Viewの切り替え */}
      <main className="flex-grow">
        
        {view === 'home' ? (
          // =========================
          // ホーム画面（リスト表示）
          // =========================
          <>
            {/* ヒーローエリア */}
            <div className="bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {playingVideo ? (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <div className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/10 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-4">
                           <p className="text-2xl font-bold mb-2">{playingVideo.title}</p>
                           <p className="text-slate-400">再生中（デモ画面）</p>
                        </div>
                      </div>
                    </div>
                    {/* 動画下の情報エリア */}
                    <div className="max-w-4xl mx-auto text-left bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <h2 className="text-xl font-bold mb-2">{playingVideo.title}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                        <span className="flex items-center gap-1">
                          <Users size={16} /> {playingVideo.instructor}
                        </span>
                        <span className="flex items-center gap-1 text-teal-300 font-bold">
                          <Calendar size={16} /> 次回開催: {playingVideo.date}
                        </span>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${playingVideo.location}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-white hover:underline decoration-teal-400"
                        >
                          <MapPin size={16} /> {playingVideo.location}
                        </a>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <button 
                        onClick={() => setPlayingVideo(null)}
                        className="text-slate-400 hover:text-white underline text-sm"
                      >
                        × 動画を閉じる
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                      地域の「技」と「心」に出会う
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                      日本中の公民館や教室で行われている素晴らしい授業を、あなたの手のひらに。
                    </p>
                    
                    {/* 検索バー */}
                    <div className="max-w-2xl mx-auto relative">
                      <input 
                        type="text" 
                        placeholder="興味のあること、地域名、講師名でさがす..." 
                        className="w-full pl-12 pr-4 py-4 rounded-full text-slate-800 focus:outline-none focus:ring-4 focus:ring-teal-500/30 shadow-xl text-lg"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                      <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-6 rounded-full font-bold hover:opacity-90 transition">
                        検索
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* コンテンツ一覧 */}
            <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
              {categories.map((category) => (
                <section key={category} className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                      <LayoutGrid className="text-teal-500" size={24} />
                      {category}
                    </h2>
                    <a href="#" className="text-cyan-600 font-bold text-sm flex items-center gap-1 hover:text-cyan-800 transition">
                      他の動画も探す <ChevronRight size={16} />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {allVideos.filter(v => v.category === category).map((video) => (
                      <div 
                        key={video.id}
                        onClick={() => { setPlayingVideo(video); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="group bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-video bg-slate-200 relative overflow-hidden">
                          <img 
                            src={video.image} 
                            alt={video.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 rounded-full p-2 shadow-lg">
                              <Play size={20} className="text-teal-600 fill-teal-600" />
                            </div>
                          </div>
                          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                            {video.duration}
                          </span>
                        </div>

                        <div className="p-3">
                          <h3 className="font-bold text-sm text-slate-800 line-clamp-2 mb-1 group-hover:text-teal-600 transition-colors">
                            {video.title}
                          </h3>
                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <Users size={10} /> {video.instructor}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-1 text-[10px] text-teal-600 font-medium">
                            <MapPin size={10} /> {video.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        ) : (
          // =========================
          // 地図から探す画面
          // =========================
          <div className="bg-slate-100 min-h-[calc(100vh-64px)] relative overflow-hidden flex flex-col md:flex-row">
             {/* 地図表示エリア */}
             <div className="flex-grow relative h-[60vh] md:h-auto bg-slate-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <span className="text-9xl font-bold text-slate-400 tracking-widest">JAPAN</span>
                </div>
                {/* 模式的な日本地図の背景（SVG風CSS） */}
                <div className="w-full h-full relative">
                  {/* 北海道（右上） */}
                  <div className="absolute top-[10%] right-[15%] w-[15%] h-[15%] bg-white rounded-xl shadow-sm border border-slate-300 opacity-60 rotate-12"></div>
                  
                  {/* 本州（中央：ご要望により左右反転し、角度を日本列島らしく修正しました） */}
                  <div className="absolute top-[30%] left-[20%] w-[60%] h-[40%] bg-white rounded-full shadow-sm border border-slate-300 opacity-60 -rotate-12 scale-x-[-1]"></div>
                  
                  {/* 四国（下） */}
                  <div className="absolute top-[65%] left-[30%] w-[12%] h-[10%] bg-white rounded-full shadow-sm border border-slate-300 opacity-60"></div>
                  {/* 九州（左下） */}
                  <div className="absolute top-[65%] left-[15%] w-[15%] h-[15%] bg-white rounded-full shadow-sm border border-slate-300 opacity-60 rotate-45"></div>

                  {/* ピンの配置 */}
                  {allVideos.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => setSelectedMapPin(video)}
                      style={{ top: video.coordinates.top, left: video.coordinates.left }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                    >
                       <div className="relative">
                         <MapPin 
                           size={32} 
                           className={`drop-shadow-lg transition-all duration-300 ${selectedMapPin?.id === video.id ? 'text-teal-600 scale-125' : 'text-orange-500 hover:text-orange-600 hover:scale-110'}`} 
                           fill="currentColor"
                         />
                         <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                           {video.location}
                         </div>
                       </div>
                    </button>
                  ))}
                </div>
                
                <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded text-xs text-slate-500 backdrop-blur-sm">
                  <p>※ 地図上のピンをタップして教室を表示</p>
                </div>
             </div>

             {/* 選択された教室情報パネル */}
             <div className="w-full md:w-96 bg-white shadow-xl border-l border-slate-200 p-6 overflow-y-auto h-[40vh] md:h-auto z-20">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <MapIcon className="text-teal-500" />
                  地域から探す
                </h2>
                
                {selectedMapPin ? (
                  <div className="animate-in slide-in-from-right duration-300">
                    <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden mb-4 relative">
                      <img src={selectedMapPin.image} alt={selectedMapPin.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {selectedMapPin.duration}
                      </div>
                    </div>
                    <div className="mb-2">
                       <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                         {selectedMapPin.location}
                       </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{selectedMapPin.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 flex items-center gap-2">
                      <Users size={16} /> {selectedMapPin.instructor}
                    </p>
                    <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 mb-6">
                      <p className="font-bold flex items-center gap-1 mb-1 text-teal-700">
                        <Calendar size={14} /> 次回開催
                      </p>
                      {selectedMapPin.date}
                    </div>
                    <button 
                      onClick={() => { setView('home'); setPlayingVideo(selectedMapPin); window.scrollTo(0,0); }}
                      className="w-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-white font-bold py-3 rounded-lg shadow hover:opacity-90 transition flex items-center justify-center gap-2"
                    >
                      <Play size={18} fill="currentColor" />
                      この動画を見る
                    </button>
                    <button 
                       onClick={() => setSelectedMapPin(null)}
                       className="w-full mt-3 text-slate-400 text-sm underline hover:text-slate-600"
                    >
                      選択を解除
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-12">
                    <MapIcon size={48} className="mx-auto mb-4 opacity-20" />
                    <p>地図上のピンを選択すると<br/>詳細が表示されます</p>
                  </div>
                )}
             </div>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-teal-600 transition">運営会社</a>
            <a href="#" className="hover:text-teal-600 transition">利用規約</a>
            <a href="#" className="hover:text-teal-600 transition">プライバシーポリシー</a>
            <a href="#" className="hover:text-teal-600 transition">お問い合わせ</a>
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Chiikuri. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}