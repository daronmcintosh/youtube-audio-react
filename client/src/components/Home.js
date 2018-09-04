import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addToQueue, play, pause, updateNowPlayingTitle } from '../actions';

const HomeWrapper = styled.div`
	margin: 70px auto 120px auto;

	@media only screen and (min-width: 600px) {
		max-width: 560px;
	}

	@media only screen and (min-width: 768px) {
		max-width: 728px;
	}

	@media only screen and (min-width: 992px) {
		max-width: 952px;
	}

	@media only screen and (min-width: 1200px) {
		max-width: 80%;
	}
`;

const CountryTrendingVideosTitle = styled.div`
	font-weight: 700;
`;

const HorizontalRule = styled.hr`
	border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
	margin-bottom: 1rem;
`;

const TrendingVideosWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-flow: row wrap;
`;

const TrendingVideo = styled.div`
	width: 350px;
	height: 200px;
	margin-bottom: 70px;
	cursor: pointer;

	@media only screen and (min-width: 600px) {
		margin-right: 10px;
		width: 250px;
		height: 140px;
	}

	@media only screen and (min-width: 768px) {
		width: 210px;
		height: 120px;
	}
`;

const TrendingVideoImg = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 5px;
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
			<HomeWrapper>
				<CountryTrendingVideosTitle>United States Trending Videos</CountryTrendingVideosTitle>
				<HorizontalRule />
				<TrendingVideosWrapper className='trending-videos-wrapper'>
					{this.state.trendingVideos.map(video =>
						<TrendingVideo key={video.id} className='trending-video' onClick={(e) => this.handleLinkClick(video.id, video.title, e)}>
							<TrendingVideoImg className='trending-video-img' src={video.imgSrc} />
							<TrendingVideoTitle className='trending-video-title'>{video.title}</TrendingVideoTitle>
						</TrendingVideo>
					)}
				</TrendingVideosWrapper>
			</HomeWrapper>
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