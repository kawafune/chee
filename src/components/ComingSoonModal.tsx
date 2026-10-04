import { X, Sparkles } from 'lucide-react';

interface ComingSoonModalProps {
  onClose: () => void;
}

// 会員登録・ログイン・検索・予約など、未実装機能を押したときに出す案内
export const ComingSoonModal = ({ onClose }: ComingSoonModalProps) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
    <div className="absolute inset-0" onClick={onClose}></div>
    <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-200">
      <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition">
        <X size={24} />
      </button>
      <div className="text-center space-y-4">
        <Sparkles className="mx-auto text-teal-500" size={40} />
        <h2 className="text-2xl font-bold text-slate-800">この機能は準備中です</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          公開に向けて準備を進めています。<br />もうしばらくお待ちください。
        </p>
        <button onClick={onClose} className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition">
          閉じる
        </button>
      </div>
    </div>
  </div>
);
