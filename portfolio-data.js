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
 *   thumbnailRatio: "1 / 1"（任意。モーダルのサムネイル比率。既定は 16/9）,
 *   youtubeId:   "YouTubeの動画ID（設定すると日付・再生回数を自動取得）",
 *   date:        "YYYY-MM-DD 形式（新着順ソートに使用。空の場合は末尾に表示）",
 *   type:        "カテゴリ（例: プロモーション / オリジナル曲 / ラジオ など）",
 *   services:    ["promotion", "video"]（任意。SERVICE の実績事例に出す紐付け）,
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
        id: "chillhabit-promo",
        title: "【CHILL HABIT】味のTier作りながら乗り換えレベルで美味いシーシャ見つけたので紹介する【#PR】",
        thumbnail: "https://img.youtube.com/vi/AorH0yYfSl8/maxresdefault.jpg",
        youtubeId: "AorH0yYfSl8",
        services: ["promotion"],
        date: "",
        type: "プロモーション",
        description: "",
        links: [
            { label: "配信アーカイブを見る", url: "https://youtube.com/live/AorH0yYfSl8" }
        ]
    },

    {
        id: "streamart-real-gacha-2026",
        title: "特別な夏をお届け！KOOLEsの限定リアルグッズ＆甘々夏デートシチュボ",
        thumbnail: "streamart-gacha.jpg",
        thumbnailRatio: "1 / 1",
        date: "2026-08-14",
        type: "グッズ展開",
        description: "販売期間：2026年8月14日〜9月30日 / 渋谷109フォーラムビジョンにて放映（8月13日〜9月12日頃）",
        links: [
            { label: "ガチャページを見る", url: "https://www.streamart.tokyo/real_gacha/430/" },
            { label: "渋谷109ビジョン放映のお知らせ", url: "https://x.com/eternalmedal/status/2087735895331922117" }
        ]
    },

    {
        id: "streamart-goods-event",
        services: ["promotion"],
        title: "【Streamart】KOOLEsオリジナルリアルグッズ発売イベント【#PR】",
        thumbnail: "https://img.youtube.com/vi/mfoZCz7QKhY/maxresdefault.jpg",
        youtubeId: "mfoZCz7QKhY",
        date: "",
        type: "プロモーション",
        description: "",
        links: [
            { label: "配信アーカイブを見る", url: "https://youtube.com/live/mfoZCz7QKhY" }
        ]
    },

    {
        id: "foxyu-collab-yandere",
        services: ["promotion", "video"],
        title: "【ヤンデレ×FoxyU】バーで出会ったかわいいもの大好きのマフィアに気に入られて執着される話【#PR】",
        thumbnail: "https://img.youtube.com/vi/GD4XS4M7qFY/maxresdefault.jpg",
        youtubeId: "GD4XS4M7qFY",
        date: "",
        type: "プロモーション",
        description: "",
        links: [
            { label: "動画を見る", url: "https://www.youtube.com/watch?v=GD4XS4M7qFY" }
        ]
    },

    {
        id: "foxyu-promo",
        services: ["promotion"],
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
        id: "crushie-ai-shorts",
        services: ["promotion", "video"],
        title: "【Crushie AI】真面目プレイとふざけプレイでときめきメモの内容は変わるのか？【#PR】",
        thumbnail: "https://img.youtube.com/vi/5UcXUx3qzA4/maxresdefault.jpg",
        youtubeId: "5UcXUx3qzA4",
        date: "",
        type: "プロモーション",
        description: "",
        links: [
            { label: "動画を見る", url: "https://youtube.com/shorts/5UcXUx3qzA4" }
        ]
    },

    {
        id: "lords-mobile-promo",
        services: ["promotion"],
        title: "ロードモバイル 春の覇王祭",
        thumbnail: "ローモバ.jpg",
        date: "2026-04-24",
        type: "プロモーション",
        description: "動画本数：<!-- LORDS_COUNT_START -->18<!-- LORDS_COUNT_END -->本（4/24〜5/25） / 総再生回数：<!-- LORDS_VIEWS_START -->1.4万+<!-- LORDS_VIEWS_END -->",
        links: [
            { label: "再生リストを見る", url: "https://www.youtube.com/playlist?list=PLZI6abDvigFt_P7mvKZrhAjFMOYROXziR" }
        ]
    },

    {
        id: "crushie-ai-promo",
        services: ["promotion", "video"],
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
        services: ["promotion", "video"],
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
        services: ["promotion"],
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
        services: ["promotion"],
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
        services: ["video"],
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

// =============================================
// 提供サービス（SERVICE セクション）
// =============================================
//
// カード表面には priceFrom を出し、クリックで開くモーダルに
// items（料金の内訳）と、services タグで紐付いた実績事例を表示します。
//
//   id:        portfolioData の services タグと対応させる文字列
//   priceFrom: カード表面に出す代表価格。主力メニューの価格を入れる
//   items:     モーダルに出す料金の内訳
//   worksLimit: 実績事例の表示件数（新しい順）。0 なら実績欄を出さない
//
const serviceData = [

    {
        id: "voice",
        icon: "fa-microphone-alt",
        title: "ボイスワーク",
        summary: ["ナレーション収録", "キャラクターボイス", "実況・解説音声", "音声編集・加工"],
        priceFrom: "5,000円〜",
        items: [
            { name: "ナレーション収録（宅録）", price: "5,000円〜" },
            { name: "キャラクターボイス", price: "要相談" },
            { name: "音声編集・加工", price: "3,000円〜" }
        ],
        note: "※内容により変動します。お気軽にご相談ください。",
        worksLimit: 0
    },

    {
        id: "video",
        icon: "fa-video",
        title: "動画制作",
        summary: ["動画編集", "収録"],
        priceFrom: "50,000円〜",
        items: [
            { name: "動画編集、収録", price: "50,000円〜（内容により変動）" }
        ],
        note: "※内容により変動します。お気軽にご相談ください。",
        worksLimit: 3
    },

    {
        id: "promotion",
        icon: "fa-bullhorn",
        title: "プロモーション",
        summary: ["ライブ配信＋切り抜き", "長尺動画 / Shorts", "大型・複数本企画"],
        // 表示は推奨プランを主にする。入口の価格は下に小さく添える
        priceFrom: "180,000円",
        priceBadge: "推奨",
        priceNote: "Shorts単体 70,000円〜",
        // 料金表「形態別レートカード（内部基準）」の写し。降順で並べる。
        // 上端に数字を置かないのは、大型案件の交渉に天井を作らないため
        items: [
            { name: "大型・複数本企画", price: "別途お見積り" },
            { name: "フルパッケージ（配信＋長尺再編集）", price: "230,000円" },
            { name: "ライブ配信＋切り抜きShorts", price: "180,000円", badge: "推奨" },
            { name: "長尺動画1本（＋サムネ）", price: "120,000円" },
            { name: "Shorts動画1本", price: "70,000円" }
        ],
        note: "※二次利用・広告利用（90日）は別途。内容により変動しますので、お気軽にご相談ください。",
        worksLimit: 3
    }

];
