const express = require("express");
const stream = require("youtube-audio-stream");
const apiRequest = require("./apiRequest");

const app = express();

app.use(express.static(__dirname + "/public"));

// SOURCE URL FOR AUDIO
app.get("/api/play/:videoId", (req, res) => {
	let requestUrl = "http://youtube.com/watch?v=" + req.params.videoId;
	try {
		apiRequest.getDuration(req.params.videoId).then((duration) => {
			// calculate length in bytes, (((bitrate * (lengthInSeconds - minusFiveThisIsAnEstimateBecauseItSeemsToBeOffByThis)) / bitsToBytes) * kiloBytesToBytes)
			var durationInBytes = (((128 * (duration - 4)) / 8) * 1024);
			res.writeHead(200, {
				'Content-Length': durationInBytes,
				'Transfer-Encoding': 'chuncked',
			});
			stream(requestUrl).pipe(res);
		}).catch((err) => {
			if (err) {
				// do nothing
			}
		});
	} catch (exception) {
		res.status(500).send(exception);
	}
});

// Search Route
app.get("/results", (req, res) => {
	apiRequest.buildSearch(req.query.searchQuery).then((searchResults) => {
		res.type("json");
		res.write(JSON.stringify(searchResults));
		res.end();
	})
});

// Trending Route
app.get("/trending", (req, res) => {
	apiRequest.buildTrendingVideos().then((results) => {
		res.type("json");
		res.write(JSON.stringify(results));
		res.end();
	})
});

let port = 3001;
app.listen(port, () => {
	console.log(`Server started on ${port}`);
});