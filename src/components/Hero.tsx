import { Search } from 'lucide-react';

export const Hero = ({ onRequireAuth }: any) => {
  return (
    <div className="bg-slate-900 text-white animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
          地域の「技」と「心」に出会う
        </h1>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
          日本中の公民館や教室で行われている素晴らしい授業を、あなたの手のひらに。
        </p>
        <div className="max-w-2xl mx-auto relative group">
          <input 
            type="text" 
            placeholder="興味のあること、地域名、講師名でさがす..." 
            className="w-full pl-12 pr-24 py-4 rounded-full text-slate-800 focus:outline-none focus:ring-4 focus:ring-teal-500/50 shadow-2xl text-lg transition-all" 
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-teal-500 transition" size={24} />
          <button 
            onClick={onRequireAuth} // ★検索ボタンで認証チェック
            className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 rounded-full font-bold hover:shadow-lg hover:scale-105 transition"
          >
            検索
          </button>
        </div>
      </div>
    </div>
  );
};