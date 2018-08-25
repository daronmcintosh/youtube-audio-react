import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addToQueue, play, pause } from '../actions';

const TrendingVideos = styled.div`
	margin-top: 70px;
`;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { trendingVideos: [] };
	}
	handleLinkClick(videoId, event) {
		this.props.play(videoId);
		// this.props.addToQueue(videoId);
	}
	componentDidMount() {
		fetch('/trending')
			.then(res => res.json())
			.then(data => this.setState({ trendingVideos: data }));
	}
	render() {
		return (
			<TrendingVideos>
				{this.state.trendingVideos.map(video =>
					<a key={video.id} className="" onClick={(e) => this.handleLinkClick(video.id, e)}>{video.title}</a>
				)}
			</TrendingVideos>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addToQueue: (videoId) => {
			dispatch(addToQueue(videoId));
		},
		play: (videoId) => {
			dispatch(play(videoId));
		},
		pause: () => {
			dispatch(pause());
		}
	};
};

export default connect(null, mapDispatchToProps)(Home);