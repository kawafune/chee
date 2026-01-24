import { Menu, X, Bell, LayoutGrid, Map as MapIcon, Users, User } from 'lucide-react';

export const Header = ({ setView, setIsMenuOpen, isMenuOpen, notifications, setNotifications }: any) => (
  <>
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm h-16 flex items-center px-4 justify-between font-sans relative">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView('home')}>
        <img src="/chiicri_logo.png" alt="ちぃくり" className="h-8 md:h-10 object-contain group-hover:opacity-80 transition" />
      </div>
      
      {/* PC用ナビゲーション */}
      <nav className="hidden md:flex gap-8 font-bold text-slate-600 text-sm">
        <button onClick={() => setView('home')} className="hover:text-teal-600 transition flex items-center gap-2">
          <LayoutGrid size={18} /> カテゴリー
        </button>
        <button onClick={() => setView('map')} className="hover:text-teal-600 transition flex items-center gap-2">
          <MapIcon size={18} /> 地図から探す
        </button>
        <button onClick={() => setView('become-instructor')} className="hover:text-teal-600 transition flex items-center gap-2">
          <Users size={18} /> 講師になる
        </button>
        <button onClick={() => setView('mypage')} className="hover:text-teal-600 transition flex items-center gap-2">
          <User size={18} /> マイページ
        </button>
      </nav>

      <div className="flex items-center gap-4">
        <button className="hidden md:block relative text-slate-500 hover:text-teal-600 transition" onClick={() => setNotifications(false)}>
          <Bell size={24} />
          {notifications && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
        </button>
        <button onClick={() => setView('register')} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:shadow-lg hover:opacity-90 transition transform hover:-translate-y-0.5">
          会員登録
        </button>
        <button className="md:hidden text-slate-600 p-1 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          {!isMenuOpen && notifications && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
        </button>
      </div>
    </header>

    {/* モバイルメニュー */}
    {isMenuOpen && (
      <>
        {/* ▼ 追加: メニューの外側（背景）をタップしたら閉じるための透明な膜 ▼ */}
        <div 
          className="fixed inset-0 z-30 bg-black/20 md:hidden" 
          onClick={() => setIsMenuOpen(false)}
        />

        <div className="md:hidden bg-white border-b border-slate-100 fixed top-16 w-full z-40 shadow-xl animate-in slide-in-from-top-2 font-sans">
          <div className="flex flex-col p-4 text-slate-600 font-bold text-lg space-y-2">
            <button onClick={() => {setView('home'); setIsMenuOpen(false);}} className="text-left py-3 border-b border-slate-50 hover:text-teal-600 hover:bg-slate-50 px-2 rounded transition flex items-center gap-3">
              <LayoutGrid size={20} /> カテゴリーから探す
            </button>
            <button onClick={() => {setView('map'); setIsMenuOpen(false);}} className="text-left py-3 border-b border-slate-50 hover:text-teal-600 hover:bg-slate-50 px-2 rounded transition flex items-center gap-3">
              <MapIcon size={20} /> 地図から探す
            </button>
            <button onClick={() => {setView('become-instructor'); setIsMenuOpen(false);}} className="text-left py-3 border-b border-slate-50 hover:text-teal-600 hover:bg-slate-50 px-2 rounded transition flex items-center gap-3">
              <Users size={20} /> 講師になる
            </button>
            <button onClick={() => {setView('mypage'); setIsMenuOpen(false);}} className="text-left py-3 hover:text-teal-600 hover:bg-slate-50 px-2 rounded transition flex items-center gap-3">
              <User size={20} /> マイページ
            </button>
          </div>
        </div>
      </>
    )}
  </>
);