import { useState, useRef, useEffect } from 'react';
import { Play, Users, MapPin, ChevronRight, Search, LayoutGrid, Map as MapIcon, Menu, X, Calendar, Lock, LogIn, Plus, Minus, RefreshCw, Heart, Bell, User } from 'lucide-react';

// ==========================================
// データ定義
// ==========================================
const categories = ["郷土料理", "伝統工芸", "健康・暮らし"];

// 講師データ（SNSリンクは排除し、リアル送客を意識）
const instructors = {
  "田中 節子": {
    name: "田中 節子",
    title: "福井の郷土料理研究家",
    bio: "敦賀で生まれ育って70年。おばあちゃんから教わった「へしこ」や「梅干し」の味を、若い人たちに残したくて活動しています。公民館での料理教室はいつも笑い声でいっぱいです。",
    location: "福井県敦賀市",
    image: "https://placehold.co/150x150/fee2e2/991b1b?text=Setsuko"
  },
  "山本 健一": {
    name: "山本 健一",
    title: "竹細工職人・歴40年",
    bio: "竹の声を聞き、編む。松本の自然の中で育まれた竹細工の技術を伝えています。初心者の方でも、竹を割る「パカン」という音の気持ちよさを体験してほしいですね。",
    location: "長野県松本市",
    image: "https://placehold.co/150x150/dcfce7/166534?text=Kenichi"
  }
  // 他の講師も同様に追加可能
};

// 動画データ（isPremium: true のものは鍵がかかる設定）
const allVideos = [
  // 郷土料理
  { id: 101, category: "郷土料理", title: "鯖のへしこ：秋の仕込み", instructor: "田中 節子", location: "福井県敦賀市", date: "2026.02.15(土) 10:00~", image: "https://placehold.co/640x360/e2e8f0/1e293b?text=Local+Food+1", duration: "15:00", isPremium: false },
  { id: 102, category: "郷土料理", title: "山菜おこわの蒸し方（会員限定）", instructor: "佐藤 ヨネ", location: "長野県安曇野市", date: "2026.02.18(水) 13:00~", image: "https://placehold.co/640x360/ffedd5/9a3412?text=Local+Food+2", duration: "12:30", isPremium: true },
  { id: 103, category: "郷土料理", title: "手作り味噌：大豆の処理", instructor: "鈴木 健造", location: "新潟県長岡市", date: "2026.02.20(金) 10:00~", image: "https://placehold.co/640x360/fef3c7/92400e?text=Miso+Making", duration: "25:00", isPremium: false },
  { id: 104, category: "郷土料理", title: "梅干し作り：塩加減（会員限定）", instructor: "田中 節子", location: "福井県敦賀市", date: "2026.03.01(日) 10:00~", image: "https://placehold.co/640x360/fee2e2/991b1b?text=Umeboshi", duration: "08:45", isPremium: true },
  { id: 105, category: "郷土料理", title: "秋刀魚のぬか漬け", instructor: "高橋 漁太", location: "岩手県釜石市", date: "2026.02.25(水) 09:00~", image: "https://placehold.co/640x360/e0f2fe/075985?text=Sanma", duration: "18:20", isPremium: false },
  { id: 106, category: "郷土料理", title: "伝統こんにゃく作り", instructor: "山下 権三", location: "群馬県下仁田町", date: "2026.02.22(日) 14:00~", image: "https://placehold.co/640x360/f1f5f9/475569?text=Konnyaku", duration: "30:10", isPremium: true },
  // 伝統工芸
  { id: 201, category: "伝統工芸", title: "竹細工：基本の竹割り", instructor: "山本 健一", location: "長野県松本市", date: "2026.02.28(土) 13:00~", image: "https://placehold.co/640x360/dcfce7/166534?text=Bamboo+Craft", duration: "20:00", isPremium: false },
  { id: 202, category: "伝統工芸", title: "和紙漉き体験（会員限定）", instructor: "川上 紙匠", location: "福井県越前市", date: "2026.03.05(木) 10:00~", image: "https://placehold.co/640x360/f8fafc/475569?text=Washi+Paper", duration: "15:45", isPremium: true },
  { id: 203, category: "伝統工芸", title: "藍染め：絞りの技法", instructor: "藍田 染子", location: "徳島県徳島市", date: "2026.03.10(火) 11:00~", image: "https://placehold.co/640x360/dbeafe/1e40af?text=Indigo+Dye", duration: "22:15", isPremium: true },
  { id: 204, category: "伝統工芸", title: "陶芸：ろくろの回し方", instructor: "土屋 陶吉", location: "栃木県益子町", date: "2026.02.21(土) 10:00~", image: "https://placehold.co/640x360/78716c/f5f5f4?text=Pottery", duration: "40:00", isPremium: false },
  // 健康・暮らし
  { id: 301, category: "健康・暮らし", title: "毎朝のラジオ体操", instructor: "健康 太郎", location: "東京都杉並区", date: "毎週月〜金 06:30~", image: "https://placehold.co/640x360/ccfbf1/115e59?text=Radio+Exercise", duration: "05:00", isPremium: false },
  { id: 302, category: "健康・暮らし", title: "椅子に座ってヨガ", instructor: "美空 ハナ", location: "神奈川県横浜市", date: "2026.02.19(木) 10:30~", image: "https://placehold.co/640x360/fce7f3/9d174d?text=Chair+Yoga", duration: "15:00", isPremium: false },
];

// ==========================================
// 地図コンポーネント (SVG)
// ==========================================
const JapanMap = ({ isMobile, onSelectPrefecture }: { isMobile: boolean, onSelectPrefecture: (pref: string) => void }) => {
  const activePrefs = Array.from(new Set(allVideos.map(v => v.location.substring(0, 2))));
  const PrefecturePath = ({ name, code, d, transform, points }: any) => {
    const isActive = activePrefs.some(p => name.includes(p));
    return (
      <g className={`transition-all duration-300 cursor-pointer ${isActive ? 'hover:brightness-90' : 'opacity-40 hover:opacity-60'}`} transform={transform} onClick={() => isActive && onSelectPrefecture(name.substring(0, 2))}>
        <title>{name}</title>
        {points ? <polygon points={points} fill={isActive ? "#ccfbf1" : "#EEEEEE"} stroke="#64748b" strokeWidth="1" strokeLinejoin="round" /> : <path d={d} fill={isActive ? "#ccfbf1" : "#EEEEEE"} stroke="#64748b" strokeWidth="1" strokeLinejoin="round" />}
        {isActive && <g transform="translate(20, 20)"><circle cx="0" cy="0" r="14" fill="#0d9488" className="animate-pulse" /><circle cx="0" cy="0" r="6" fill="white" /><MapPin size={24} className="text-teal-700 -translate-x-3 -translate-y-5 drop-shadow-md" fill="currentColor" /></g>}
      </g>
    );
  };
  // (SVGデータは前回のものを継承して短縮表示します)
  return <svg className="geolonia-svg-map w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
    <title>Japanese Prefectures</title>
    {isMobile ? 
      <g transform="matrix(1.45, 0, 0, 1.45, -435, -216)">
        <g transform="matrix(1, 0, 0, 1, 6, 18)">
          {/* 主要な県のデータのみ記述（実際は全県データが入ります） */}
          <PrefecturePath name="福井 / Fukui" code="18" points="40 0 46 8 56 9 61 14 66 13 64 19 70 27 67 31 54 32 53 34 47 31 42 40 35 37 36 45 33 44 33 47 27 50 24 48 21 55 18 54 15 58 3 56 0 51 1 45 3 49 10 46 6 49 13 50 15 47 13 48 13 45 19 47 17 45 20 43 18 40 26 41 25 35 28 33 29 38 31 39 32 32 25 19 34 6 34 2" transform="matrix(1, 0, 0, 1, 657.5, 463.6)" />
          <PrefecturePath name="長野 / Nagano" code="20" points="68 18 59 21 60 23 55 27 54 34 57 39 66 39 67 45 64 47 66 53 63 54 66 57 66 63 70 65 71 70 68 72 64 69 58 71 53 66 43 77 46 80 43 82 45 87 41 92 41 104 26 114 18 112 13 115 12 109 14 106 12 102 15 102 13 99 15 95 9 89 11 86 6 79 0 76 2 71 7 71 13 64 14 60 11 56 16 46 13 40 19 32 18 29 21 28 22 17 27 10 27 7 34 8 34 13 36 14 44 10 48 12 48 7 53 2 60 0 63 2 63 7 68 11" transform="matrix(1, 0, 0, 1, 752.5, 417.6)" />
          <PrefecturePath name="新潟 / Niigata" code="15" d="M7,113 L4,102 L0,99 L14,94 L23,87 L30,87 L45,75 L55,60 L60,46 L79,34 L80,36 L79,35 L85,28 L94,0 L102,3 L102,10 L111,16 L109,20 L101,23 L101,31 L98,39 L101,44 L104,46 L95,56 L97,65 L89,65 L88,68 L79,69 L78,72 L80,76 L76,82 L81,87 L80,101 L73,94 L71,98 L67,99 L68,104 L65,105 L65,108 L53,114 L53,107 L48,103 L48,98 L45,96 L38,98 L33,103 L33,108 L29,106 L21,110 L19,109 L19,104 L12,103 L12,106 L7,113 Z M36,46 L28,47 L35,38 L33,35 L30,37 L30,31 L34,23 L43,14 L39,30 L46,31 L43,40 L36,46 Z" transform="matrix(1, 0, 0, 1, 767.5, 321.6)" />
          <PrefecturePath name="群馬 / Gunma" code="10" points="64 52 54 54 48 50 37 48 32 58 16 67 12 65 12 59 9 56 12 55 10 49 13 47 12 41 3 41 0 36 1 29 6 25 5 23 14 20 26 14 26 11 29 10 28 5 32 4 34 0 41 7 49 9 47 12 50 14 47 17 46 26 54 29 48 42 53 49 62 48" transform="matrix(1, 0, 0, 1, 806.5, 415.6)" />
          <PrefecturePath name="東京 / Tokyo" code="13" d="M49,173 L49,178 L44,171 L49,173 Z M34,113 L32,115 L29,114 L31,111 L34,113 Z M11,104 L13,106 L11,107 L11,104 Z M18,98 L16,96 L18,92 L18,98 Z M22,75 L22,69 L26,70 L26,76 L22,75 Z M48,7 L49,12 L47,16 L41,15 L43,19 L39,20 L43,20 L43,23 L29,16 L26,18 L29,20 L27,20 L27,25 L23,20 L9,14 L4,11 L0,3 L3,0 L18,4 L23,8 L30,5 L30,9 L36,6 L40,7 L42,5 L48,7 Z" transform="matrix(1, 0, 0, 1, 834.5, 487.6)" />
          <PrefecturePath name="神奈川 / Kanagawa" code="14" points="10 0 24 6 28 11 28 6 30 6 27 4 30 2 44 9 40 13 36 12 39 16 36 16 36 23 42 26 38 30 39 33 35 33 36 28 33 24 26 22 15 25 11 28 12 34 10 34 4 30 4 17 0 17 9 9" transform="matrix(1, 0, 0, 1, 833.5, 501.6)" />
          <PrefecturePath name="岩手 / Iwate" code="03" points="48 92 41 91 39 105 33 102 29 107 23 103 25 99 17 100 7 95 8 89 5 84 8 81 0 68 3 57 7 51 5 46 8 42 5 38 10 37 8 19 12 14 16 15 29 5 31 8 35 5 40 7 46 0 54 11 52 16 57 19 55 23 61 28 64 43 62 53 65 49 66 54 68 55 62 60 64 62 67 59 67 63 63 63 68 60 69 65 68 60 71 62 73 60 75 64 74 58 81 62 83 57 83 60 86 57 86 59 88 53 89 52 86 54 91 52 91 52 94 50 90" transform="matrix(1, 0, 0, 1, 913.5, 199.6)" />
          <PrefecturePath name="徳島 / Tokushima" code="36" d="M50,2 L52,0 L51,4 L50,2 Z M41,2 L49,0 L49,3 L52,4 L48,13 L55,20 L50,24 L57,26 L38,36 L33,43 L27,42 L25,38 L27,34 L20,33 L19,25 L13,27 L0,21 L2,13 L11,7 L18,10 L27,3 L40,5 L41,2 Z" transform="matrix(1, 0, 0, 1, 561.5, 589.6)" />
          <PrefecturePath name="栃木 / Tochigi" code="9" points="19 60 18 59 16 55 7 56 2 49 8 36 0 33 1 24 4 21 1 19 3 16 28 0 40 3 46 7 47 13 47 24 48 27 45 29 47 39 44 46 33 48 30 53 27 53 26 57" transform="matrix(1, 0, 0, 1, 852.5, 408.6)" />
          <PrefecturePath name="北海道 / Hokkaido" code="1" d="M4,240 L3,245 L0,246 L0,237 L6,235 L4,240 Z M33,261 L32,250 L28,243 L23,242 L21,237 L17,236 L15,231 L19,223 L17,212 L19,209 L28,207 L34,198 L37,202 L39,201 L43,192 L49,187 L39,173 L40,166 L47,164 L60,174 L71,171 L71,174 L78,177 L83,174 L89,165 L83,140 L86,135 L93,132 L97,126 L96,103 L100,95 L101,85 L98,67 L90,48 L93,39 L92,33 L94,36 L99,35 L105,28 L131,55 L139,68 L155,85 L184,104 L213,109 L214,113 L219,118 L238,118 L260,91 L262,96 L252,119 L252,129 L255,135 L265,138 L263,140 L264,137 L258,137 L263,149 L269,156 L273,157 L280,149 L287,148 L277,156 L275,163 L258,166 L256,172 L252,177 L247,177 L245,175 L246,173 L243,172 L240,178 L243,180 L228,181 L220,178 L205,186 L191,202 L182,216 L179,225 L180,240 L178,248 L164,237 L141,228 L113,211 L100,209 L103,206 L88,214 L72,230 L69,227 L73,227 L68,226 L66,220 L58,212 L47,213 L42,220 L39,230 L40,234 L52,242 L62,242 L71,254 L80,257 L82,260 L76,265 L72,267 L63,263 L60,265 L60,261 L57,260 L55,265 L48,269 L48,278 L40,282 L37,287 L30,284 L27,278 L28,269 L33,261 Z M71,48 L73,45 L77,47 L79,52 L75,55 L71,52 L71,48 Z M65,35 L65,33 L67,35 L66,45 L63,35 L65,35 Z M369,17 L367,13 L365,13 L363,17 L365,23 L364,26 L359,28 L357,35 L350,34 L351,41 L341,50 L341,54 L335,54 L335,56 L339,58 L339,62 L336,65 L332,64 L332,69 L329,66 L330,71 L327,78 L331,79 L336,70 L341,69 L346,59 L356,50 L358,40 L363,43 L369,41 L384,24 L397,15 L406,13 L407,10 L404,6 L407,2 L402,0 L396,2 L384,20 L373,22 L369,17 Z M290,99 L295,93 L303,91 L308,84 L311,85 L314,79 L304,82 L296,77 L293,79 L289,89 L280,104 L280,107 L266,122 L268,129 L273,128 L273,132 L274,119 L282,114 L283,109 L286,109 L287,102 L290,99 Z M322,125 L334,115 L329,113 L325,116 L326,117 L319,119 L319,123 L321,122 L322,125 Z M300,142 L304,137 L297,139 L300,142 Z M291,146 L293,143 L289,144 L291,146 Z" transform="matrix(1, 0, 0, 1, 328.5, 152.4)" />
        </g>
      </g>
    : 
    <g transform="matrix(1.028, 0, 0, 1.028, -47.5, -28.8)">
      <g transform="matrix(1, 0, 0, 1, 6, 18)">
        <PrefecturePath name="福井 / Fukui" code="18" points="40 0 46 8 56 9 61 14 66 13 64 19 70 27 67 31 54 32 53 34 47 31 42 40 35 37 36 45 33 44 33 47 27 50 24 48 21 55 18 54 15 58 3 56 0 51 1 45 3 49 10 46 6 49 13 50 15 47 13 48 13 45 19 47 17 45 20 43 18 40 26 41 25 35 28 33 29 38 31 39 32 32 25 19 34 6 34 2" transform="translate(408.000000, 618.000000)" />
        <PrefecturePath name="長野 / Nagano" code="20" points="68 18 59 21 60 23 55 27 54 34 57 39 66 39 67 45 64 47 66 53 63 54 66 57 66 63 70 65 71 70 68 72 64 69 58 71 53 66 43 77 46 80 43 82 45 87 41 92 41 104 26 114 18 112 13 115 12 109 14 106 12 102 15 102 13 99 15 95 9 89 11 86 6 79 0 76 2 71 7 71 13 64 14 60 11 56 16 46 13 40 19 32 18 29 21 28 22 17 27 10 27 7 34 8 34 13 36 14 44 10 48 12 48 7 53 2 60 0 63 2 63 7 68 11" transform="translate(503.000000, 572.000000)" />
        <PrefecturePath name="新潟 / Niigata" code="15" d="M7,113 L4,102 L0,99 L14,94 L23,87 L30,87 L45,75 L55,60 L60,46 L79,34 L80,36 L79,35 L85,28 L94,0 L102,3 L102,10 L111,16 L109,20 L101,23 L101,31 L98,39 L101,44 L104,46 L95,56 L97,65 L89,65 L88,68 L79,69 L78,72 L80,76 L76,82 L81,87 L80,101 L73,94 L71,98 L67,99 L68,104 L65,105 L65,108 L53,114 L53,107 L48,103 L48,98 L45,96 L38,98 L33,103 L33,108 L29,106 L21,110 L19,109 L19,104 L12,103 L12,106 L7,113 Z M36,46 L28,47 L35,38 L33,35 L30,37 L30,31 L34,23 L43,14 L39,30 L46,31 L43,40 L36,46 Z" transform="translate(518.000000, 476.000000)" />
        <PrefecturePath name="群馬 / Gunma" code="10" points="64 52 54 54 48 50 37 48 32 58 16 67 12 65 12 59 9 56 12 55 10 49 13 47 12 41 3 41 0 36 1 29 6 25 5 23 14 20 26 14 26 11 29 10 28 5 32 4 34 0 41 7 49 9 47 12 50 14 47 17 46 26 54 29 48 42 53 49 62 48" transform="translate(557.000000, 570.000000)" />
        <PrefecturePath name="東京 / Tokyo" code="13" d="M49,173 L49,178 L44,171 L49,173 Z M34,113 L32,115 L29,114 L31,111 L34,113 Z M11,104 L13,106 L11,107 L11,104 Z M18,98 L16,96 L18,92 L18,98 Z M22,75 L22,69 L26,70 L26,76 L22,75 Z M48,7 L49,12 L47,16 L41,15 L43,19 L39,20 L43,20 L43,23 L29,16 L26,18 L29,20 L27,20 L27,25 L23,20 L9,14 L4,11 L0,3 L3,0 L18,4 L23,8 L30,5 L30,9 L36,6 L40,7 L42,5 L48,7 Z" transform="translate(585.000000, 642.000000)" />
        <PrefecturePath name="神奈川 / Kanagawa" code="14" points="10 0 24 6 28 11 28 6 30 6 27 4 30 2 44 9 40 13 36 12 39 16 36 16 36 23 42 26 38 30 39 33 35 33 36 28 33 24 26 22 15 25 11 28 12 34 10 34 4 30 4 17 0 17 9 9" transform="translate(584.000000, 656.000000)" />
        <PrefecturePath name="岩手 / Iwate" code="03" points="48 92 41 91 39 105 33 102 29 107 23 103 25 99 17 100 7 95 8 89 5 84 8 81 0 68 3 57 7 51 5 46 8 42 5 38 10 37 8 19 12 14 16 15 29 5 31 8 35 5 40 7 46 0 54 11 52 16 57 19 55 23 61 28 64 43 62 53 65 49 66 54 68 55 62 60 64 62 67 59 67 63 63 63 68 60 69 65 68 60 71 62 73 60 75 64 74 58 81 62 83 57 83 60 86 57 86 59 88 53 89 52 86 54 91 52 91 52 94 50 90" transform="translate(664.000000, 354.000000)" />
        <PrefecturePath name="徳島 / Tokushima" code="36" d="M50,2 L52,0 L51,4 L50,2 Z M41,2 L49,0 L49,3 L52,4 L48,13 L55,20 L50,24 L57,26 L38,36 L33,43 L27,42 L25,38 L27,34 L20,33 L19,25 L13,27 L0,21 L2,13 L11,7 L18,10 L27,3 L40,5 L41,2 Z" transform="translate(312.000000, 744.000000)" />
        <PrefecturePath name="栃木 / Tochigi" code="9" points="19 60 18 59 16 55 7 56 2 49 8 36 0 33 1 24 4 21 1 19 3 16 28 0 40 3 46 7 47 13 47 24 48 27 45 29 47 39 44 46 33 48 30 53 27 53 26 57" transform="translate(603.000000, 563.000000)" />
        <PrefecturePath name="北海道 / Hokkaido" code="1" d="M4,240 L3,245 L0,246 L0,237 L6,235 L4,240 Z M33,261 L32,250 L28,243 L23,242 L21,237 L17,236 L15,231 L19,223 L17,212 L19,209 L28,207 L34,198 L37,202 L39,201 L43,192 L49,187 L39,173 L40,166 L47,164 L60,174 L71,171 L71,174 L78,177 L83,174 L89,165 L83,140 L86,135 L93,132 L97,126 L96,103 L100,95 L101,85 L98,67 L90,48 L93,39 L92,33 L94,36 L99,35 L105,28 L131,55 L139,68 L155,85 L184,104 L213,109 L214,113 L219,118 L238,118 L260,91 L262,96 L252,119 L252,129 L255,135 L265,138 L263,140 L264,137 L258,137 L263,149 L269,156 L273,157 L280,149 L287,148 L277,156 L275,163 L258,166 L256,172 L252,177 L247,177 L245,175 L246,173 L243,172 L240,178 L243,180 L228,181 L220,178 L205,186 L191,202 L182,216 L179,225 L180,240 L178,248 L164,237 L141,228 L113,211 L100,209 L103,206 L88,214 L72,230 L69,227 L73,227 L68,226 L66,220 L58,212 L47,213 L42,220 L39,230 L40,234 L52,242 L62,242 L71,254 L80,257 L82,260 L76,265 L72,267 L63,263 L60,265 L60,261 L57,260 L55,265 L48,269 L48,278 L40,282 L37,287 L30,284 L27,278 L28,269 L33,261 Z M71,48 L73,45 L77,47 L79,52 L75,55 L71,52 L71,48 Z M65,35 L65,33 L67,35 L66,45 L63,35 L65,35 Z M369,17 L367,13 L365,13 L363,17 L365,23 L364,26 L359,28 L357,35 L350,34 L351,41 L341,50 L341,54 L335,54 L335,56 L339,58 L339,62 L336,65 L332,64 L332,69 L329,66 L330,71 L327,78 L331,79 L336,70 L341,69 L346,59 L356,50 L358,40 L363,43 L369,41 L384,24 L397,15 L406,13 L407,10 L404,6 L407,2 L402,0 L396,2 L384,20 L373,22 L369,17 Z M290,99 L295,93 L303,91 L308,84 L311,85 L314,79 L304,82 L296,77 L293,79 L289,89 L280,104 L280,107 L266,122 L268,129 L273,128 L273,132 L274,119 L282,114 L283,109 L286,109 L287,102 L290,99 Z M322,125 L334,115 L329,113 L325,116 L326,117 L319,119 L319,123 L321,122 L322,125 Z M300,142 L304,137 L297,139 L300,142 Z M291,146 L293,143 L289,144 L291,146 Z" transform="matrix(1, 0, 0, 1, 328.5, 152.4)" />
          <PrefecturePath name="大阪 / Osaka" code="27" points="16 0 24 8 28 5 27 8 31 9 34 17 29 28 31 37 29 42 3 48 0 45 7 44 14 37 17 28 19 30 17 22 20 20 18 9 20 8 14 5 13 1" transform="translate(387.000000, 695.000000)" />
          <PrefecturePath name="愛知 / Aichi" code="23" points="42 46 18 52 20 47 23 49 31 43 33 46 35 43 34 40 28 37 26 41 18 40 14 37 16 29 12 40 16 45 13 45 9 41 10 36 8 33 8 28 12 21 5 25 0 17 1 11 5 3 15 0 21 8 26 10 33 8 39 12 46 8 47 14 52 11 60 13 50 33 42 38" transform="translate(469.000000, 673.000000)" />
        </g>
      </g>
    }
  </svg>
};

export default function ChiikuriApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authId, setAuthId] = useState("");
  const [authPw, setAuthPw] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [view, setView] = useState<'home' | 'map' | 'instructor'>('home');
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [playingVideo, setPlayingVideo] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPrefVideos, setSelectedPrefVideos] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  // お気に入り・フォロー・通知機能
  const [likedVideos, setLikedVideos] = useState<number[]>([]);
  const [followedInstructors, setFollowedInstructors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState(true); // 通知があるシミュレーション

  // マップのズーム・パン状態
  const [mapScale, setMapScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const savedAuth = localStorage.getItem('chiicri_auth');
    if (savedAuth) {
      try {
        const { timestamp } = JSON.parse(savedAuth);
        if (new Date().getTime() - timestamp < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem('chiicri_auth');
      }
    }
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
    const videos = allVideos.filter(v => v.location.includes(pref));
    setSelectedPrefVideos(videos);
  };

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedVideos(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };
  
  const toggleFollow = (name: string) => {
    setFollowedInstructors(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  // 講師詳細ページへ移動
  const goToInstructor = (name: string, e?: React.MouseEvent) => {
    if(e) e.stopPropagation();
    if(instructors[name as keyof typeof instructors]) {
      setSelectedInstructorId(name);
      setView('instructor');
      setPlayingVideo(null);
      window.scrollTo(0,0);
    }
  };

  // ズーム・パン操作
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleAdjustment = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(mapScale + scaleAdjustment, 0.5), 4);
    setMapScale(newScale);
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMapPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">関係者ログイン</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" value={authId} onChange={(e) => setAuthId(e.target.value)} className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="ID" />
            <input type="password" value={authPw} onChange={(e) => setAuthPw(e.target.value)} className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Password" />
            {authError && <p className="text-red-500 text-sm font-bold text-center">{authError}</p>}
            <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition"><LogIn size={18} className="inline mr-2"/> ログイン</button>
          </form>
        </div>
      </div>
    );
  }

  // 講師ページ表示用のデータ
  const currentInstructor = instructors[selectedInstructorId as keyof typeof instructors];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('home'); setPlayingVideo(null); window.scrollTo(0,0); }}>
            <img src="/chiicri_logo.png" alt="ちぃくり" className="h-8 md:h-10 object-contain" />
          </div>
          <nav className="hidden md:flex gap-6 text-base font-bold text-slate-600 absolute left-1/2 -translate-x-1/2">
            <button onClick={() => setView('home')} className={`hover:text-teal-600 transition flex items-center gap-1 ${view === 'home' ? 'text-teal-600' : ''}`}><LayoutGrid size={18} /> カテゴリー</button>
            <button onClick={() => setView('map')} className={`hover:text-teal-600 transition flex items-center gap-1 ${view === 'map' ? 'text-teal-600' : ''}`}><MapIcon size={18} /> 地図から探す</button>
            <a href="#" className="hover:text-teal-600 transition">講師になる</a>
          </nav>
          <div className="flex items-center gap-4">
            {/* 通知ベル (PC) */}
            <button className="hidden md:block relative text-slate-500 hover:text-teal-600" onClick={() => setNotifications(false)}>
              <Bell size={24} />
              {notifications && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
            <button className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition shadow-md whitespace-nowrap">プレミアム会員</button>
            {/* ハンバーガーメニュー (Mobile) - 通知バッジ付き */}
            <button className="md:hidden text-slate-600 p-1 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              {!isMenuOpen && notifications && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg animate-in slide-in-from-top-2">
            <div className="flex flex-col p-4 gap-4 text-slate-600 font-bold text-lg">
              <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="text-left py-3 border-b border-slate-50 hover:text-teal-600 flex items-center gap-2"><LayoutGrid size={20} /> カテゴリーから探す</button>
              <button onClick={() => { setView('map'); setIsMenuOpen(false); }} className="text-left py-3 border-b border-slate-50 hover:text-teal-600 flex items-center gap-2"><MapIcon size={20} /> 地図から探す</button>
              <button className="text-left py-3 border-b border-slate-50 hover:text-teal-600 flex items-center gap-2 relative">
                <Bell size={20} /> お知らせ 
                {notifications && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full ml-2">New</span>}
              </button>
              <a href="#" className="py-3 text-teal-600">講師になる</a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* =================================================================================
            VIEW: INSTRUCTOR (講師詳細ページ)
           ================================================================================= */}
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
                     <button 
                       onClick={() => toggleFollow(currentInstructor.name)}
                       className={`px-6 py-3 rounded-full font-bold transition flex items-center justify-center gap-2 ${followedInstructors.includes(currentInstructor.name) ? 'bg-slate-200 text-slate-600' : 'bg-pink-500 text-white shadow-lg hover:bg-pink-600'}`}
                     >
                       <Heart size={20} fill={followedInstructors.includes(currentInstructor.name) ? "currentColor" : "none"} />
                       {followedInstructors.includes(currentInstructor.name) ? "フォロー中" : "お気に入り講師に登録"}
                     </button>
                     {/* SNSではなくリアル送客へのボタン */}
                     <button className="px-6 py-3 rounded-full font-bold border-2 border-teal-500 text-teal-600 hover:bg-teal-50 transition">
                       教室へ遊びに行く・予約する
                     </button>
                   </div>
                </div>
             </div>

             <h2 className="text-2xl font-bold mb-6 border-l-4 border-teal-500 pl-4">{currentInstructor.name} 先生の動画一覧</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allVideos.filter(v => v.instructor === currentInstructor.name).map((video) => (
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

        {/* =================================================================================
            VIEW: HOME (動画一覧)
           ================================================================================= */}
        {view === 'home' && (
          <>
            <div className="bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {playingVideo ? (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <div className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/10 relative">
                      {/* 鍵付き動画のシミュレーション */}
                      {playingVideo.isPremium ? (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-center p-6">
                            <Lock className="w-16 h-16 text-yellow-400 mb-4" />
                            <h3 className="text-2xl font-bold mb-2">この動画は会員限定です</h3>
                            <p className="text-slate-300 mb-6">月額会員になると、すべての動画が見放題になります。<br/>まずは1ヶ月無料体験から。</p>
                            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition">今すぐ無料体験を始める</button>
                         </div>
                      ) : (
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-4">
                              <p className="text-2xl font-bold mb-2">{playingVideo.title}</p>
                              <p className="text-slate-400">再生中（無料パート）</p>
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
                      {/* Pattern B: リアル送客への導線 */}
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
                    {allVideos.filter(v => v.category === category).map((video) => (
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
                                 {/* 簡易的なアイコン表示 */}
                                 <img src={instructors[video.instructor as keyof typeof instructors]?.image || "/api/placeholder/24/24"} className="w-full h-full object-cover"/>
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

        {/* =================================================================================
            VIEW: MAP (地図検索) - 既存機能を維持
           ================================================================================= */}
        {view === 'map' && (
          <div className="bg-slate-100 min-h-[calc(100vh-64px)] relative overflow-hidden flex flex-col md:flex-row">
             <div 
               className="flex-grow relative h-[60vh] md:h-auto bg-slate-200 overflow-hidden cursor-move"
               onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
             >
                <div className="w-full h-full transition-transform duration-75 origin-center" style={{ transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})` }}>
                  <JapanMap isMobile={isMobile} onSelectPrefecture={handleSelectPrefecture} />
                </div>
                <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-white rounded-lg shadow-xl p-2 z-10">
                  <button onClick={() => setMapScale(Math.min(mapScale + 0.5, 4))} className="p-3 hover:bg-slate-100 rounded text-slate-600"><Plus size={24} /></button>
                  <button onClick={() => setMapScale(Math.max(mapScale - 0.5, 0.5))} className="p-3 hover:bg-slate-100 rounded text-slate-600"><Minus size={24} /></button>
                  <button onClick={() => { setMapScale(1); setMapPosition({x:0, y:0}); }} className="p-3 hover:bg-slate-100 rounded text-slate-600"><RefreshCw size={20} /></button>
                </div>
             </div>
             <div className="w-full md:w-96 bg-white shadow-xl border-l border-slate-200 p-6 overflow-y-auto h-[40vh] md:h-auto z-20">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><MapIcon className="text-teal-500" /> 地域から探す</h2>
                {selectedPrefVideos.length > 0 ? (
                  <div className="space-y-6 animate-in slide-in-from-right duration-300">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <h3 className="font-bold text-lg">{selectedPrefVideos[0].location.substring(0, 2)}の教室</h3>
                      <button onClick={() => setSelectedPrefVideos([])} className="text-xs text-slate-400 hover:text-slate-600">クリア</button>
                    </div>
                    {selectedPrefVideos.map(video => (
                      <div key={video.id} className="group cursor-pointer" onClick={() => { setView('home'); setPlayingVideo(video); window.scrollTo(0,0); }}>
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

      <footer className="bg-slate-100 border-t border-slate-200 mt-auto py-10">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-teal-600 transition">運営会社</a>
            <a href="#" className="hover:text-teal-600 transition">利用規約</a>
            <a href="#" className="hover:text-teal-600 transition">プライバシーポリシー</a>
            <a href="#" className="hover:text-teal-600 transition">お問い合わせ</a>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Chiikuri. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}