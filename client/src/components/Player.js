/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { play, pause } from '../actions';
import plyr from 'plyr';
import './Player.css';

var audio;
class Player extends Component {
	componentDidMount() {
		audio = document.getElementById('audio-player');
	}

	componentDidUpdate() {
		new plyr('#audio-player', {
			duration: this.props.player.duration
		});
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
			return false;// no re-rendering is required
		}
	}

	render() {
		return (
			<div>
				<nav className='navbar fixed-bottom'>
					{this.props.player
						? <audio id='audio-player' onPlay={() => this.props.play(this.props.player.videoId, this.props.player.duration)}
							onPause={this.props.pause} controls src={`http://localhost:3000/api/play/${this.props.player.videoId}`}></audio>
						: null
					}
				</nav>
			</div>
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
		play: (videoId, duration) => {
			dispatch(play(videoId, duration));
		},
		pause: () => {
			dispatch(pause());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);