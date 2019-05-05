// Custom youtube-audio-stream with bitrate, start time option
// and reference to ffmpeg process
const ytdl = require('ytdl-core');
const FFmpeg = require('fluent-ffmpeg');
const through = require('through2');
const xtend = require('xtend');
const fs = require('fs');


function streamify(uri, opt, startTimeInSeconds) {
  function filterVideo(format) {
    return (
      format.container === opt.videoFormat
      && format.audioEncoding
    );
  }

  opt = xtend({
    videoFormat: 'mp4',
    quality: 'lowest',
    audioFormat: 'mp3',
    filter: filterVideo,
    applyOptions() { },
  }, opt);

  const video = ytdl(uri, opt);


  const stream = opt.file
    ? fs.createWriteStream(opt.file)
    : through();

  const ffmpeg = new FFmpeg(video);
  opt.applyOptions(ffmpeg);
  let output;
  if (startTimeInSeconds) {
    output = ffmpeg
      .setStartTime(startTimeInSeconds)
      .audioBitrate(128)
      .format(opt.audioFormat)
      .pipe(stream);
  } else {
    output = ffmpeg
      .audioBitrate(128)
      .format(opt.audioFormat)
      .pipe(stream);
  }
  video.on('info', stream.emit.bind(stream, 'info'));
  output.on('error', video.end.bind(video));
  output.on('error', stream.emit.bind(stream, 'error'));
  return {
    stream,
    ffmpeg,
  };
}

module.exports = streamify;
