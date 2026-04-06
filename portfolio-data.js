/**
 * 活動実績データ
 *
 * 新しい実績を追加するには、portfolioData 配列に
 * 以下の形式でオブジェクトを追加してください。
 *
 * {
 *   id:          "一意のID（英数字・ハイフン）",
 *   title:       "実績タイトル",
 *   thumbnail:   "サムネイル画像のURL",
 *   youtubeId:   "YouTubeの動画ID（設定すると日付・再生回数を自動取得。不要なら省略可）",
 *   date:        "実施日（youtubeId がある場合は自動取得。YouTube以外の実績のみ手動で入力）",
 *   type:        "カテゴリ（例: プロモーション / オリジナル曲 / ラジオ など）",
 *   description: "概要テキスト（不要な場合は空文字 ''）",
 *   links: [
 *     { label: "ボタンの文言", url: "リンク先URL" },
 *     // 複数設定可能
 *   ]
 * }
 *
 * YouTube のサムネイルは以下の形式で取得できます:
 *   https://img.youtube.com/vi/【動画ID】/maxresdefault.jpg
 *
 * YouTube動画IDの確認方法:
 *   通常動画  → https://www.youtube.com/watch?v=【ここ】
 *   ライブ配信 → https://youtube.com/live/【ここ】
 *   ショート  → https://youtube.com/shorts/【ここ】
 */

// =============================================
// YouTube Data API キー
// Google Cloud Console で取得後、下の '' の中に貼り付けてください
// 取得方法は README または担当者に確認してください
// =============================================
const YOUTUBE_API_KEY = 'AIzaSyAKFCu1B1u4c5EVUz13rO6wromCyj_OYHw';

const portfolioData = [

    {
        id: "zeta-promo-2026",
        title: "zetaアプリプロモーション配信",
        thumbnail: "https://img.youtube.com/vi/WA3bZPZkZz4/maxresdefault.jpg",
        youtubeId: "WA3bZPZkZz4",
        date: "",
        type: "プロモーション",
        description: "",
        links: [
            { label: "配信アーカイブを見る", url: "https://youtube.com/live/WA3bZPZkZz4" },
            { label: "配信切り抜きを見る", url: "https://youtube.com/shorts/RhLC2PChX84" }
        ]
    },

    {
        id: "bslog-2025",
        title: "B's-LOG 2025年7月号掲載",
        thumbnail: "bslog-thumbnail.jpg",
        youtubeId: "q90MpCK7g_U",
        date: "",
        type: "雑誌掲載",
        description: "",
        links: [
            { label: "掲載された号を見る", url: "https://www.bs-log.com/product/bslog/322502001548.html" },
            { label: "配信を見る", url: "https://youtube.com/live/q90MpCK7g_U" }
        ]
    },

    {
        id: "raid-promo",
        title: "RAID: Shadow Legendsプロモーション配信",
        thumbnail: "https://img.youtube.com/vi/p6Uz_WZxsgs/maxresdefault.jpg",
        youtubeId: "p6Uz_WZxsgs",
        date: "",
        type: "プロモーション",
        description: "",
        links: [
            { label: "配信を見る", url: "https://youtube.com/live/p6Uz_WZxsgs" }
        ]
    },

    {
        id: "morning-call-mv",
        title: "【オリジナル曲】モーニングコール【MV】",
        thumbnail: "https://img.youtube.com/vi/YHLtXPRwz_w/maxresdefault.jpg",
        youtubeId: "YHLtXPRwz_w",
        date: "",
        type: "オリジナル曲",
        description: "",
        links: [
            { label: "動画を見る", url: "https://www.youtube.com/watch?v=YHLtXPRwz_w" }
        ]
    },

    {
        id: "zeta-collab-yandere",
        title: "【ヤンデレ×zeta】オンオフ激しい依存体質の問題児バンドマンが世話を焼いてくれるマネージャーに溺愛執着する話【#PR】",
        thumbnail: "https://img.youtube.com/vi/36DYWeo-jBA/maxresdefault.jpg",
        youtubeId: "36DYWeo-jBA",
        date: "",
        type: "プロモーション",
        description: "",
        links: [
            { label: "動画を見る", url: "https://www.youtube.com/watch?v=36DYWeo-jBA" }
        ]
    },

    // ↑ ここに新しい実績を追加（末尾のカンマに注意）

];
