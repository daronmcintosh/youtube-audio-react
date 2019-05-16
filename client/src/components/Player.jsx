import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import plyr from 'plyr';
import {
  play, pause, updateNowPlayingTitle, previousSong, nextSong,
} from '../redux/actions';

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
  ${props => props.disabled
    && css`
      color: red !important;
    `};
`;

class Player extends Component {
  static propTypes = {
    player: PropTypes.shape({
      currentSongIndex: PropTypes.number.isRequired,
      isPlaying: PropTypes.bool.isRequired,
    }).isRequired,
    playConnect: PropTypes.func.isRequired,
    pauseConnect: PropTypes.func.isRequired,
    updateNowPlayingTitleConnect: PropTypes.func.isRequired,
    previousSongConnect: PropTypes.func.isRequired,
    nextSongConnect: PropTypes.func.isRequired,
    queue: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.previousSong = this.previousSong.bind(this);
    this.nextSong = this.nextSong.bind(this);
  }

  componentDidMount() {
    new plyr('#audio-player', { controls });
  }

  componentWillReceiveProps(nextProps) {
    const { player } = this.props;
    if (player.isPlaying !== nextProps.player.isPlaying) {
      return true;
    }
    // no re-rendering is required
    return false;
  }

  componentDidUpdate() {
    const { player } = this.props;
    const audio = document.querySelector('#audio-player');
    if (player.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  togglePlayPause() {
    const { player, playConnect, pauseConnect } = this.props;
    if (player.isPlaying) {
      pauseConnect();
    } else if (player.videoId !== 0) {
      playConnect(player.videoId);
    }
  }

  previousSong() {
    const {
      player,
      playConnect,
      previousSongConnect,
      updateNowPlayingTitleConnect,
      queue,
    } = this.props;
    if (player.currentSongIndex > 0) {
      previousSongConnect();
      playConnect(queue[player.currentSongIndex].videoId);
      updateNowPlayingTitleConnect(queue[player.currentSongIndex].title);
    }
  }

  nextSong() {
    const {
      playConnect,
      queue,
      player,
      nextSongConnect,
      updateNowPlayingTitleConnect,
    } = this.props;
    if (queue.length > 0 && player.currentSongIndex + 1 !== queue.length) {
      nextSongConnect();
      playConnect(queue[player.currentSongIndex].videoId);
      updateNowPlayingTitleConnect(queue[player.currentSongIndex].title);
    }
  }

  render() {
    const {
      player, queue, playConnect, pauseConnect,
    } = this.props;
    // Logic to disable previous and/or next buttons depending on the queue
    let previousDisabled = true;
    let nextDisabled = true;
    if (player.currentSongIndex === -1) {
      previousDisabled = true;
      nextDisabled = true;
    }
    if (player.currentSongIndex > 0) {
      previousDisabled = false;
    }
    if (queue.length > 0 && player.currentSongIndex + 1 !== queue.length) {
      nextDisabled = false;
    }
    // Logic to determine which icon is shown based on whether music is playing or not
    let playPauseIcon;
    if (player.isPlaying) {
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
          <FontAwesomeButton className="font-awesome-button" onClick={this.togglePlayPause}>
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
          onPlay={() => playConnect(player.videoId)}
          onPause={() => pauseConnect()}
          preload="none"
        />
      </PlayerContainer>
    );
  }
}

const mapStateToProps = state => ({
  queue: state.queue,
  player: state.player,
});

const mapDispatchToProps = {
  playConnect: play,
  pauseConnect: pause,
  updateNowPlayingTitleConnect: updateNowPlayingTitle,
  previousSongConnect: previousSong,
  nextSongConnect: nextSong,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
