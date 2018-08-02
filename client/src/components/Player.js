/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { play, pause } from '../actions';
import plyr from 'plyr';
import './Player.css';

import ReactDOM from 'react-dom';

class Player extends Component {
	componentDidMount() {
		new plyr('#audio-player');
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
			<audio
				id='audio-player'
				src={`/api/play/${this.props.player.videoId}`}
				onPlay={() => this.props.play(this.props.player.videoId)}
				onPause={() => this.props.pause()}
			></audio>
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