const express = require("express");
const stream = require("youtube-audio-stream");
const apiRequest = require("./public/js/apiRequest");

const app = express();

app.use(express.static(__dirname + "/public")); // eslint-disable-line

// SOURCE URL FOR AUDIO
app.get("/api/play/:videoId", function (req, res) {
	let requestUrl = "http://youtube.com/watch?v=" + req.params.videoId;
	try {
		apiRequest.getDuration(req.params.videoId).then(function (duration) {
			// calculate length in bytes, (((bitrate * (lengthInSeconds - minusFiveThisIsAnEstimateBecauseItSeemsToBeOffByThis)) / bitsToBytes) * kiloBytesToBytes)
			var durationInBytes = (((128 * (duration - 4)) / 8) * 1024);
			res.writeHead(200, {
				'Content-Length': durationInBytes,
				'Transfer-Encoding': 'chuncked',
			});
			stream(requestUrl).pipe(res);
		}).catch(function (err) {
			if (err) {
				// do nothing
			}
		});
	} catch (exception) {
		res.status(500).send(exception);
	}
});

// API RESPONSE ROUTE
app.get("/api/request/", function (req, res) {
	let query = req.query.apiQuery;
	let videoId = videoIdParser(query);
	let playlistId = playlistIdParser(query);
	if (videoId.length == 11) {
		apiRequest.buildVideo(videoId).then(function (result) {
			res.type("json");
			res.write(JSON.stringify(result));
			res.end();
		}).catch(function (err) {
			if (err) {
				// invalidId(res);
			}
		});
	} else {
		apiRequest.buildPlaylistItems(playlistId).then(function (result) {
			res.type("json");
			res.write(JSON.stringify(result));
			res.end();
		}).catch(function (err) {
			if (err) {
				// invalidId(res);
			}
		});
	}
});

// Search Route
app.get("/results/", function (req, res) {
	apiRequest.buildSearch(req.query.searchQuery).then(function (searchResults) {
		res.type("json");
		res.write(JSON.stringify(searchResults));
		res.end();
	}).catch(function (err) {
		if (err) {
			// invalidId(res);
		}
	});
});

app.listen(3001, () => {
	console.log("Server started on 3001");
})

function videoIdParser(query) {
	let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/; // eslint-disable-line
	let match = query.match(regExp);
	if (match && match[7].length == 11) {
		return match[7];
	}
	// in this case an id was entered, this is really lazy, find a way to validate it
	return query;
}

function playlistIdParser(query) {
	let reg = new RegExp("[&?]list=([a-z0-9_]+)", "i");
	let match = query.match(reg);
	// it found the id
	if (match && match.length === 2) {
		return (match[1]);
	}
	// in this case an id was entered, this is really lazy, find a way to validate it
	return query;
}