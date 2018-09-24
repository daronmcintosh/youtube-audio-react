import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToQueue, play, pause, updateNowPlayingTitle, addSearchResults } from '../actions';
import styled, { css } from 'styled-components';

const ResultsWrapper = styled.div`
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

const ResultsTitle = styled.div`
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

const SearchResultsWrapper = styled.div`
	display: flex;
	flex-flow: column;
`;

const SearchResult = styled.div`
	margin-bottom: 70px;
	cursor: pointer;
`;

const SearchResultImg = styled.img`
	width: 200px;
	height: 150px;
	margin-top: -10px;
	margin-bottom: -15px;
	@media only screen and (min-width: 600px) {
		width: 270px;
		height: 202.5px;
		margin-top: -25px;
		margin-bottom: -30px;
	}

	${props => props.circular && css`
		width: 200px !important;
		height: 200px !important;
		border-radius: 50% !important;
		margin-top: 0 !important;
		margin-bottom: 0 !important;
		@media only screen and (min-width: 600px) {
			width: 250px !important;
			height: 250px !important;
			border-radius: 50% !important;
			margin-top: 0 !important;
			margin-bottom: 0 !important;
		}
  	`};
`;

const ImageWrapper = styled.div`
	overflow: hidden;
	float: left;
`;

const SearchResultInfo = styled.div`
	margin-left: 220px;
	@media only screen and (min-width: 600px) {
		margin-left: 300px;
	}
`;

const SearchResultTitle = styled.div`
	margin-bottom: .75rem;
	font-weight: 600;
	font-size: 1.1rem;
	@media only screen and (min-width: 600px) {
		font-size: 1.25rem;
	}
`;

const SearchResultChannel = styled.div`
	margin-bottom: .5rem;
	color: #888;
`;

const SearchResultDescription = styled.div`
	color: #888;
    font-size: small;
    word-wrap: break-word;
	display: none;
	@media only screen and (min-width: 600px) {
		display: block;
	}
`;

class Results extends Component {
	componentDidMount() {
		const searchQuery = this.props.location.search.split('=')[1];
		fetch(`/results?searchQuery=${searchQuery}`)
			.then(res => res.json())
			.then(data => this.props.addSearchResults(data));
	}
	componentWillUnmount() {
		this.props.addSearchResults([]);
	}
	constructor(props) {
		super(props);
		this.handleLinkClick = this.handleLinkClick.bind(this);
	}

	handleLinkClick(videoId, title, kind) {
		// TODO: handle whether the item is a channel, playlist or a video here
		if (kind.includes('video')) {
			this.props.play(videoId);
			this.props.updateNowPlayingTitle(title);
		} else if (kind.includes('playlist')) {
			// playlist
		} else if (kind.includes('channel')) {
			// channel
		}
		// this.props.addToQueue(videoId);
	}
	render() {
		return (
			<ResultsWrapper className='results-wrapper'>
				<ResultsTitle className='results-title'>Results</ResultsTitle>
				<HorizontalRule className='horizontal-rule' />
				<SearchResultsWrapper className='search-results-wrapper'>
					{this.props.searchResults.map(result =>
						<SearchResult key={result.id} className={`search-result ${result.kind}`} onClick={() => this.handleLinkClick(result.id, result.title, result.kind)}>
							<ImageWrapper className='search-result-img-wrapper'>
								{result.kind.includes('channel')
									? <SearchResultImg className='search-result-img' circular src={result.imgSrc} />
									: <SearchResultImg className='search-result-img' src={result.imgSrc} />
								}
							</ImageWrapper>
							<SearchResultInfo className='search-result-info'>
								<SearchResultTitle className='search-result-title'>{result.title}</SearchResultTitle>
								{!result.kind.includes('channel')
									? <SearchResultChannel className='search-result-channelTitle'>{result.channelTitle}</SearchResultChannel>
									: null
								}
								<SearchResultDescription className='search-result-description'>{result.description}</SearchResultDescription>
							</SearchResultInfo>
						</SearchResult>
					)}
				</SearchResultsWrapper>
			</ResultsWrapper>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		searchResults: state.searchResults,
		queue: state.queue
	};
};

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
		},
		addSearchResults: (searchResults) => {
			dispatch(addSearchResults(searchResults));
		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Results);