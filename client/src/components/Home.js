import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addToQueue, play, pause, updateNowPlayingTitle } from '../actions';

const TrendingVideosWrapper = styled.div`
	width: 50%;
	margin: 0 auto;
	margin-top: 70px;
`;

const TrendingVideo = styled.a`
	display: block;
`;

const TrendingVideoImg = styled.img`
	width: 70px;
	height: 70px;
`;

const TrendingVideoTitle = styled.span`
`;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { trendingVideos: [] };
	}
	handleLinkClick(videoId, title, event) {
		this.props.play(videoId);
		this.props.updateNowPlayingTitle(title);
		// this.props.addToQueue(videoId);
	}
	componentDidMount() {
		fetch('/trending')
			.then(res => res.json())
			.then(data => this.setState({ trendingVideos: data }));
	}
	render() {
		return (
			<TrendingVideosWrapper className='trending-videos-wrapper'>
				{this.state.trendingVideos.map(video =>
					<TrendingVideo key={video.id} className='trending-video' onClick={(e) => this.handleLinkClick(video.id, video.title, e)}>
						<TrendingVideoImg src={video.imgSrc}/>
						<TrendingVideoTitle>{video.title}</TrendingVideoTitle>
					</TrendingVideo>
				)}
			</TrendingVideosWrapper>
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
		},
		updateNowPlayingTitle: (title) => {
			dispatch(updateNowPlayingTitle(title));
		}
	};
};

export default connect(null, mapDispatchToProps)(Home);