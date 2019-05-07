const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const morgan = require('morgan');
const stream = require('./stream');
const apiRequest = require('./apiRequest');

const app = express();

// Log http requests
app.use(morgan('dev'));
// enable ssl redirect
app.use(sslRedirect());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// SOURCE URL FOR AUDIO
app.get('/api/play/:videoId', (req, res) => {
  try {
    const requestUrl = `https://www.youtube.com/watch?v=${req.params.videoId}`;
    apiRequest.getDuration(req.params.videoId).then((duration) => {
      if (duration === 0) {
        ytdl.getInfo(requestUrl, (err, info) => {
          const liveStreamURL = ytdl.chooseFormat(info.formats, {
            quality: 'highestaudio',
          }).url;
          ffmpeg(liveStreamURL)
            .audioCodec('libmp3lame')
            .format('mp3')
            .on('error', (err) => {
              // logger.error('ffmpeg error:', err.message);
            })
            .audioBitrate(128)
            .pipe(res);
        });
      } else {
        const contentType = 'audio/mpeg';
        // calculate length in bytes, (((bitrate * (lengthInSeconds)) /
        //                          bitsToKiloBytes) * kiloBytesToBytes)
        // using 125 instead of 128 because it is more accurate
        const durationInBytes = (((125 * (duration)) / 8) * 1024);
        if (req.headers.range) {
          const { range } = req.headers;
          const parts = range.replace(/bytes=/, '').split('-');
          const partialstart = parts[0];
          const partialend = parts[1];

          const start = parseInt(partialstart, 10);
          const end = partialend
            ? parseInt(partialend, 10)
            : durationInBytes - 1;

          const chunksize = (end - start) + 1;
          res.writeHead(206, {
            'Content-Type': contentType,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Range': `bytes ${start}-${end}/${durationInBytes}`,
          });

          // convert start in bytes to start in seconds
          // minus one second to prevent content length error
          const startInSeconds = (start / (1024 * 125) * 8 - 1);
          const streamObj = stream(requestUrl, {}, startInSeconds);
          streamObj.stream.pipe(res);
          setTimeout(() => {
            if (streamObj.ffmpeg !== undefined) {
              // runningCommands[req.sessionID].push(streamObj.ffmpeg);
            }
          }, 200);
        } else {
          res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': durationInBytes,
            'Transfer-Encoding': 'chunked',
          });
          const streamObj = stream(requestUrl);
          streamObj.stream.pipe(res);
          setTimeout(() => {
            if (streamObj.ffmpeg !== undefined) {
              // runningCommands[req.sessionID].push(streamObj.ffmpeg);
            }
          }, 200);
        }
      }
    }).catch((err) => {
      if (err) {
        // logger.error(`API Play: ${err}`);
        // io.to(`${connectedClients[req.sessionID]}`)
        // .emit('video error', err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});


// Search Route
app.get('/results', (req, res) => {
  apiRequest.buildSearch(req.query.searchQuery).then((searchResults) => {
    res.type('json');
    res.write(JSON.stringify(searchResults));
    res.end();
  });
});

// Trending Route
app.get('/trending', (req, res) => {
  apiRequest.buildTrendingVideos().then((results) => {
    res.type('json');
    res.write(JSON.stringify(results));
    res.end();
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
