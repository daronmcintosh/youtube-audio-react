# Youtube Audio(React Version)
This app is a single-page audio version of youtube. It supports streaming a single video or playlist, streaming a livestream, searching, viewing channels and linking a youtube account. Each video or livestream is converted and streamed back to the client on the fly without anything ever being saved on the server.

React version of [youtube-audio](https://github.com/iSolutionJA/youtube-audio).

## Motivation
I wanted to create a version of youtube that functions like spotify.

## Features
* Responsive web design that works on any size device


## Live Demo
To see a live verion, go to [https://audio-youtube-react.herokuapp.com/](https://audio-youtube-react.herokuapp.com/)

Important Note: App is on free version of [heroku](https://www.heroku.com) so it sleeps after 30 mins of inactivity. Therefore, it takes a little while to start up.

## Built With

### Front-End
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [React Router](https://github.com/ReactTraining/react-router)
* [Plyr](https://plyr.io/)
* [styled-components](https://www.styled-components.com/)

[Bootstrap](https://www.styled-components.com/) wasn't used because I wanted to design it using pure CSS.

### Back-End
* [express](https://expressjs.com/)
* [moment](https://momentjs.com/)
* [ytdl-core](https://github.com/fent/node-ytdl-core#readme)
* [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
* [google-api](https://github.com/googleapis/google-api-nodejs-client#readme)

## How is the audio streamed?

See [here](https://github.com/iSolutionJA/youtube-audio#how-is-the-audio-streamed)

## How does audio seeking work?

See [here](https://github.com/iSolutionJA/youtube-audio#how-does-audio-seeking-work)