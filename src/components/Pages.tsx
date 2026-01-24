import { useState, useRef, useEffect } from 'react';
import { MapPin, Edit2, Check, XCircle, Plus, Video, Users, Heart, Lock, Calendar } from 'lucide-react';

// --- リッチなマイページ ---
export const MyPage = ({ userInfo, setUserInfo, allVideosData, likedVideos, toggleLike, setView, setPlayingVideo }: any) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'instructors'>('videos');
  const [editingField, setEditingField] = useState<string | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editingField && editInputRef.current) editInputRef.current.focus(); }, [editingField]);
  const saveEdit = (field: string, value: string) => { setUserInfo((prev:any) => ({ ...prev, [field]: value })); setEditingField(null); };

  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8 animate-in fade-in font-sans">
      {/* プロフィールヘッダー */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-teal-50 to-cyan-50 -z-10"></div>
        <div className="relative group cursor-pointer mt-4 md:mt-0">
          <img src={userInfo.icon} className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white" alt="user" />
          <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition backdrop-blur-sm"><Edit2 className="text-white" size={24} /></div>
        </div>
        <div className="flex-1 space-y-3 text-center md:text-left mt-2 md:mt-12">
          <div className="flex items-center justify-center md:justify-start gap-2 h-10">
            {editingField === 'name' ? (
              <div className="flex items-center gap-2 w-full max-w-md animate-in fade-in">
                <input ref={editInputRef} defaultValue={userInfo.name} className="text-2xl font-bold border-b-2 border-teal-500 px-2 py-1 w-full focus:outline-none bg-transparent" onKeyDown={(e) => e.key === 'Enter' && saveEdit('name', e.currentTarget.value)} />
                <button onClick={() => saveEdit('name', editInputRef.current?.value || '')} className="text-teal-600 hover:bg-teal-50 p-1 rounded"><Check size={24}/></button>
                <button onClick={() => setEditingField(null)} className="text-slate-400 hover:bg-slate-50 p-1 rounded"><XCircle size={24}/></button>
              </div>
            ) : (
              <><h2 className="text-3xl font-bold text-slate-800">{userInfo.name}</h2><button onClick={() => setEditingField('name')} className="text-slate-400 hover:text-teal-600 hover:bg-slate-100 p-1 rounded transition"><Edit2 size={20}/></button></>
            )}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 h-8">
            <MapPin size={18} className="text-teal-500"/>
            {editingField === 'region' ? (
               <div className="flex items-center gap-2 animate-in fade-in"><input ref={editInputRef} defaultValue={userInfo.region} className="border-b-2 border-teal-500 px-2 py-0.5 focus:outline-none bg-transparent" onKeyDown={(e) => e.key === 'Enter' && saveEdit('region', e.currentTarget.value)} /><button onClick={() => saveEdit('region', editInputRef.current?.value || '')} className="text-teal-600"><Check size={18}/></button></div>
            ) : (
              <><span>{userInfo.region}</span><button onClick={() => setEditingField('region')} className="text-slate-400 hover:text-teal-600 p-1"><Edit2 size={14}/></button></>
            )}
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
            <span className="bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-bold">郷土料理</span>
            <span className="bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-bold">伝統工芸</span>
            <button className="text-sm text-slate-400 border border-dashed border-slate-300 px-3 py-1.5 rounded-full hover:bg-slate-50 hover:text-teal-600 hover:border-teal-300 flex items-center gap-1 transition"><Plus size={14} /> 追加</button>
          </div>
        </div>
      </div>
      
      {/* タブ切り替えコンテンツ */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button onClick={() => setActiveTab('videos')} className={`flex-1 py-5 text-center font-bold flex items-center justify-center gap-2 transition relative ${activeTab === 'videos' ? 'text-teal-600 bg-teal-50/50' : 'text-slate-500 hover:bg-slate-50'}`}><Video size={20} /> お気に入り動画 {activeTab === 'videos' && <span className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 animate-in slide-in-from-left"></span>}</button>
          <button onClick={() => setActiveTab('instructors')} className={`flex-1 py-5 text-center font-bold flex items-center justify-center gap-2 transition relative ${activeTab === 'instructors' ? 'text-teal-600 bg-teal-50/50' : 'text-slate-500 hover:bg-slate-50'}`}><Users size={20} /> フォロー中の講師 {activeTab === 'instructors' && <span className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 animate-in slide-in-from-right"></span>}</button>
        </div>
        <div className="p-6 md:p-8 bg-slate-50/30 min-h-[300px]">
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
              {likedVideos.length > 0 ? allVideosData.filter((v:any) => likedVideos.includes(v.id)).map((v:any) => (
                <div key={v.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition flex" onClick={() => { setView('home'); setPlayingVideo(v); window.scrollTo(0,0); }}>
                  <div className="w-32 h-full relative shrink-0">
                    <img src={v.image} className="w-full h-full object-cover" alt={v.title} />
                    {v.isPremium && <div className="absolute top-1 left-1 bg-slate-900/60 p-1 rounded-full"><Lock size={12} className="text-yellow-400"/></div>}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div><h4 className="font-bold text-sm line-clamp-2 group-hover:text-teal-700 transition">{v.title}</h4><p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Users size={12}/> {v.instructor}</p></div>
                    <div className="flex justify-between items-center mt-2"><span className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={12}/> {v.date}</span><button onClick={(e) => toggleLike(e, v.id)} className="text-pink-500 bg-pink-50 p-1.5 rounded-full hover:bg-pink-100 transition"><Heart fill="currentColor" size={16}/></button></div>
                  </div>
                </div>
              )) : <div className="col-span-full text-center text-slate-400 py-12 flex flex-col items-center gap-2"><Heart size={40} className="opacity-20"/><p>まだお気に入りの動画はありません</p></div>}
            </div>
          )}
          {activeTab === 'instructors' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
               <div className="col-span-full text-center text-slate-400 py-12 flex flex-col items-center gap-2"><Users size={40} className="opacity-20"/><p>まだフォロー中の講師はいません</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const BecomeInstructorPage = () => (
  <div className="max-w-2xl mx-auto p-8 bg-white my-12 rounded-3xl shadow-lg border border-slate-100 font-sans animate-in slide-in-from-bottom-4">
    <div className="text-center mb-8"><h2 className="text-3xl font-bold text-slate-800 mb-2">講師になる</h2><p className="text-slate-500">あなたの知恵と技を、次の世代へ繋ぎませんか？</p></div>
    <div className="space-y-6">
      <div><label className="block text-sm font-bold text-slate-700 mb-2">お名前 <span className="text-red-500">*</span></label><input className="w-full border-2 border-slate-200 p-4 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition outline-none font-bold" placeholder="例：山田 花子" /></div>
      <div><label className="block text-sm font-bold text-slate-700 mb-2">活動地域 <span className="text-red-500">*</span></label><input className="w-full border-2 border-slate-200 p-4 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition outline-none font-bold" placeholder="例：東京都杉並区" /></div>
      <div><label className="block text-sm font-bold text-slate-700 mb-2">教えたいこと・得意分野 <span className="text-red-500">*</span></label><textarea className="w-full border-2 border-slate-200 p-4 rounded-xl h-40 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition outline-none font-bold resize-none" placeholder="例：50年間続けてきた漬物作りのコツや、着物のリメイク方法などを教えられます。"></textarea></div>
      <button className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition transform" onClick={() => alert('応募を受け付けました！担当者よりご連絡いたします。')}>応募する（無料）</button>
    </div>
  </div>
);

export const RegisterPage = ({ setView }: any) => (
  <div className="max-w-md mx-auto p-10 bg-white my-16 rounded-3xl shadow-2xl border border-slate-100 text-center font-sans animate-in zoom-in-95">
    <img src="/chiicri_logo.png" alt="ちぃくり" className="h-12 mx-auto mb-6" />
    <h2 className="text-2xl font-bold mb-2 text-slate-800">新規会員登録</h2>
    <p className="text-slate-500 mb-8 text-sm">地域の魅力的な動画が見放題になります。</p>
    <div className="space-y-4">
      <button className="w-full bg-[#1877f2] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-[#0d65d9] transition shadow-sm"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebookで登録</button>
      <button className="w-full bg-slate-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-900 transition shadow-sm"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> メールアドレスで登録</button>
    </div>
    <p className="text-xs text-slate-400 mt-8">登録することで、<button onClick={() => setView('privacy')} className="text-teal-600 underline hover:text-teal-800">プライバシーポリシー</button>に同意したものとみなします。</p>
  </div>
);

export const PrivacyPage = () => (
  <div className="max-w-3xl mx-auto p-8 my-8 bg-white rounded-2xl shadow-sm border border-slate-100 font-sans animate-in fade-in">
    <h2 className="text-2xl font-bold mb-6 pb-4 border-b">プライバシーポリシー</h2>
    <div className="prose prose-slate text-slate-600 space-y-4 leading-relaxed">
      <p>ちぃくり（以下、「当サービス」といいます。）は、本ウェブサイト上で提供するサービスにおける、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。</p>
      <h3 className="text-lg font-bold text-slate-800 mt-6">第1条（個人情報）</h3>
      <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。</p>
      <p className="text-sm text-slate-400 mt-8 bg-slate-50 p-4 rounded-lg">※ サンプルテキストです。</p>
    </div>
  </div>
);