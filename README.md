# Youtube Audio(React Version)

This app is a single-page audio version of youtube. It supports streaming a single video or playlist, streaming a livestream, searching, viewing channels and linking a youtube account. Each video or livestream is converted and streamed back to the client on the fly without anything ever being saved on the server.

React version of [youtube-audio](https://github.com/iSolutionJA/youtube-audio).

## Motivation

I wanted to create a version of youtube that functions like spotify.

## Features

- Responsive web design that works on any size device

## Live Demo

To see a live verion, go to [https://audio-youtube-react.herokuapp.com/](https://audio-youtube-react.herokuapp.com/)

Important Note: App is on free version of [heroku](https://www.heroku.com) so it sleeps after 30 mins of inactivity. Therefore, it takes a little while to start up.

## Built With

### Front-End

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React Router](https://github.com/ReactTraining/react-router)
- [Plyr](https://plyr.io/)
- [styled-components](https://www.styled-components.com/)

[Bootstrap](https://www.styled-components.com/) wasn't used because I wanted to design it using pure CSS.

### Back-End

- [express](https://expressjs.com/)
- [moment](https://momentjs.com/)
- [ytdl-core](https://github.com/fent/node-ytdl-core#readme)
- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
- [google-api](https://github.com/googleapis/google-api-nodejs-client#readme)

## How is the audio streamed

1. Get the duration(in seconds) of a video from the Youtube Data API
2. Calculate the file size in bytes using the duration and bitrate so the server can 'tell' the browser how long the file is (set 'Content-Length' header).
3. Set the header(200) of the audio file that is going to be streamed; content-type - audio/mpeg, content-length - file-size and transfer-encoding - chuncked
4. Stream the file by converting a audio only stream to a mp3 stream using ffmpeg and then stream that to response.

I built a npm package that is modified version of [youtube-audio-stream](https://www.npmjs.com/package/youtube-audio-stream) that is used to convert and stream the audio. More information on that package can be found [here](https://www.npmjs.com/package/@isolution/youtube-audio-stream)

## How to Install

1. Install node and ffmpeg
2. Install all the packages in the root folder and client folder with `npm install`
3. Get an API token for the Youtube Data API using Google Developers Console
4. Create a .env file inside of root folder and place a key value(`API_KEY=token`) pair with API token from step above
5. Run project with `npm run debug` or use one of the launch configs if using VSCode
