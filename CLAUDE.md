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
public/                 配信される静的ファイル
  favicon.svg, ogp.png    URLを固定したいので直下に置く
  images/<種類>/          配信用の軽量画像（WebP）。brand / videos など。自動生成物
assets-src/images/<種類>/ 画像の元データ（jpg/png）。配信されない。ここが原本
scripts/optimize-images.mjs  元画像→public/images のWebP変換（npm run images）
src/
  App.tsx               全体の状態管理。画面切替は view ステート（ルーターは使っていない）
  types.ts              共通の型（Video / Instructor / UserInfo / View / MapPath）
  lib/assets.ts         画像URLの組み立て（imageUrl / LOGO_URL）。配信元の切替口
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
- 動画を追加するときは `src/data.ts` の `allVideosData` に `Video` 型で足す。
- 画像の追加手順: ①元画像を `assets-src/images/<種類>/` に置く → ②`npm run images` → ③`imageUrl("<種類>/<名前>.webp")` で参照する。`public/images/` は直接編集しない。
- 画像のURLは必ず `imageUrl()` / `LOGO_URL` を通す（将来CDNへ移すときに `VITE_ASSET_BASE_URL` だけで切り替えられるようにするため）。
- 一覧・サムネ等のimgには `loading="lazy" decoding="async"` を付ける。
- 外部画像URL（Unsplash等）はリンク切れしやすいので避ける。現状 `data.ts` の講師アイコンと一部の動画サムネが外部URLのまま（要置き換え）。
- **動画ファイル（mp4等）はこのリポジトリに入れない。** Gitが肥大化し、Vercelの容量制限にも当たる。動画は外部の動画配信サービスに置き、データにはURL/IDだけを持たせる（選定は動画再生の実装時）。
- 画像が数百枚規模になったら、`public/` から外部ストレージ（Supabase Storage / Cloudflare R2 / Cloudinary 等）へ移し、`VITE_ASSET_BASE_URL` を設定する。
- 地図のピンは動画の `location` の先頭2文字（都道府県名）と `MapData.ts` の `name` の前方一致で決まる。`location` は「福井県…」のように都道府県から書く。
- Tailwindのクラスで直接スタイルする（独自CSSは `src/index.css` の最小限のみ）。
- 本物の認証を入れる場合、認証情報（ID/パスワード/APIキー）をソースに書かない。環境変数かBaaS（Supabase / Firebase Auth 等）を使う。

## 実装の優先順位
1. 動画再生（`VideoPlayer`）
2. 検索（`Hero` の検索欄）
3. 会員登録（最後。認証方式は実装時に選定）

## デプロイ
GitHubへのpushでVercelが自動デプロイする。本番URLに反映されるのは `main` へのpushのみ（確認済み）。それ以外のブランチはプレビューURLになる。
現在は開発者がオーナー1人のため **`main` に直接pushしてよい**（オーナーの許可済み）。他の人が関わる合図があったら、ブランチ＋PR運用に切り替える。

## 公開前のTODO（確認事項）
- 独自ドメインを決めたら `index.html` の canonical / `og:url` / `og:image` / `twitter:image` を差し替える。
- OGP画像（`public/ogp.png`）は仮。デザイン確定後に差し替える。
- プライバシーポリシー（`Pages.tsx`）は運営会社・サービス名を入れた仮案。お問い合わせ窓口は暫定で運営会社のページ。**本番前に法務/専門家の確認を受ける**。
- フッターの「お問い合わせ」は `href="#"` のまま。
- Xの公式アカウントを作ったら `twitter:site` を追加する。
