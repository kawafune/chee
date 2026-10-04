// 画像URLの組み立てを1か所に集約する。
// 将来CDNや外部ストレージへ移すときは、環境変数 VITE_ASSET_BASE_URL（例: https://cdn.example.com）を
// 設定するだけで、すべての画像の配信元を切り替えられる。
const ASSET_BASE_URL: string = import.meta.env.VITE_ASSET_BASE_URL ?? '';

// 例: imageUrl('videos/miso.webp') -> /images/videos/miso.webp
export const imageUrl = (path: string): string => `${ASSET_BASE_URL}/images/${path}`;

export const LOGO_URL = imageUrl('brand/chiicri_logo.png');
