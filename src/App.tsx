import React, { useState } from 'react';
import {
  Play,
  Users,
  MapPin,
  Heart,
  ChevronRight,
  Search,
  LayoutGrid,
  Map,
} from 'lucide-react';

// ダミーデータ：カテゴリと動画コンテンツ
// 画像URLを「実際に表示されるダミー画像サービス」のものに変更しました
const allVideos = [
  // 郷土料理
  {
    id: 101,
    category: '郷土料理',
    title: '鯖のへしこ：秋の仕込み',
    instructor: '田中 節子',
    location: '福井県敦賀市',
    image: 'https://placehold.co/640x360/e2e8f0/1e293b?text=Local+Food+1',
    duration: '15:00',
  },
  {
    id: 102,
    category: '郷土料理',
    title: '山菜おこわの蒸し方',
    instructor: '佐藤 ヨネ',
    location: '長野県安曇野市',
    image: 'https://placehold.co/640x360/ffedd5/9a3412?text=Local+Food+2',
    duration: '12:30',
  },
  {
    id: 103,
    category: '郷土料理',
    title: '手作り味噌：大豆の処理',
    instructor: '鈴木 健造',
    location: '新潟県長岡市',
    image: 'https://placehold.co/640x360/fef3c7/92400e?text=Miso+Making',
    duration: '25:00',
  },
  {
    id: 104,
    category: '郷土料理',
    title: '梅干し作り：塩加減',
    instructor: '田中 節子',
    location: '福井県敦賀市',
    image: 'https://placehold.co/640x360/fee2e2/991b1b?text=Umeboshi',
    duration: '08:45',
  },
  {
    id: 105,
    category: '郷土料理',
    title: '秋刀魚のぬか漬け',
    instructor: '高橋 漁太',
    location: '岩手県釜石市',
    image: 'https://placehold.co/640x360/e0f2fe/075985?text=Sanma',
    duration: '18:20',
  },
  {
    id: 106,
    category: '郷土料理',
    title: '伝統こんにゃく作り',
    instructor: '山下 権三',
    location: '群馬県下仁田町',
    image: 'https://placehold.co/640x360/f1f5f9/475569?text=Konnyaku',
    duration: '30:10',
  },

  // 伝統工芸
  {
    id: 201,
    category: '伝統工芸',
    title: '竹細工：基本の竹割り',
    instructor: '山本 健一',
    location: '長野県松本市',
    image: 'https://placehold.co/640x360/dcfce7/166534?text=Bamboo+Craft',
    duration: '20:00',
  },
  {
    id: 202,
    category: '伝統工芸',
    title: '和紙漉き体験',
    instructor: '川上 紙匠',
    location: '福井県越前市',
    image: 'https://placehold.co/640x360/f8fafc/475569?text=Washi+Paper',
    duration: '15:45',
  },
  {
    id: 203,
    category: '伝統工芸',
    title: '藍染め：絞りの技法',
    instructor: '藍田 染子',
    location: '徳島県徳島市',
    image: 'https://placehold.co/640x360/dbeafe/1e40af?text=Indigo+Dye',
    duration: '22:15',
  },
  {
    id: 204,
    category: '伝統工芸',
    title: '陶芸：ろくろの回し方',
    instructor: '土屋 陶吉',
    location: '栃木県益子町',
    image: 'https://placehold.co/640x360/78716c/f5f5f4?text=Pottery',
    duration: '40:00',
  },
  {
    id: 205,
    category: '伝統工芸',
    title: '寄木細工の幾何学',
    instructor: '木村 工',
    location: '神奈川県箱根町',
    image: 'https://placehold.co/640x360/fcd34d/78350f?text=Wood+Work',
    duration: '18:30',
  },
  {
    id: 206,
    category: '伝統工芸',
    title: '南部鉄器の手入れ',
    instructor: '鉄山 釜太郎',
    location: '岩手県盛岡市',
    image: 'https://placehold.co/640x360/1e293b/f8fafc?text=Iron+Ware',
    duration: '10:00',
  },

  // 健康・暮らし
  {
    id: 301,
    category: '健康・暮らし',
    title: '毎朝のラジオ体操',
    instructor: '健康 太郎',
    location: '東京都杉並区',
    image: 'https://placehold.co/640x360/ccfbf1/115e59?text=Radio+Exercise',
    duration: '05:00',
  },
  {
    id: 302,
    category: '健康・暮らし',
    title: '椅子に座ってヨガ',
    instructor: '美空 ハナ',
    location: '神奈川県横浜市',
    image: 'https://placehold.co/640x360/fce7f3/9d174d?text=Chair+Yoga',
    duration: '15:00',
  },
  {
    id: 303,
    category: '健康・暮らし',
    title: '古着のリメイク術',
    instructor: '縫井 糸子',
    location: '東京都世田谷区',
    image: 'https://placehold.co/640x360/ede9fe/5b21b6?text=Remake',
    duration: '25:30',
  },
];

// カテゴリ定義
const categories = ['郷土料理', '伝統工芸', '健康・暮らし'];

export default function ChiikuriApp() {
  const [playingVideo, setPlayingVideo] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/chiicri_logo.png"
              alt="ちぃくり"
              className="h-10 object-contain"
            />
          </div>

          {/* PC用ナビゲーション */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a
              href="#"
              className="hover:text-teal-600 transition flex items-center gap-1"
            >
              教室を探す
            </a>
            {/* 追加要望：地図から探す */}
            <a
              href="#"
              className="hover:text-teal-600 transition flex items-center gap-1"
            >
              <Map size={16} />
              地図から探す
            </a>
            <a href="#" className="hover:text-teal-600 transition">
              講師になる
            </a>
            <a href="#" className="hover:text-teal-600 transition">
              マイページ
            </a>
          </nav>

          <button className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition shadow-md">
            会員登録
          </button>
        </div>
      </header>

      {/* メインエリア */}
      <main>
        {/* ヒーローエリア */}
        <div className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            {playingVideo ? (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="text-2xl font-bold mb-2">
                        {playingVideo.title}
                      </p>
                      <p className="text-slate-400">再生中（デモ画面）</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setPlayingVideo(null)}
                    className="text-slate-400 hover:text-white underline text-sm"
                  >
                    × 閉じる
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
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={24}
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-6 rounded-full font-bold hover:opacity-90 transition">
                    検索
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* コンテンツ一覧エリア */}
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
          {categories.map((category) => (
            <section key={category} className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <LayoutGrid className="text-teal-500" size={24} />
                  {category}
                </h2>
                <a
                  href="#"
                  className="text-cyan-600 font-bold text-sm flex items-center gap-1 hover:text-cyan-800 transition"
                >
                  他の動画も探す <ChevronRight size={16} />
                </a>
              </div>

              {/* 動画カードグリッド */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {allVideos
                  .filter((v) => v.category === category)
                  .map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setPlayingVideo(video)}
                      className="group bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* 画像エリア（修正済み） */}
                      <div className="aspect-video bg-slate-200 relative overflow-hidden">
                        <img
                          src={video.image}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/90 rounded-full p-2 shadow-lg">
                            <Play
                              size={20}
                              className="text-teal-600 fill-teal-600"
                            />
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
      </main>
    </div>
  );
}
