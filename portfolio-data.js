/**
 * 活動実績データ
 *
 * 新しい実績を追加するには、portfolioData 配列に
 * 以下の形式でオブジェクトを追加してください。
 *
 * 【YouTube動画あり】
 * {
 *   id:          "一意のID（英数字・ハイフン）",
 *   title:       "実績タイトル",
 *   thumbnail:   "サムネイル画像のURL",
 *   youtubeId:   "YouTubeの動画ID（設定すると日付・再生回数を自動取得）",
 *   date:        "YYYY-MM-DD 形式（新着順ソートに使用。空の場合は末尾に表示）",
 *   type:        "カテゴリ（例: プロモーション / オリジナル曲 / ラジオ など）",
 *   description: "概要テキスト（不要な場合は空文字 ''）",
 *   links: [
 *     { label: "ボタンの文言", url: "リンク先URL" },
 *   ]
 * }
 *
 * 【テキストのみ（画像なし）】
 * {
 *   id:          "一意のID",
 *   title:       "実績タイトル（モーダル表示用）",
 *   displayText: "ギャラリー表示テキスト（改行は <br> を使用可）",
 *   textOnly:    true,
 *   textStyle:   "orange" または "purple",
 *   date:        "YYYY-MM-DD",
 *   type:        "カテゴリ",
 *   description: "",
 *   links: [{ label: "ボタン文言", url: "URL" }]
 * }
 *
 * YouTube のサムネイルは以下の形式で取得できます:
 *   https://img.youtube.com/vi/【動画ID】/maxresdefault.jpg
 *
 * ※ date は新着順ソートに使われます。新しい日付ほど上に表示されます。
 *   YouTubeアイテムで date を空にした場合、末尾に表示されます。
 */

// =============================================
// YouTube Data API キー
// =============================================
const YOUTUBE_API_KEY = 'AIzaSyAKFCu1B1u4c5EVUz13rO6wromCyj_OYHw';

const portfolioData = [

    {
        id: "foxyu-promo",
        title: "【FoxyU】漫画生成できるAIチャットアプリでヤンデレキャラ作りたい【#PR】",
        thumbnail: "https://img.youtube.com/vi/ghEvo50CDc8/maxresdefault.jpg",
        youtubeId: "ghEvo50CDc8",
        shortsId: "WGLYyN_eE6Y",
        date: "",
        type: "プロモーション",
        description: "",
        links: [
            { label: "配信アーカイブを見る", url: "https://youtube.com/live/ghEvo50CDc8" },
            { label: "切り抜きを見る", url: "https://youtube.com/shorts/WGLYyN_eE6Y" }
        ]
    },

    {
        id: "lords-mobile-promo",
        title: "ロードモバイル 春の覇王祭",
        thumbnail: "ローモバ.jpg",
        date: "2026-04-24",
        type: "プロモーション",
        description: "動画本数：<!-- LORDS_COUNT_START -->18<!-- LORDS_COUNT_END -->本（4/24〜5/25） / 総再生回数：<!-- LORDS_VIEWS_START -->1.3万+<!-- LORDS_VIEWS_END -->",
        links: [
            { label: "再生リストを見る", url: "https://www.youtube.com/playlist?list=PLZI6abDvigFt_P7mvKZrhAjFMOYROXziR" }
        ]
    },

    {
        id: "crushie-ai-promo",
        title: "【Crushie AI】あなただけの恋人に逢えるAIチャットアプリを俺が持てる力全て使って全力紹介する動画【#PR】",
        thumbnail: "https://img.youtube.com/vi/NpazhF4aiVM/maxresdefault.jpg",
        youtubeId: "NpazhF4aiVM",
        date: "",
        type: "プロモーション",
        description: "",
        links: [
            { label: "動画を見る", url: "https://www.youtube.com/watch?v=NpazhF4aiVM" }
        ]
    },

    {
        id: "zeta-collab-yandere",
        title: "【ヤンデレ×zeta】オンオフ激しい依存体質の問題児バンドマンが世話を焼いてくれるマネージャーに溺愛執着する話【#PR】",
        thumbnail: "https://img.youtube.com/vi/36DYWeo-jBA/maxresdefault.jpg",
        youtubeId: "36DYWeo-jBA",
        date: "2026-03-25",
        type: "プロモーション",
        description: "",
        links: [
            { label: "動画を見る", url: "https://www.youtube.com/watch?v=36DYWeo-jBA" }
        ]
    },

    {
        id: "zeta-promo-2026",
        title: "zetaアプリプロモーション配信",
        thumbnail: "https://img.youtube.com/vi/WA3bZPZkZz4/maxresdefault.jpg",
        youtubeId: "WA3bZPZkZz4",
        shortsId: "RhLC2PChX84",
        date: "2026-03-18",
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
        date: "2025-05-20",
        type: "雑誌掲載",
        description: "",
        links: [
            { label: "掲載された号を見る", url: "https://www.bs-log.com/product/bslog/322502001548.html" },
            { label: "配信を見る", url: "https://youtube.com/live/q90MpCK7g_U" }
        ]
    },

    {
        id: "fm8mg-radio",
        title: "ラジオ「Fm8mg」",
        thumbnail: "fm8mg-logo.jpg",
        date: "2024-07-27",
        type: "ラジオ",
        description: "",
        links: [
            { label: "再生リストを見る", url: "https://www.youtube.com/playlist?list=PLeyWgBu424oLlAHXwyowntFdi-aAW6JvJ" }
        ]
    },

    {
        id: "crowdfunding-2023",
        title: "クラウドファンディング達成",
        displayText: "クラウドファンディング<br>達成",
        textOnly: true,
        textStyle: "orange",
        date: "2023-05-31",
        type: "クラウドファンディング",
        description: "",
        links: [
            { label: "プロジェクトを見る", url: "https://www.muevo.jp/campaigns/3709" }
        ]
    },

    {
        id: "interview-2023",
        title: "インタビュー掲載",
        displayText: "インタビュー<br>掲載",
        textOnly: true,
        textStyle: "purple",
        date: "2023-05-02",
        type: "メディア掲載",
        description: "",
        links: [
            { label: "記事を見る", url: "https://media.muevo.jp/articles/9500" }
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
        id: "situation-voice",
        title: "シチュエーションボイス",
        thumbnail: "https://img.youtube.com/vi/Xt2sOrZxmqE/maxresdefault.jpg",
        date: "",
        type: "ボイス作品",
        description: "",
        links: [
            { label: "再生リストを見る", url: "https://www.youtube.com/playlist?list=PLZI6abDvigFvrf2a8jzzzQL2vKQ-cUw6N" }
        ]
    },

    // ↑ ここに新しい実績を追加（末尾のカンマに注意）

];
