# ちぃくり（chee）

地域の職人・先生から郷土料理・伝統工芸・暮らしの知恵を動画で学べるプラットフォームのフロントエンド。
運営: 合同会社Happiino。公開URL: https://chee-ochre.vercel.app/（Vercelにデプロイ）

## 現状（重要）
- **フロントエンドのみ**。バックエンド・DB・本物の認証・動画配信は未実装。
- 動画・講師・地図のデータは `src/data.ts` / `src/MapData.ts` に直書きのダミー。
- 「検索」「会員登録」「シェア」「教室予約」「プロフィール」は未実装で、押すと `ComingSoonModal`（準備中の案内）を出す。
- ID/パスワードによる簡易ログインは**廃止済み**。認証が必要な機能は今のところ存在しない。
- 「いいね」とマイページの内容はメモリ上のみ（リロードで消える）。
- 会員限定動画（`isPremium: true`）は表示上ロックされているだけで、再生機能自体がまだ無い。

## 技術構成
Vite 4 + React 18 + TypeScript（strict）+ Tailwind CSS 3 + lucide-react。

```
npm run dev      # 開発サーバー
npm run build    # tsc（型チェック）+ vite build
npm run preview  # ビルド結果の確認
```
テストとlintは未導入（`npm run lint` はeslint未インストールのため動かない）。変更後は `npm run build` が通ることを確認する。

## 構成
```
index.html              メタ情報・OGP・Googleアナリティクス・Search Console確認タグ
public/                 静的ファイル（ロゴ、動画サムネ画像、ogp.png 1200x630）
src/
  App.tsx               全体の状態管理。画面切替は view ステート（ルーターは使っていない）
  types.ts              共通の型（Video / Instructor / UserInfo / View / MapPath）
  data.ts               カテゴリ・講師・動画のデータ
  MapData.ts            日本地図のSVGパス（47都道府県）
  components/
    Navigation.tsx      ヘッダー・モバイルメニュー
    Hero.tsx            トップのキャッチと検索欄
    VideoList.tsx       カテゴリ別の動画一覧
    VideoPlayer.tsx     動画詳細モーダル
    MapPage.tsx / JapanMap.tsx  地図から探す（ドラッグ・ピンチ・ズーム）
    Pages.tsx           マイページ、講師になる、会員登録、プライバシーポリシー
    ComingSoonModal.tsx 未実装機能の案内
```

## 開発方針
- 日本語UI。コメントも日本語で書く。
- 型は `src/types.ts` に集約し、`any` は使わない。propsには必ず型を付ける。
- 動画を追加するときは `src/data.ts` の `allVideosData` に `Video` 型で足す。画像は `public/` に置いて `/ファイル名.jpg` で参照する（外部画像URLはリンク切れしやすいので避ける）。
- 地図のピンは動画の `location` の先頭2文字（都道府県名）と `MapData.ts` の `name` の前方一致で決まる。`location` は「福井県…」のように都道府県から書く。
- Tailwindのクラスで直接スタイルする（独自CSSは `src/index.css` の最小限のみ）。
- 本物の認証を入れる場合、認証情報（ID/パスワード/APIキー）をソースに書かない。環境変数かBaaS（Supabase / Firebase Auth 等）を使う。

## 公開前のTODO（確認事項）
- 独自ドメインを決めたら `index.html` の canonical / `og:url` / `og:image` / `twitter:image` を差し替える。
- プライバシーポリシーは仮文面。**本番前に必ず正式版へ差し替える**（個人情報を扱う前提）。
- フッターの「お問い合わせ」は `href="#"` のまま。
- `package.json` の `name` が `vite-react-starter` のまま。`.gitignore` と `_gitignore` が重複している。
- 動画再生・会員登録・検索・予約を実装する際のバックエンド選定。
- Xの公式アカウントを作ったら `twitter:site` を追加する。
