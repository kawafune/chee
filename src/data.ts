// src/data.ts
import type { Instructor, Video } from './types';

export const categories = ["郷土料理", "伝統工芸", "健康・暮らし"];

// 講師データ (上手くいっていた顔画像)
export const instructorsData: Record<string, Instructor> = {
  "田中 節子": { name: "田中 節子", title: "福井の郷土料理研究家", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80" },
  "佐藤 ヨネ": { name: "佐藤 ヨネ", title: "信州の食文化伝承者", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&q=80" },
  "山本 健一": { name: "山本 健一", title: "竹細工職人・歴40年", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" },
  "美空 ハナ": { name: "美空 ハナ", title: "シニアヨガインストラクター", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" },
  "鈴木 健造": { name: "鈴木 健造", title: "味噌作り名人", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" },
  "高橋 漁太": { name: "高橋 漁太", title: "三陸の漁師", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
  "藍田 染子": { name: "藍田 染子", title: "藍染め作家", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
  "土屋 陶吉": { name: "土屋 陶吉", title: "益子焼陶芸家", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
  "健康 太郎": { name: "健康 太郎", title: "ラジオ体操指導員", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80" }, 
};

// 動画データ (リンク切れしない定番の日本風景写真に変更)
export const allVideosData: Video[] = [
  // 郷土料理
  { 
    id: 101, category: "郷土料理", title: "鯖のへしこ：秋の仕込み 完全密着", instructor: "田中 節子", location: "福井県敦賀市", date: "2026.02.15", 
    // ▼ 富士山をやめて、「海に浮かぶ美しい鳥居（日本の海）」の画像に変更
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&q=80", 
    duration: "15:00", isPremium: false, 
    description: "福井県敦賀市に伝わる伝統の保存食「へしこ」。40年以上作り続けてきた田中さんが、選び抜かれた鯖と糠を使った秘伝の仕込み作業を公開します。" 
  },
  { 
    id: 102, category: "郷土料理", title: "山菜おこわの蒸し方（会員限定）", instructor: "佐藤 ヨネ", location: "長野県安曇野市", date: "2026.02.18", 
    // ▼ リンク切れ修正：「緑豊かな日本の風景」
    image: "/okowa.jpg", 
    duration: "12:30", isPremium: true, 
    description: "春の訪れを告げる山菜おこわ。もち米の吸水時間から、蒸し器の火加減まで、失敗しないコツを丁寧に解説します。" 
  },
  { 
    id: 103, category: "郷土料理", title: "手作り味噌：大豆の処理から", instructor: "鈴木 健造", location: "新潟県長岡市", date: "2026.02.20", 
    image: "/miso.jpg", 
    duration: "25:00", isPremium: false, 
    description: "「手前味噌」を作りませんか？大豆を煮るところから麹と混ぜ合わせるまで、一年に一度の大仕事を動画でサポートします。" 
  },
  { 
    id: 104, category: "郷土料理", title: "秋刀魚のぬか漬け：漁師の味", instructor: "高橋 漁太", location: "岩手県釜石市", date: "2026.02.25", 
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=640&q=80", 
    duration: "18:20", isPremium: false, 
    description: "浜の男たちが愛する保存食。新鮮な秋刀魚を糠に漬け込み、冬の間の貴重なタンパク源として楽しむ知恵をお教えします。" 
  },
  { 
    id: 105, category: "郷土料理", title: "梅干し作り：塩加減の極意", instructor: "田中 節子", location: "福井県敦賀市", date: "2026.03.01", 
    image: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?auto=format&fit=crop&w=640&q=80", 
    duration: "08:45", isPremium: true, 
    description: "カビさせない、皮が破れない。梅干し作りで最も重要な「塩分濃度」と「干すタイミング」について、長年の経験から導き出された黄金比を伝授。" 
  },
  
  // 伝統工芸
  { 
    id: 201, category: "伝統工芸", title: "竹細工：基本の竹割り体験", instructor: "山本 健一", location: "長野県松本市", date: "2026.02.28", 
    // ▼ リンク切れ修正：「青々とした美しい竹林」
    image: "/take.jpg", 
    duration: "20:00", isPremium: false, 
    description: "竹籠作りの第一歩は「竹割り」から。ナタの使い方、竹の節の越え方など、職人の身体使いをじっくり観察できます。" 
  },
  { 
    id: 203, category: "伝統工芸", title: "藍染め：絞りの技法入門", instructor: "藍田 染子", location: "徳島県徳島市", date: "2026.03.10", 
    // ▼ 今回はそのまま (リンク生きているはず)
    image: "/aizome.jpg", 
    duration: "22:15", isPremium: true, 
    description: "世界に一つだけの模様を作る「絞り染め」。輪ゴムやビー玉を使った簡単な方法から、伝統的な縫い絞りまで紹介します。" 
  },
  { 
    id: 204, category: "伝統工芸", title: "陶芸：ろくろの回し方・基礎", instructor: "土屋 陶吉", location: "栃木県益子町", date: "2026.02.21", 
    // ▼ リンク切れ修正：「日本の伝統的な瓦屋根と自然風景」
    image: "/rokuro.jpg", 
    duration: "40:00", isPremium: false, 
    description: "土の中心を捉える「土殺し」の技法を中心に、電動ろくろの基本操作をレクチャー。初心者必見の動画です。" 
  },
  
  // 健康・暮らし
  { 
    id: 301, category: "健康・暮らし", title: "毎朝のラジオ体操：正しい動き", instructor: "健康 太郎", location: "東京都杉並区", date: "毎週月〜金", 
    image: "/radio.jpg", 
    duration: "05:00", isPremium: false, 
    description: "誰もが知っているラジオ体操、実は正しく動かすとかなりの運動量になります。指先、呼吸まで意識した「本気のラジオ体操」です。" 
  },
  { 
    id: 302, category: "健康・暮らし", title: "椅子に座ってできる簡単ヨガ", instructor: "美空 ハナ", location: "神奈川県横浜市", date: "2026.02.19", 
    image: "/yoga.jpg", 
    duration: "15:00", isPremium: false, 
    description: "膝や腰に不安がある方でも安心。椅子に座ったままできるストレッチと呼吸法で、心と体をリフレッシュさせましょう。" 
  },
];