const express = require('express');
const apiRequest = require('./apiRequest');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const stream = require('./stream');
const path = require('path');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// SOURCE URL FOR AUDIO
app.get('/api/play/:videoId', (req, res) => {
	let requestUrl = 'https://www.youtube.com/watch?v=' + req.params.videoId;
	apiRequest.getDuration(req.params.videoId).then((duration) => {
		if (duration === 0) {
			ytdl.getInfo(requestUrl, (err, info) => {
				let liveStreamURL = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' }).url;
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
			let contentType = 'audio/mpeg';
			// calculate length in bytes, (((bitrate * (lengthInSeconds)) / bitsToKiloBytes) * kiloBytesToBytes)
			// using 125 instead of 128 because it is more accurate
			let durationInBytes = (((125 * (duration)) / 8) * 1024);
			if (req.headers.range) {
				let range = req.headers.range;
				let parts = range.replace(/bytes=/, '').split('-');
				let partialstart = parts[0];
				let partialend = parts[1];

				let start = parseInt(partialstart, 10);
				let end = partialend ? parseInt(partialend, 10) : durationInBytes - 1;

				let chunksize = (end - start) + 1;
				res.writeHead(206, {
					'Content-Type': contentType,
					'Accept-Ranges': 'bytes',
					'Content-Length': chunksize,
					'Content-Range': 'bytes ' + start + '-' + end + '/' + durationInBytes
				});

				// convert start in bytes to start in seconds
				// minus one second to prevent content length error
				let startInSeconds = (start / (1024 * 125) * 8 - 1);
				let streamObj = stream(requestUrl, {}, startInSeconds);
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
					'Transfer-Encoding': 'chuncked'
				});
				let streamObj = stream(requestUrl);
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
			// io.to(`${connectedClients[req.sessionID]}`).emit('video error', err.message);
		}
	});
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
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

let port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server started on ${port}`);
});