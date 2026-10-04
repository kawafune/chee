import { useState } from 'react';
import { X, LogIn } from 'lucide-react';

export const LoginModal = ({ onClose, onLogin }: any) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ID: chee, PW: 0710
    if (id === "chee" && pw === "0710") {
      onLogin();
    } else {
      setError("IDまたはパスワードが違います");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition">
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">ログインが必要です</h2>
          <p className="text-slate-500 text-sm">ID・パスワードを入力してください。</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 ml-1">ログインID</label>
            <input 
              type="text" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full border-2 border-slate-200 bg-slate-50 px-4 py-3 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white transition font-bold text-slate-700"
              placeholder="IDを入力"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 ml-1">パスワード</label>
            <input 
              type="password" 
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full border-2 border-slate-200 bg-slate-50 px-4 py-3 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white transition font-bold text-slate-700"
              placeholder="パスワードを入力"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm font-bold text-center bg-red-50 py-2 rounded-lg">{error}</p>}
          
          <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-2">
            <LogIn size={20} /> ログインして進む
          </button>
        </form>
      </div>
    </div>
  );
};