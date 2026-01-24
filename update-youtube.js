const fs = require('fs');
const https = require('https');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID || 'UCvzQFKQp8F8E9E5TqWvJr1w'; // @VTKOOLEs

// YouTube Data APIからデータを取得
function fetchYouTubeData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// 最新動画3本を取得
async function getLatestVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=3&videoType=upload`;
  const data = await fetchYouTubeData(url);
  return data.items || [];
}

// 最新ライブ配信1本を取得
async function getLatestLive() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&eventType=completed&type=video&maxResults=1`;
  const data = await fetchYouTubeData(url);
  return data.items || [];
}

// 日付フォーマット
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

// HTMLを生成
function generateVideoHTML(videos, liveVideos) {
  let html = '';
  
  // 最新動画3本
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
  
  // 最新ライブ配信1本
  if (liveVideos.length > 0) {
    const video = liveVideos[0];
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.medium.url;
    const publishedAt = formatDate(video.snippet.publishedAt);
    
    html += `
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="news-card" style="text-decoration: none; color: inherit;">
                    <div class="news-image">
                        <img src="${thumbnail}" alt="${title}">
                        <span class="news-badge live">配信</span>
                    </div>
                    <div class="news-content">
                        <time class="news-date">${publishedAt}</time>
                        <h3 class="news-title">${title}</h3>
                    </div>
                </a>
`;
  }
  
  return html;
}

// index.htmlを更新
async function updateHTML() {
  try {
    console.log('Fetching latest videos...');
    const videos = await getLatestVideos();
    console.log(`Found ${videos.length} videos`);
    
    console.log('Fetching latest live stream...');
    const liveVideos = await getLatestLive();
    console.log(`Found ${liveVideos.length} live streams`);
    
    console.log('Generating HTML...');
    const videoHTML = generateVideoHTML(videos, liveVideos);
    console.log(`Generated HTML length: ${videoHTML.length} characters`);
    
    console.log('Reading index.html...');
    let html = fs.readFileSync('index.html', 'utf8');
    
    // NEWSセクションの動画カード部分を置換
    const startMarker = '<!-- YOUTUBE_VIDEOS_START -->';
    const endMarker = '<!-- YOUTUBE_VIDEOS_END -->';
    
    const startIndex = html.indexOf(startMarker);
    const endIndex = html.indexOf(endMarker);
    
    if (startIndex === -1 || endIndex === -1) {
      console.error('Markers not found in index.html');
      process.exit(1);
    }
    
    const before = html.substring(0, startIndex + startMarker.length);
    const after = html.substring(endIndex);
    
    const newHTML = before + '\n' + videoHTML + '\n                ' + after;
    
    console.log('Writing updated index.html...');
    fs.writeFileSync('index.html', newHTML, 'utf8');
    
    console.log('✅ Successfully updated YouTube videos!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateHTML();
