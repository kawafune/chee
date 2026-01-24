import { useState, useEffect, useRef } from 'react';
import { 
  Users, MapPin, ChevronRight, Search, LayoutGrid, Map as MapIcon, 
  Menu, X, Calendar, Lock, LogIn, Heart, Bell, User, Edit2, Check, XCircle,
  Plus, ExternalLink, Video, Play
} from 'lucide-react';

// ==========================================
// データ定義
// ==========================================
const categories = ["郷土料理", "伝統工芸", "健康・暮らし"];

const instructorsData = {
  "田中 節子": { name: "田中 節子", title: "福井の郷土料理研究家", bio: "敦賀で生まれ育って70年。", location: "福井県敦賀市", image: "https://placehold.co/150x150/fee2e2/991b1b?text=Setsuko" },
  "山本 健一": { name: "山本 健一", title: "竹細工職人・歴40年", bio: "竹の声を聞き、編む。", location: "長野県松本市", image: "https://placehold.co/150x150/dcfce7/166534?text=Kenichi" }
};

const allVideosData = [
  { id: 101, category: "郷土料理", title: "鯖のへしこ：秋の仕込み", instructor: "田中 節子", location: "福井県敦賀市", date: "2026.02.15(土) 10:00~", image: "https://placehold.co/640x360/e2e8f0/1e293b?text=Local+Food+1", duration: "15:00", isPremium: false },
  { id: 102, category: "郷土料理", title: "山菜おこわの蒸し方（会員限定）", instructor: "佐藤 ヨネ", location: "長野県安曇野市", date: "2026.02.18(水) 13:00~", image: "https://placehold.co/640x360/ffedd5/9a3412?text=Local+Food+2", duration: "12:30", isPremium: true },
  { id: 103, category: "郷土料理", title: "手作り味噌：大豆の処理", instructor: "鈴木 健造", location: "新潟県長岡市", date: "2026.02.20(金) 10:00~", image: "https://placehold.co/640x360/fef3c7/92400e?text=Miso+Making", duration: "25:00", isPremium: false },
  { id: 104, category: "郷土料理", title: "梅干し作り：塩加減（会員限定）", instructor: "田中 節子", location: "福井県敦賀市", date: "2026.03.01(日) 10:00~", image: "https://placehold.co/640x360/fee2e2/991b1b?text=Umeboshi", duration: "08:45", isPremium: true },
  { id: 105, category: "郷土料理", title: "秋刀魚のぬか漬け", instructor: "高橋 漁太", location: "岩手県釜石市", date: "2026.02.25(水) 09:00~", image: "https://placehold.co/640x360/e0f2fe/075985?text=Sanma", duration: "18:20", isPremium: false },
  { id: 106, category: "郷土料理", title: "伝統こんにゃく作り", instructor: "山下 権三", location: "群馬県下仁田町", date: "2026.02.22(日) 14:00~", image: "https://placehold.co/640x360/f1f5f9/475569?text=Konnyaku", duration: "30:10", isPremium: true },
  { id: 201, category: "伝統工芸", title: "竹細工：基本の竹割り", instructor: "山本 健一", location: "長野県松本市", date: "2026.02.28(土) 13:00~", image: "https://placehold.co/640x360/dcfce7/166534?text=Bamboo+Craft", duration: "20:00", isPremium: false },
  { id: 202, category: "伝統工芸", title: "和紙漉き体験（会員限定）", instructor: "川上 紙匠", location: "福井県越前市", date: "2026.03.05(木) 10:00~", image: "https://placehold.co/640x360/f8fafc/475569?text=Washi+Paper", duration: "15:45", isPremium: true },
  { id: 203, category: "伝統工芸", title: "藍染め：絞りの技法", instructor: "藍田 染子", location: "徳島県徳島市", date: "2026.03.10(火) 11:00~", image: "https://placehold.co/640x360/dbeafe/1e40af?text=Indigo+Dye", duration: "22:15", isPremium: true },
  { id: 204, category: "伝統工芸", title: "陶芸：ろくろの回し方", instructor: "土屋 陶吉", location: "栃木県益子町", date: "2026.02.21(土) 10:00~", image: "https://placehold.co/640x360/78716c/f5f5f4?text=Pottery", duration: "40:00", isPremium: false },
  { id: 301, category: "健康・暮らし", title: "毎朝のラジオ体操", instructor: "健康 太郎", location: "東京都杉並区", date: "毎週月〜金 06:30~", image: "https://placehold.co/640x360/ccfbf1/115e59?text=Radio+Exercise", duration: "05:00", isPremium: false },
  { id: 302, category: "健康・暮らし", title: "椅子に座ってヨガ", instructor: "美空 ハナ", location: "神奈川県横浜市", date: "2026.02.19(木) 10:30~", image: "https://placehold.co/640x360/fce7f3/9d174d?text=Chair+Yoga", duration: "15:00", isPremium: false },
];

// ==========================================
// 地図データ
// ==========================================
const MAP_PATHS = [
  {id:1,name:"北海道",d:"M395,65l-10,32l-15,3l-12,24l-31,10l-14-16l8-14l20-13l30-41z"},
  {id:2,name:"青森",d:"M390,123l-3,19l-22,6l-10-6l-3-15l15-10l15,3z"},
  {id:3,name:"岩手",d:"M395,142l8,30l-15,10l-10-8l2-25l8-8z"},
  {id:4,name:"宮城",d:"M390,172l-5,16l-15,4l-5-10l8-14l15,2z"},
  {id:5,name:"秋田",d:"M367,138l5,22l-12,5l-8-18l5-12z"},
  {id:6,name:"山形",d:"M370,165l5,15l-12,8l-10-10l5-15z"},
  {id:7,name:"福島",d:"M378,188l8,12l-18,10l-15-5l5-18z"},
  {id:8,name:"茨城",d:"M385,208l8,12l-10,10l-12-8l5-12z"},
  {id:9,name:"栃木",d:"M370,202l8,8l-8,8l-10-5l2-10z"},
  {id:10,name:"群馬",d:"M355,200l10,5l-5,10l-15,2l-2-10z"},
  {id:11,name:"埼玉",d:"M365,215l8,3l-2,8l-10,2l-3-8z"},
  {id:12,name:"千葉",d:"M378,222l8,10l-5,15l-12-5l2-15z"},
  {id:13,name:"東京",d:"M365,226l5,5l-8,5l-5-5z"},
  {id:14,name:"神奈川",d:"M360,230l5,5l-8,5l-5-5z"},
  {id:15,name:"新潟",d:"M355,175l10,25l-15,15l-5-30z"},
  {id:16,name:"富山",d:"M325,195l10,5l-5,10l-10-5z"},
  {id:17,name:"石川",d:"M315,185l8,5l-5,20l-5-20z"},
  {id:18,name:"福井",d:"M310,205l10,5l-5,12l-10-5z"},
  {id:19,name:"山梨",d:"M345,215l8,5l-5,8l-8-5z"},
  {id:20,name:"長野",d:"M340,195l12,10l-8,20l-15-10l5-15z"},
  {id:21,name:"岐阜",d:"M325,210l10,10l-5,15l-12-10z"},
  {id:22,name:"静岡",d:"M345,228l10,5l-5,10l-15-5z"},
  {id:23,name:"愛知",d:"M330,230l10,5l-5,8l-10-5z"},
  {id:24,name:"三重",d:"M315,235l5,15l-10,5l-5-15z"},
  {id:25,name:"滋賀",d:"M310,220l5,5l-5,8l-5-5z"},
  {id:26,name:"京都",d:"M300,215l5,10l-5,10l-8-5z"},
  {id:27,name:"大阪",d:"M295,230l5,5l-5,8l-5-5z"},
  {id:28,name:"兵庫",d:"M280,220l12,5l-5,10l-12-5z"},
  {id:29,name:"奈良",d:"M305,235l5,8l-8,5l-5-8z"},
  {id:30,name:"和歌山",d:"M295,245l10,5l-5,10l-10-5z"},
  {id:31,name:"鳥取",d:"M260,215l10,2l-2,8l-10-2z"},
  {id:32,name:"島根",d:"M240,218l15,3l-3,8l-15-3z"},
  {id:33,name:"岡山",d:"M265,225l10,3l-3,10l-10-3z"},
  {id:34,name:"広島",d:"M245,228l15,3l-3,10l-15-3z"},
  {id:35,name:"山口",d:"M225,225l15,5l-5,8l-15-5z"},
  {id:36,name:"徳島",d:"M265,255l10,3l-3,8l-10-3z"},
  {id:37,name:"香川",d:"M260,245l10,3l-2,5l-10-2z"},
  {id:38,name:"愛媛",d:"M240,250l10,3l-3,10l-10-3z"},
  {id:39,name:"高知",d:"M245,265l15,3l-3,8l-15-3z"},
  {id:40,name:"福岡",d:"M205,240l10,5l-3,10l-10-5z"},
  {id:41,name:"佐賀",d:"M195,245l8,3l-3,8l-8-3z"},
  {id:42,name:"長崎",d:"M185,250l8,5l-5,10l-8-5z"},
  {id:43,name:"熊本",d:"M200,260l10,5l-5,12l-10-5z"},
  {id:44,name:"大分",d:"M215,250l8,8l-8,8l-8-5z"},
  {id:45,name:"宮崎",d:"M210,270l8,10l-10,5l-8-12z"},
  {id:46,name:"鹿児島",d:"M190,280l15,5l-5,15l-15-5z"},
  {id:47,name:"沖縄",d:"M150,350l15,5l-5,15l-15-5z"}
];

const JapanMap = ({ onSelectPrefecture }: { onSelectPrefecture: (pref: string) => void }) => {
  const activePrefs = Array.from(new Set(allVideosData.map(v => v.location.substring(0, 2))));
  
  return (
    <svg className="w-full h-full bg-slate-100" viewBox="0 0 500 400">
      <g>
        {MAP_PATHS.map((pref) => {
          const isActive = activePrefs.some(p => pref.name.startsWith(p));
          
          return (
            <g 
              key={pref.id}
              onClick={(e) => {
                e.stopPropagation();
                if (isActive) onSelectPrefecture(pref.name);
              }}
              className={`transition-all duration-300 ${isActive ? 'cursor-pointer hover:opacity-80' : 'fill-white stroke-slate-300'}`}
            >
              <title>{pref.name}</title>
              <path 
                d={pref.d} 
                fill={isActive ? "#ccfbf1" : "#ffffff"} 
                stroke="#64748b" 
                strokeWidth="1" 
              />
              {isActive && (
                 <g transform={`translate(${parseInt(pref.d.split(',')[0].substring(1)) + 5}, ${parseInt(pref.d.split(',')[1].split('l')[0]) + 5}) scale(0.5)`}>
                    <circle cx="0" cy="0" r="14" fill="#0d9488" className="animate-pulse" />
                    <circle cx="0" cy="0" r="6" fill="white" />
                    <MapPin size={24} className="text-teal-700 -translate-x-3 -translate-y-5" fill="currentColor" />
                 </g>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// ==========================================
// 3. 各ページコンポーネント
// ==========================================

const BecomeInstructorPage = () => (
  <div className="max-w-2xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
    <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">講師になる</h2>
    <p className="text-center text-slate-500 mb-8">あなたの知恵と技を、次の世代へ繋ぎませんか？</p>
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">お名前</label>
        <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="例：山田 花子" />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">活動地域</label>
        <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="例：東京都杉並区" />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">教えたいこと・得意分野</label>
        <textarea className="w-full border rounded-lg px-4 py-3 h-32" placeholder="例：50年間続けてきた漬物作りのコツや、着物のリメイク方法などを教えられます。"></textarea>
      </div>
      <button className="w-full bg-teal-600 text-white font-bold py-4 rounded-lg hover:bg-teal-700 transition shadow-lg" onClick={() => alert("ご応募ありがとうございます！担当者よりご連絡いたします。")}>
        応募する（無料）
      </button>
    </div>
  </div>
);

const RegisterPage = ({ setView }: { setView: (view: any) => void }) => (
  <div className="max-w-md mx-auto px-4 py-12 animate-in fade-in">
    <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">新規会員登録</h2>
    <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 space-y-4">
      <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
        Facebookで登録
      </button>
      <button className="w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-900 transition flex items-center justify-center gap-2">
        メールアドレスで登録
      </button>
      <div className="border-t border-slate-100 my-4 pt-4 text-center text-sm text-slate-500">
        登録することで、<button onClick={() => setView('privacy')} className="text-teal-600 underline">プライバシーポリシー</button>に同意したものとみなします。
      </div>
    </div>
  </div>
);

const PrivacyPage = () => (
  <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in">
    <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">プライバシーポリシー</h2>
    <div className="prose prose-slate text-sm text-slate-600 space-y-4">
      <p>ちぃくり（以下、「当サービス」といいます。）は、本ウェブサイト上で提供するサービスにおける、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。</p>
      <h3 className="font-bold text-slate-800 mt-4">第1条（個人情報）</h3>
      <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。</p>
      <h3 className="font-bold text-slate-800 mt-4">第2条（個人情報の収集方法）</h3>
      <p>当サービスは、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレスなどの個人情報をお尋ねすることがあります。</p>
      <p className="text-xs text-slate-400 mt-8">※ これはプロトタイプ用のサンプルテキストです。</p>
    </div>
  </div>
);

const MyPage = ({ 
  likedVideos, 
  followedInstructors, 
  setView, 
  setPlayingVideo, 
  goToInstructor,
  toggleLike,
  toggleFollow
}: any) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'instructors'>('videos');
  const [userInfo, setUserInfo] = useState({
    name: "ちぃくり 太郎",
    region: "東京都杉並区",
    interests: ["郷土料理", "伝統工芸"],
    icon: "https://placehold.co/150x150/0d9488/ffffff?text=User"
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingField && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingField]);

  const saveEdit = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
    setEditingField(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative group cursor-pointer">
          <img src={userInfo.icon} alt="icon" className="w-32 h-32 rounded-full border-4 border-slate-50 shadow-md object-cover" />
          <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <Edit2 className="text-white" size={24} />
          </div>
        </div>
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center gap-2">
            {editingField === 'name' ? (
              <div className="flex items-center gap-2 w-full">
                <input 
                  ref={editInputRef}
                  defaultValue={userInfo.name} 
                  className="text-2xl font-bold border rounded px-2 py-1 w-full"
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit('name', e.currentTarget.value)}
                />
                <button onClick={() => setEditingField(null)} className="text-slate-400"><XCircle size={24}/></button>
                <button onClick={() => saveEdit('name', editInputRef.current?.value || '')} className="text-teal-600"><Check size={24}/></button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-slate-800">{userInfo.name}</h2>
                <button onClick={() => setEditingField('name')} className="text-slate-400 hover:text-teal-600"><Edit2 size={18} /></button>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin size={18} />
            {editingField === 'region' ? (
              <div className="flex items-center gap-2">
                <input 
                  ref={editInputRef}
                  defaultValue={userInfo.region} 
                  className="border rounded px-2 py-1"
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit('region', e.currentTarget.value)}
                />
                <button onClick={() => saveEdit('region', editInputRef.current?.value || '')} className="text-teal-600"><Check size={18}/></button>
              </div>
            ) : (
              <>
                <span>{userInfo.region}</span>
                <button onClick={() => setEditingField('region')} className="text-slate-400 hover:text-teal-600"><Edit2 size={14} /></button>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {userInfo.interests.map((tag, idx) => (
              <span key={idx} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-bold">{tag}</span>
            ))}
            <button className="text-xs text-slate-400 border border-slate-300 px-2 py-1 rounded-full hover:bg-slate-100 flex items-center gap-1">
              <Plus size={12} /> 追加
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('videos')}
            className={`flex-1 py-4 text-center font-bold flex items-center justify-center gap-2 ${activeTab === 'videos' ? 'bg-teal-50 text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Video size={18} /> お気に入り動画
          </button>
          <button 
            onClick={() => setActiveTab('instructors')}
            className={`flex-1 py-4 text-center font-bold flex items-center justify-center gap-2 ${activeTab === 'instructors' ? 'bg-teal-50 text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Users size={18} /> お気に入り講師
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {likedVideos.length > 0 ? allVideosData.filter(v => likedVideos.includes(v.id)).map(video => (
                <div key={video.id} className="flex gap-4 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => { setView('home'); setPlayingVideo(video); window.scrollTo(0,0); }}>
                  <img src={video.image} className="w-24 h-16 object-cover rounded bg-slate-200" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm line-clamp-2">{video.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{video.instructor}</p>
                  </div>
                  <button onClick={(e) => toggleLike(e, video.id)} className="text-pink-500"><Heart fill="currentColor" size={20}/></button>
                </div>
              )) : <p className="text-center text-slate-400 py-8">お気に入りの動画はまだありません</p>}
            </div>
          )}
          {activeTab === 'instructors' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {followedInstructors.length > 0 ? followedInstructors.map((name: string) => {
                const inst = instructorsData[name as keyof typeof instructorsData];
                return inst ? (
                  <div key={name} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer" onClick={(e) => goToInstructor(name, e)}>
                    <img src={inst.image} className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold">{inst.name}</h4>
                      <p className="text-xs text-slate-500">{inst.title}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); toggleFollow(name); }} className="text-pink-500 bg-pink-50 px-3 py-1 rounded-full text-xs font-bold">フォロー中</button>
                  </div>
                ) : null;
              }) : <p className="text-center text-slate-400 py-8">フォロー中の講師はまだいません</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. メインコンポーネント (App)
// ==========================================
export default function ChiikuriApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authId, setAuthId] = useState("");
  const [authPw, setAuthPw] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [view, setView] = useState<'home' | 'map' | 'instructor' | 'mypage' | 'register' | 'become-instructor' | 'privacy'>('home');
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [playingVideo, setPlayingVideo] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPrefVideos, setSelectedPrefVideos] = useState<any[]>([]);
  
  const [likedVideos, setLikedVideos] = useState<number[]>([]);
  const [followedInstructors, setFollowedInstructors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem('chiicri_auth');
    if (savedAuth) {
      try {
        const { timestamp } = JSON.parse(savedAuth);
        if (new Date().getTime() - timestamp < 24 * 60 * 60 * 1000) setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('chiicri_auth');
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authId === "chee" && authPw === "0710") {
      setIsAuthenticated(true);
      localStorage.setItem('chiicri_auth', JSON.stringify({ timestamp: new Date().getTime() }));
    } else {
      setAuthError("IDまたはパスワードが違います");
    }
  };

  const handleSelectPrefecture = (pref: string) => {
    const videos = allVideosData.filter(v => v.location.includes(pref));
    setSelectedPrefVideos(videos);
    const listElement = document.getElementById('pref-video-list');
    if (listElement) {
       listElement.scrollTop = 0;
       if(window.innerWidth < 768) listElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedVideos(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };
  
  const toggleFollow = (name: string) => {
    setFollowedInstructors(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const goToInstructor = (name: string, e?: React.MouseEvent) => {
    if(e) e.stopPropagation();
    if(instructorsData[name as keyof typeof instructorsData]) {
      setSelectedInstructorId(name);
      setView('instructor');
      setPlayingVideo(null);
      window.scrollTo(0,0);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">関係者ログイン</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" value={authId} onChange={(e) => setAuthId(e.target.value)} className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="ID" />
            <input type="password" value={authPw} onChange={(e) => setAuthPw(e.target.value)} className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Password" />
            {authError && <p className="text-red-500 text-sm font-bold text-center">{authError}</p>}
            <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2"><LogIn size={18} className="inline mr-2"/> ログイン</button>
          </form>
        </div>
      </div>
    );
  }

  const currentInstructor = instructorsData[selectedInstructorId as keyof typeof instructorsData];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('home'); setPlayingVideo(null); }}>
            <img src="/chiicri_logo.png" alt="ちぃくり" className="h-8 md:h-10 object-contain" />
          </div>
          <nav className="hidden md:flex gap-6 text-base font-bold text-slate-600 absolute left-1/2 -translate-x-1/2">
            <button onClick={() => setView('home')} className={`hover:text-teal-600 transition flex items-center gap-1 ${view === 'home' ? 'text-teal-600' : ''}`}><LayoutGrid size={18} /> カテゴリーから探す</button>
            <button onClick={() => setView('map')} className={`hover:text-teal-600 transition flex items-center gap-1 ${view === 'map' ? 'text-teal-600' : ''}`}><MapIcon size={18} /> 地図から探す</button>
            <button onClick={() => setView('become-instructor')} className={`hover:text-teal-600 transition ${view === 'become-instructor' ? 'text-teal-600' : ''}`}>講師になる</button>
            <button onClick={() => setView('mypage')} className={`hover:text-teal-600 transition ${view === 'mypage' ? 'text-teal-600' : ''}`}>マイページ</button>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden md:block relative text-slate-500 hover:text-teal-600" onClick={() => setNotifications(false)}>
              <Bell size={24} />
              {notifications && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
            <button onClick={() => setView('register')} className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition shadow-md whitespace-nowrap">
              会員登録
            </button>
            <button className="md:hidden text-slate-600 p-1 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              {!isMenuOpen && notifications && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg animate-in slide-in-from-top-2 z-50">
            <div className="flex flex-col p-4 gap-4 text-slate-600 font-bold text-lg">
              <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="text-left py-3 border-b border-slate-50 hover:text-teal-600 flex items-center gap-2"><LayoutGrid size={20} /> カテゴリーから探す</button>
              <button onClick={() => { setView('map'); setIsMenuOpen(false); }} className="text-left py-3 border-b border-slate-50 hover:text-teal-600 flex items-center gap-2"><MapIcon size={20} /> 地図から探す</button>
              <button onClick={() => { setView('mypage'); setIsMenuOpen(false); }} className="text-left py-3 border-b border-slate-50 hover:text-teal-600 flex items-center gap-2"><User size={20} /> マイページ</button>
              <button onClick={() => { setView('become-instructor'); setIsMenuOpen(false); }} className="text-left py-3 border-b border-slate-50 text-teal-600">講師になる</button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {view === 'register' && <RegisterPage setView={setView} />}
        {view === 'become-instructor' && <BecomeInstructorPage />}
        {view === 'privacy' && <PrivacyPage />}
        {view === 'mypage' && <MyPage likedVideos={likedVideos} followedInstructors={followedInstructors} setView={setView} setPlayingVideo={setPlayingVideo} goToInstructor={goToInstructor} toggleLike={toggleLike} toggleFollow={toggleFollow} />}

        {view === 'instructor' && currentInstructor && (
          <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-10 mb-8 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <img src={currentInstructor.image} alt={currentInstructor.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-slate-50 shadow-md" />
                <div className="flex-1">
                   <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 mb-2">
                     <h1 className="text-3xl font-bold text-slate-800">{currentInstructor.name}</h1>
                     <span className="text-teal-600 font-bold text-sm bg-teal-50 px-3 py-1 rounded-full">{currentInstructor.title}</span>
                   </div>
                   <p className="text-slate-500 mb-4 flex items-center justify-center md:justify-start gap-1"><MapPin size={16}/> {currentInstructor.location}</p>
                   <p className="text-slate-700 leading-relaxed mb-6 text-lg">{currentInstructor.bio}</p>
                   <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start">
                     <button onClick={() => toggleFollow(currentInstructor.name)} className={`px-6 py-3 rounded-full font-bold transition flex items-center justify-center gap-2 ${followedInstructors.includes(currentInstructor.name) ? 'bg-slate-200 text-slate-600' : 'bg-pink-500 text-white shadow-lg hover:bg-pink-600'}`}>
                       <Heart size={20} fill={followedInstructors.includes(currentInstructor.name) ? "currentColor" : "none"} />
                       {followedInstructors.includes(currentInstructor.name) ? "フォロー中" : "お気に入り講師に登録"}
                     </button>
                     <button className="px-6 py-3 rounded-full font-bold border-2 border-teal-500 text-teal-600 hover:bg-teal-50 transition">教室へ遊びに行く・予約する</button>
                   </div>
                </div>
             </div>
             <h2 className="text-2xl font-bold mb-6 border-l-4 border-teal-500 pl-4">{currentInstructor.name} 先生の動画一覧</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allVideosData.filter(v => v.instructor === currentInstructor.name).map((video) => (
                  <div key={video.id} onClick={() => setPlayingVideo(video)} className="group bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="aspect-video bg-slate-200 relative overflow-hidden">
                      <img src={video.image} alt={video.title} className="w-full h-full object-cover" />
                      {video.isPremium && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Lock className="text-white w-10 h-10" /></div>}
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{video.duration}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-base text-slate-800 line-clamp-2 mb-2">{video.title}</h3>
                      <p className="text-xs text-slate-500">{video.date}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {view === 'home' && (
          <>
            <div className="bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {playingVideo ? (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <div className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/10 relative">
                      {playingVideo.isPremium ? (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-center p-6">
                            <Lock className="w-16 h-16 text-yellow-400 mb-4" />
                            <h3 className="text-2xl font-bold mb-2">この動画は会員限定です</h3>
                            <p className="text-slate-300 mb-6">月額会員になると、すべての動画が見放題になります。<br/>まずは1ヶ月無料体験から。</p>
                            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition">今すぐ無料体験を始める</button>
                         </div>
                      ) : (
                         <div className="absolute inset-0 flex items-center justify-center group">
                            <div className="text-center p-4">
                              <p className="text-2xl font-bold mb-2">{playingVideo.title}</p>
                              <p className="text-slate-400 mb-4">再生中（無料パート）</p>
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm group-hover:scale-110 transition">
                                <Play className="fill-white text-white translate-x-1" size={32} />
                              </div>
                            </div>
                         </div>
                      )}
                    </div>
                    <div className="max-w-4xl mx-auto text-left bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <h2 className="text-2xl font-bold mb-2">{playingVideo.title}</h2>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                              <span onClick={() => goToInstructor(playingVideo.instructor)} className="flex items-center gap-1 cursor-pointer hover:text-white hover:underline"><Users size={16} /> {playingVideo.instructor}</span>
                              <span className="flex items-center gap-1 text-teal-300 font-bold"><Calendar size={16} /> 次回開催: {playingVideo.date}</span>
                              <span className="flex items-center gap-1"><MapPin size={16} /> {playingVideo.location}</span>
                            </div>
                         </div>
                         <button onClick={(e) => toggleLike(e, playingVideo.id)} className={`p-2 rounded-full transition ${likedVideos.includes(playingVideo.id) ? 'bg-pink-500 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                           <Heart fill={likedVideos.includes(playingVideo.id) ? "currentColor" : "none"} />
                         </button>
                      </div>
                      <div className="mt-4 p-4 bg-teal-900/30 border border-teal-800 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-teal-100">この先生の教室に行って、直接習ってみませんか？</p>
                        <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-full text-sm transition">教室を予約する・問い合わせる</button>
                      </div>
                    </div>
                    <div className="text-center"><button onClick={() => setPlayingVideo(null)} className="text-slate-400 hover:text-white underline text-sm">× 動画を閉じる</button></div>
                  </div>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">地域の「技」と「心」に出会う</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">日本中の公民館や教室で行われている素晴らしい授業を、あなたの手のひらに。</p>
                    <div className="max-w-2xl mx-auto relative">
                      <input type="text" placeholder="興味のあること、地域名、講師名でさがす..." className="w-full pl-12 pr-4 py-4 rounded-full text-slate-800 focus:outline-none focus:ring-4 focus:ring-teal-500/30 shadow-xl text-lg" />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                      <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-6 rounded-full font-bold hover:opacity-90 transition">検索</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
              {categories.map((category) => (
                <section key={category} className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><LayoutGrid className="text-teal-500" size={28} /> {category}</h2>
                    <a href="#" className="text-cyan-600 font-bold text-sm flex items-center gap-1 hover:text-cyan-800 transition">他の動画も探す <ChevronRight size={16} /></a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allVideosData.filter(v => v.category === category).map((video) => (
                      <div key={video.id} onClick={() => { setPlayingVideo(video); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="aspect-video bg-slate-200 relative overflow-hidden">
                          <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          {video.isPremium && (
                            <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full">
                              <Lock size={16} className="text-yellow-400" />
                            </div>
                          )}
                          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-bold">{video.duration}</span>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-lg text-slate-800 line-clamp-2 mb-3 group-hover:text-teal-600 transition-colors leading-snug">{video.title}</h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600" onClick={(e) => goToInstructor(video.instructor, e)}>
                               <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                                 <img src={instructorsData[video.instructor as keyof typeof instructorsData]?.image || "/api/placeholder/24/24"} className="w-full h-full object-cover"/>
                               </div>
                               <span>{video.instructor}</span>
                            </div>
                            <button onClick={(e) => toggleLike(e, video.id)} className="text-slate-400 hover:text-pink-500 transition">
                              <Heart size={20} fill={likedVideos.includes(video.id) ? "currentColor" : "none"} />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center gap-1 text-xs text-teal-600 font-bold"><MapPin size={12} /> {video.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}

        {view === 'map' && (
          <div className="bg-slate-100 min-h-full flex flex-col md:flex-row h-full">
             {/* 地図エリア */}
             <div 
               className="flex-grow relative bg-slate-200 overflow-hidden cursor-default h-[50vh] md:h-auto"
             >
                <div className="w-full h-full">
                  <JapanMap onSelectPrefecture={handleSelectPrefecture} />
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-2 rounded-lg text-xs text-slate-500 shadow-md pointer-events-none">
                  ※ 緑色のエリアを選択
                </div>
             </div>
             
             {/* リストエリア (スクロール可能) */}
             <div className="w-full md:w-96 bg-white shadow-xl border-l border-slate-200 p-6 overflow-y-auto h-[50vh] md:h-full z-20" id="pref-video-list">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><MapIcon className="text-teal-500" /> 地域から探す</h2>
                {selectedPrefVideos.length > 0 ? (
                  <div className="space-y-6 animate-in slide-in-from-right duration-300">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <h3 className="font-bold text-lg">{selectedPrefVideos[0].location.substring(0, 2)}の教室</h3>
                      <button onClick={() => setSelectedPrefVideos([])} className="text-xs text-slate-400 hover:text-slate-600">クリア</button>
                    </div>
                    {selectedPrefVideos.map(video => (
                      <div key={video.id} className="group cursor-pointer" onClick={() => { setView('home'); setPlayingVideo(video); }}>
                        <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden mb-2 relative">
                          <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">{video.duration}</span>
                        </div>
                        <h4 className="font-bold text-sm mb-1 group-hover:text-teal-600">{video.title}</h4>
                        <p className="text-xs text-slate-500 mb-1">{video.instructor}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-12">
                    <MapIcon size={48} className="mx-auto mb-4 opacity-20" />
                    <p>地図上の色付きエリアをタップして<br/>教室を探してください</p>
                  </div>
                )}
             </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 mt-auto py-10 shrink-0">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-600">
            <a href="https://happiino.com/about" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition flex items-center gap-1">
              運営会社: 合同会社Happiino <ExternalLink size={14} />
            </a>
            <button onClick={() => setView('privacy')} className="hover:text-teal-600 transition">プライバシーポリシー</button>
            <a href="#" className="hover:text-teal-600 transition">お問い合わせ</a>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Chiikuri. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}