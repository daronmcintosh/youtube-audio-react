import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addToQueue, play, pause, updateNowPlayingTitle } from '../actions';

const TrendingVideosWrapper = styled.ul`
	width: 75%;
	margin: 0 auto;
	margin-top: 70px;
	display: flex;
	flex-flow: row wrap;
	list-style: none;
`;

const TrendingVideo = styled.li`
	width: 180px;
	height: 140px;
	margin-right: 20px;
	margin-bottom: 40px;
`;

const TrendingVideoImg = styled.img`
	width: 180px;
	height: 100px;
`;

const TrendingVideoTitle = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	/* line-height: X;
	max-height: X*N; */
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
						<TrendingVideoImg src={video.imgSrc} />
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