import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addToQueue, play, pause, updateNowPlayingTitle } from '../actions';

const TrendingVideosWrapper = styled.ul`
	width: 75%;
	margin: 70px auto 120px auto;
	justify-content: center;
	display: flex;
	flex-flow: row wrap;
	list-style: none;
`;

const TrendingVideo = styled.li`
	width: 180px;
	height: 140px;
	margin-right: 20px;
	margin-bottom: 60px;
	cursor: pointer;

	@media (max-width: 768px) {
		width: 250px;
	}
`;

const TrendingVideoImg = styled.img`
	height: 100px;

	@media (max-width: 768px) {
		width: 250px;
		height: 140px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const TrendingVideoTitle = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
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
						<TrendingVideoImg className='trending-video-img' src={video.imgSrc} />
						<TrendingVideoTitle className='trending-video-title'>{video.title}</TrendingVideoTitle>
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