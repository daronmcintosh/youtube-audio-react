import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addToQueue } from '../actions';

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';


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
	font-weight: 600;
	font-size: 1.25rem;
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
		this.addSongToQueue= this.addSongToQueue.bind(this);
		this.playSong= this.playSong.bind(this);
	}
	playSong(videoId, title) {
		this.props.addToQueue(videoId, title);
	}
	addSongToQueue(e, data, target) {
		let id = target.firstElementChild.getAttribute('data-videoid');
		let title = target.firstElementChild.getAttribute('data-videotitle');
		this.props.addToQueue(id, title);
	}
	componentDidMount() {
		fetch('/trending')
			.then(res => res.json())
			.then(data => this.setState({ trendingVideos: data }));
	}
	render() {
		return (
			<HomeWrapper className='home-wrapper'>
				<CountryTrendingVideosTitle className='country-trending-videos-title'>United States Trending Videos</CountryTrendingVideosTitle>
				<HorizontalRule className='horizantal-rule' />
				<TrendingVideosWrapper className='trending-videos-wrapper'>
					{this.state.trendingVideos.map(video =>
						<div key={video.id}>
							<ContextMenuTrigger id='Context-Menu'>
								<TrendingVideo className='trending-video' data-videoid={video.id} data-videotitle={video.title} onClick={() => this.playSong(video.id, video.title)}>
									<TrendingVideoImg className='trending-video-img' src={video.imgSrc} />
									<TrendingVideoTitle className='trending-video-title'>{video.title}</TrendingVideoTitle>
								</TrendingVideo>
							</ContextMenuTrigger>
						</div>
					)}
					<ContextMenu id='Context-Menu'>
						<MenuItem onClick={this.addSongToQueue}>Add to Queue</MenuItem>
					</ContextMenu>
				</TrendingVideosWrapper>
			</HomeWrapper>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addToQueue: (videoId, title) => {
			dispatch(addToQueue(videoId, title));
		}
	};
};

export default connect(null, mapDispatchToProps)(Home);