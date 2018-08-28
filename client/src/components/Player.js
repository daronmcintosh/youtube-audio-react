import React, { Component } from 'react';
import { connect } from 'react-redux';
import { play, pause } from '../actions';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import plyr from 'plyr';

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
	background-color: #343A40;
	color: #FFFFFF;
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
			font-size: 1.0em;
		}
	}
`;

const SongInfo = styled.div`
	color: #FFFFFF;
	padding-bottom: 5px;
`;

const SongTitle = styled.div`
`;

const PlayerControls = styled.div`
	margin-bottom: 5px;
	color: #FFFFFF;
`;

class Player extends Component {
	componentDidMount() {
		new plyr('#audio-player', { controls });
	}
	componentDidUpdate() {
		var audio = document.getElementById('audio-player');
		if (this.props.player.isPlaying) {
			audio.play();
		} else {
			audio.pause();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.player.isPlaying !== nextProps.player.isPlaying) {
			return true;
		} else {
			// no re-rendering is required
			return false;
		}
	}

	render() {
		return (
			<PlayerContainer className='player-container'>
				<SongInfo className='song-info'>
					<SongTitle className='song-title'>{this.props.player.title}</SongTitle>
				</SongInfo>
				<PlayerControls className='player-controls'>
					<FontAwesomeIcon icon='step-backward' size='2x' />
					<FontAwesomeIcon icon='play' size='2x' fixedWidth />
					<FontAwesomeIcon icon='step-forward' size='2x' />
				</PlayerControls>
				<audio
					id='audio-player'
					src={`/api/play/${this.props.player.videoId}`}
					onPlay={() => this.props.play(this.props.player.videoId)}
					onPause={() => this.props.pause()}
				></audio>
			</PlayerContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		queue: state.queue,
		player: state.player
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		play: (videoId) => {
			dispatch(play(videoId));
		},
		pause: () => {
			dispatch(pause());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);