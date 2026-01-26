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
    
    // index.htmlを読み込み
    console.log('\nReading index.html...');
    let html = fs.readFileSync('index.html', 'utf8');
    
    // マーカーを検索
    const startMarker = '<!-- YOUTUBE_VIDEOS_START -->';
    const endMarker = '<!-- YOUTUBE_VIDEOS_END -->';
    
    const startIndex = html.indexOf(startMarker);
    const endIndex = html.indexOf(endMarker);
    
    if (startIndex === -1 || endIndex === -1) {
      console.error('❌ Markers not found in index.html');
      console.error(`Start marker found: ${startIndex !== -1}`);
      console.error(`End marker found: ${endIndex !== -1}`);
      process.exit(1);
    }
    
    console.log('✅ Markers found');
    console.log(`  Start: ${startIndex}`);
    console.log(`  End: ${endIndex}`);
    
    // HTMLを置換
    const before = html.substring(0, startIndex + startMarker.length);
    const after = html.substring(endIndex);
    const newHTML = before + '\n' + videoHTML + '                ' + after;
    
    // ファイルに書き込み
    console.log('\nWriting updated index.html...');
    fs.writeFileSync('index.html', newHTML, 'utf8');
    
    console.log('✅ Successfully updated YouTube videos!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 実行
updateHTML();
