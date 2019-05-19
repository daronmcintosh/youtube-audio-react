const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const path = require('path');
const log = require('loglevel');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const cache = require('memory-cache');
const youtubeAudioStream = require('@isolution/youtube-audio-stream');
const apiRequest = require('./apiRequest');
const config = require('./config');

const port = process.env.PORT || 3001;
const app = express();

app.use(helmet());
app.use(cors());
app.use(sslRedirect());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client/build')));

// Middleware to cache response for a specific amount of seconds
const cacheMiddleware = duration => (req, res, next) => {
  const key = `__express__${req.originalUrl || req.url}`;
  const cachedBody = cache.get(key);
  if (cachedBody) {
    res.send(cachedBody);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  }
};

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
      // We want to remove all the previous listeners before registering new ones
      stream.emitter.removeAllListeners('error');
      stream.emitter.on('error', (err) => {
        next(err);
      });
      stream.pipe(res);
    })
    .catch((err) => {
      next(err);
    });
});

// Search Route
app.get('/results', (req, res, next) => {
  apiRequest
    .buildSearch(req.query.searchQuery)
    .then((searchResults) => {
      res.json(searchResults);
    })
    .catch((err) => {
      next(err);
    });
});

// Trending Route - caches response for 24hrs
app.get('/trending', cacheMiddleware(86400), (req, res, next) => {
  apiRequest
    .buildTrendingVideos()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      next(err);
    });
});

// Send build page for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

// Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  log.error(err.message);

  if (!config.isProduction) {
    log.trace(err.stack);
  }
  // TODO: send socket.io error messages here
  // if (res.headersSent) {
  //   return res.end();
  // }

  res.end();
  // return res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

app.listen(port, () => {
  log.info(`Server started on ${port}`);
});
