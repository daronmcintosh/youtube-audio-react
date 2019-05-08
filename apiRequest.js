const { google } = require('googleapis');
const moment = require('moment');
const config = require('./config');

// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: config.apiKey,
});

async function buildSearch(query) {
  const result = await youtube.search.list({
    type: '',
    q: query,
    maxResults: 25,
    part: 'snippet',
  });
  const searchResults = [];
  const { items } = result.data;

  items.forEach((item) => {
    const searchObj = {};
    const { kind } = item.id;
    if (kind === 'youtube#video') {
      searchObj.id = item.id.videoId;
      searchObj.kind = 'video';
    }
    if (kind === 'youtube#playlist') {
      searchObj.id = item.id.playlistId;
      searchObj.kind = 'playlist';
    }
    if (kind === 'youtube#channel') {
      searchObj.id = item.id.channelId;
      searchObj.kind = 'channel';
    }
    searchObj.channelId = item.snippet.channelId;
    searchObj.title = item.snippet.title;
    searchObj.channelTitle = item.snippet.channelTitle;
    let imageUrl;
    try {
      imageUrl = item.snippet.thumbnails.maxres.url;
    } catch (err) {
      imageUrl = item.snippet.thumbnails.high.url;
    }
    searchObj.imgSrc = imageUrl;
    searchObj.description = item.snippet.description;
    searchResults.push(searchObj);
  });
  return searchResults;
}

async function buildTrendingVideos() {
  const result = await youtube.videos.list({
    part: 'snippet',
    videoCategoryId: '10',
    chart: 'mostPopular',
    regionCode: 'US',
    maxResults: 25,
  });
  const videos = [];
  const { items } = result.data;
  items.forEach((item) => {
    const videoObj = {};
    videoObj.id = item.id;
    videoObj.title = item.snippet.title;
    let imageUrl;
    try {
      imageUrl = item.snippet.thumbnails.maxres.url;
    } catch (err) {
      imageUrl = item.snippet.thumbnails.high.url;
    }
    videoObj.imgSrc = imageUrl;
    videos.push(videoObj);
  });
  return videos;
}

async function getDuration(videoId) {
  let duration = 0;
  await youtube.videos
    .list({
      id: videoId,
      part: 'contentDetails',
    })
    .then((result) => {
      duration = moment.duration(result.data.items[0].contentDetails.duration).asSeconds();
    });
  return duration;
}

module.exports.buildSearch = buildSearch;
module.exports.buildTrendingVideos = buildTrendingVideos;
module.exports.getDuration = getDuration;
