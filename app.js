const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const path = require('path');
const log = require('loglevel');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const youtubeAudioStream = require('@isolution/youtube-audio-stream');
const apiRequest = require('./apiRequest');

const port = process.env.PORT || 3001;
const app = express();

app.use(helmet());
app.use(cors());
app.use(sslRedirect());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client/build')));

// Audio Route
app.get('/api/play/:videoId', (req, res, next) => {
  const { videoId } = req.params;
  const requestUrl = `https://www.youtube.com/watch?v=${videoId}`;
  apiRequest
    .getDuration(videoId)
    .then((duration) => {
      const bitrate = req.body.bitrate || 128;
      const ratio = 0.0234353085554361;
      const size = parseInt(((bitrate - bitrate * ratio) / 8) * 1024 * duration, 10);
      res.set({
        'Content-Length': size,
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes',
      });

      const streamPromise = youtubeAudioStream(requestUrl);
      return streamPromise;
    })
    .then((stream) => {
      stream.on('error', (err) => {
        next(err);
      });
      stream.pipe(res);
    })
    .catch((err) => {
      next(err);
    });
});

// Search Route
app.get('/results', (req, res) => {
  apiRequest.buildSearch(req.query.searchQuery).then((searchResults) => {
    res.json(searchResults);
  });
});

// Trending Route
app.get('/trending', (req, res) => {
  apiRequest.buildTrendingVideos().then((results) => {
    res.json(results);
  });
});

// Send build page for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

// Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  log.trace(err);
  log.error(err.message);

  // res.status(err.status || 500);
  // res.json({
  //   message: err.message,
  // });
});

app.listen(port, () => {
  log.info(`Server started on ${port}`);
});
