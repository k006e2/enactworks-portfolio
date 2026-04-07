const fs = require('fs');
const https = require('https');

// 環境変数から取得
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCSmRCFH6iy1uvoXJbLwxMHg'; // @VTKOOLEs の正しいチャンネルID

console.log('=== YouTube Video Updater ===');
console.log('Channel ID:', CHANNEL_ID);
console.log('API Key exists:', !!YOUTUBE_API_KEY);

// YouTube Data APIからデータを取得
function fetchYouTubeData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    }).on('error', (err) => {
      reject(new Error(`HTTP request failed: ${err.message}`));
    });
  });
}

// 最新動画を取得
async function getLatestVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=10`;
  
  console.log('\nFetching latest videos...');
  const data = await fetchYouTubeData(url);
  
  // エラーチェック
  if (data.error) {
    console.error('YouTube API Error:');
    console.error(JSON.stringify(data.error, null, 2));
    return [];
  }
  
  // データ確認
  if (!data.items) {
    console.log('No items in response');
    console.log('Response:', JSON.stringify(data, null, 2).substring(0, 500));
    return [];
  }
  
  console.log(`✅ Found ${data.items.length} videos`);
  
  // デバッグ: 各動画の情報を表示
  data.items.forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.snippet.title.substring(0, 50)}...`);
  });
  
  return data.items;
}

// 日付フォーマット (YYYY.MM.DD)
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

// HTMLを生成
function generateVideoHTML(videos) {
  if (videos.length === 0) {
    console.log('⚠️  No videos to generate HTML for');
    return '';
  }
  
  let html = '';
  
  videos.forEach((video) => {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.medium.url;
    const publishedAt = formatDate(video.snippet.publishedAt);
    
    html += `
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="news-card" style="text-decoration: none; color: inherit;">
                    <div class="news-image">
                        <img src="${thumbnail}" alt="${title}">
                        <span class="news-badge">動画</span>
                    </div>
                    <div class="news-content">
                        <time class="news-date">${publishedAt}</time>
                        <h3 class="news-title">${title}</h3>
                    </div>
                </a>
                `;
  });
  
  return html;
}

// チャンネル統計（登録者数・総再生回数）を取得
async function getChannelStats() {
  const url = `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${CHANNEL_ID}&part=statistics`;

  console.log('\nFetching channel stats...');
  const data = await fetchYouTubeData(url);

  if (data.error || !data.items || data.items.length === 0) {
    console.error('Failed to fetch channel stats');
    return null;
  }

  const stats = data.items[0].statistics;
  const subscribers = parseInt(stats.subscriberCount, 10);
  const views = parseInt(stats.viewCount, 10);
  console.log(`✅ Subscribers: ${subscribers}, Views: ${views}`);
  return { subscribers, views };
}

// 数値を X.X万+ 形式にフォーマット（1000単位で四捨五入）
function formatCount(count) {
  if (count >= 100000000) {
    return (Math.round(count / 10000000) / 10) + '億+';
  } else if (count >= 10000000) {
    return Math.round(count / 10000) + '万+';
  } else if (count >= 10000) {
    return (Math.round(count / 1000) / 10) + '万+';
  } else if (count >= 1000) {
    return (Math.round(count / 100) / 10) + '千+';
  }
  return count + '';
}

// マーカー間のテキストを置換するヘルパー
function replaceMarker(html, startMarker, endMarker, newContent) {
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker);
  if (startIndex === -1 || endIndex === -1) return null;
  return html.substring(0, startIndex + startMarker.length) + newContent + html.substring(endIndex);
}

// index.htmlを更新
async function updateHTML() {
  try {
    // 動画を取得
    const videos = await getLatestVideos();

    // HTMLを生成
    console.log('\nGenerating HTML...');
    const videoHTML = generateVideoHTML(videos);
    console.log(`Generated HTML length: ${videoHTML.length} characters`);

    if (videoHTML.length === 0) {
      console.log('⚠️  No HTML generated, skipping file update');
      process.exit(0);
    }

    // チャンネル統計を取得
    const channelStats = await getChannelStats();

    // index.htmlを読み込み
    console.log('\nReading index.html...');
    let html = fs.readFileSync('index.html', 'utf8');
    let workshopHtml = fs.existsSync('workshop/index.html') ? fs.readFileSync('workshop/index.html', 'utf8') : null;

    // 動画セクションを置換
    const updated = replaceMarker(html, '<!-- YOUTUBE_VIDEOS_START -->', '<!-- YOUTUBE_VIDEOS_END -->', '\n' + videoHTML + '                ');
    if (updated === null) {
      console.error('❌ Video markers not found in index.html');
      process.exit(1);
    }
    html = updated;

    // 登録者数・総再生回数を置換（numbers / ABOUT / SHOP の各セクション）
    if (channelStats !== null) {
      const formattedSubs = formatCount(channelStats.subscribers);
      const formattedViews = formatCount(channelStats.views);

      const subsMarkers = [
        ['<!-- YOUTUBE_SUBSCRIBERS_START -->', '<!-- YOUTUBE_SUBSCRIBERS_END -->'],
        ['<!-- YOUTUBE_SUBSCRIBERS_ABOUT_START -->', '<!-- YOUTUBE_SUBSCRIBERS_ABOUT_END -->'],
        ['<!-- YOUTUBE_SUBSCRIBERS_SHOP_START -->', '<!-- YOUTUBE_SUBSCRIBERS_SHOP_END -->'],
      ];
      const viewsMarkers = [
        ['<!-- YOUTUBE_VIEWS_START -->', '<!-- YOUTUBE_VIEWS_END -->'],
        ['<!-- YOUTUBE_VIEWS_ABOUT_START -->', '<!-- YOUTUBE_VIEWS_ABOUT_END -->'],
      ];

      subsMarkers.forEach(function([start, end]) {
        const result = replaceMarker(html, start, end, formattedSubs);
        if (result === null) { console.warn(`⚠️  Marker not found: ${start}`); }
        else { html = result; }
      });
      console.log(`✅ Subscribers updated: ${formattedSubs}`);

      viewsMarkers.forEach(function([start, end]) {
        const result = replaceMarker(html, start, end, formattedViews);
        if (result === null) { console.warn(`⚠️  Marker not found: ${start}`); }
        else { html = result; }
      });
      console.log(`✅ Views updated: ${formattedViews}`);

      // workshop/index.html のマーカーも更新
      if (workshopHtml !== null) {
        const workshopSubsMarkers = [
          ['<!-- YOUTUBE_SUBSCRIBERS_WORKSHOP_HERO_START -->', '<!-- YOUTUBE_SUBSCRIBERS_WORKSHOP_HERO_END -->'],
          ['<!-- YOUTUBE_SUBSCRIBERS_WORKSHOP_STATS_START -->', '<!-- YOUTUBE_SUBSCRIBERS_WORKSHOP_STATS_END -->'],
        ];
        const workshopViewsMarkers = [
          ['<!-- YOUTUBE_VIEWS_WORKSHOP_HERO_START -->', '<!-- YOUTUBE_VIEWS_WORKSHOP_HERO_END -->'],
          ['<!-- YOUTUBE_VIEWS_WORKSHOP_STATS_START -->', '<!-- YOUTUBE_VIEWS_WORKSHOP_STATS_END -->'],
        ];
        workshopSubsMarkers.forEach(function([start, end]) {
          const result = replaceMarker(workshopHtml, start, end, formattedSubs);
          if (result === null) { console.warn(`⚠️  Workshop marker not found: ${start}`); }
          else { workshopHtml = result; }
        });
        workshopViewsMarkers.forEach(function([start, end]) {
          const result = replaceMarker(workshopHtml, start, end, formattedViews);
          if (result === null) { console.warn(`⚠️  Workshop marker not found: ${start}`); }
          else { workshopHtml = result; }
        });
        fs.writeFileSync('workshop/index.html', workshopHtml, 'utf8');
        console.log(`✅ workshop/index.html updated: subs=${formattedSubs}, views=${formattedViews}`);
      }
    }

    // portfolio-data.js キャッシュバスター更新
    const today = new Date();
    const version = today.getFullYear().toString()
      + String(today.getMonth() + 1).padStart(2, '0')
      + String(today.getDate()).padStart(2, '0');
    html = html.replace(/portfolio-data\.js\?v=\d{8}/, 'portfolio-data.js?v=' + version);
    console.log(`✅ Cache buster updated: v=${version}`);

    // ファイルに書き込み
    console.log('\nWriting updated index.html...');
    fs.writeFileSync('index.html', html, 'utf8');

    console.log('✅ Successfully updated index.html!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 実行
updateHTML();
