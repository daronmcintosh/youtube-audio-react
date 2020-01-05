import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Plyr from 'plyr';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import { nextSong, previousSong } from '../redux/actions';

const controls = `
  <div class="plyr__controls" style="width: 75%; margin: 0 auto; background: none; color: #FFFFFF">
    <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
    <div class="plyr__progress">
      <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
      <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
      <span role="tooltip" class="plyr__tooltip">00:00</span>
    </div>
    <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
    <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
      <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
      <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
      <span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
      <span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
    </button>
    <div class="plyr__volume">
      <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
    </div>
  </div>
  `;

const PlayerContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 2;
  text-align: center;
  background-color: #343a40;
  color: #ffffff;
  padding-top: 10px;

  @media (max-width: 768px) {
    .player-container {
      padding: 0;
    }

    .plyr__control,
    .plyr__volume {
      display: none;
    }

    .plyr__controls {
      width: 100% !important;
    }

    .song-info {
      font-size: 1em;
    }
  }
`;

const SongInfo = styled.div`
  color: #ffffff;
  padding-bottom: 5px;
`;

const SongTitle = styled.div``;

const PlayerControls = styled.div`
  margin-bottom: 5px;
  color: #ffffff;
`;

const FontAwesomeButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  ${props =>
    props.disabled &&
    css`
      color: red !important;
    `};
`;

class Player extends Component {
  constructor(props) {
    super(props);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.previousSong = this.previousSong.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.state = { isPlaying: false };
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const audioPlayer = new Plyr('#audio-player', { controls });
  }

  componentDidUpdate(prevProps) {
    const audioPlayer = document.querySelector('#audio-player');
    const { player } = this.props;
    // Switch song when a new videoId is given
    if (prevProps.player.videoId !== player.videoId) {
      audioPlayer.play();
    }
  }

  togglePlayPause() {
    const audioPlayer = document.querySelector('#audio-player');
    const { isPlaying } = this.state;
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  }

  previousSong() {
    const { player, previousSongConnect } = this.props;
    if (player.currentSongIndex > 0) {
      const { videoId, title } = player.queue[player.currentSongIndex - 1];
      previousSongConnect(videoId, title);
    }
  }

  nextSong() {
    const { player, nextSongConnect } = this.props;
    if (player.queue.length - 1 >= player.currentSongIndex) {
      const { videoId, title } = player.queue[player.currentSongIndex + 1];
      nextSongConnect(videoId, title);
    }
  }

  render() {
    const { player } = this.props;

    const { isPlaying } = this.state;
    // Logic to disable previous and/or next buttons depending on the queue
    let previousDisabled = true;
    let nextDisabled = true;
    if (player.queue.length === 0) {
      previousDisabled = true;
      nextDisabled = true;
    }
    if (player.currentSongIndex > 0) {
      previousDisabled = false;
    }
    if (player.queue.length - 1 > player.currentSongIndex) {
      nextDisabled = false;
    }
    // Logic to determine which icon is shown based on whether music is playing or not
    let playPauseIcon;
    if (isPlaying) {
      playPauseIcon = <FontAwesomeIcon icon="pause" size="2x" fixedWidth />;
    } else {
      playPauseIcon = <FontAwesomeIcon icon="play" size="2x" fixedWidth />;
    }
    return (
      <PlayerContainer className="player-container">
        <SongInfo className="song-info">
          <SongTitle className="song-title">{player.title}</SongTitle>
        </SongInfo>
        <PlayerControls className="player-controls">
          <FontAwesomeButton
            className="font-awesome-button"
            onClick={this.previousSong}
            disabled={previousDisabled}
          >
            <FontAwesomeIcon icon="step-backward" size="2x" />
          </FontAwesomeButton>
          <FontAwesomeButton
            className="font-awesome-button"
            onClick={this.togglePlayPause}
          >
            {playPauseIcon}
          </FontAwesomeButton>
          <FontAwesomeButton
            className="font-awesome-button"
            onClick={this.nextSong}
            disabled={nextDisabled}
          >
            <FontAwesomeIcon icon="step-forward" size="2x" />
          </FontAwesomeButton>
        </PlayerControls>
        <audio
          id="audio-player"
          src={`/api/play/${player.videoId}`}
          onPlay={() => this.setState({ isPlaying: true })}
          onPause={() => this.setState({ isPlaying: false })}
          // preload="none"
        />
      </PlayerContainer>
    );
  }
}

Player.propTypes = {
  player: PropTypes.shape({
    videoId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    queue: PropTypes.array.isRequired,
    currentSongIndex: PropTypes.number.isRequired
  }).isRequired,
  nextSongConnect: PropTypes.func.isRequired,
  previousSongConnect: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  player: state.player
});

const mapDispatchToProps = {
  previousSongConnect: previousSong,
  nextSongConnect: nextSong
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
