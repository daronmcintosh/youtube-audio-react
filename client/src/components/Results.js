import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToQueue, play, pause, updateNowPlayingTitle } from '../actions';
import styled from 'styled-components';

const SearchResults = styled.div`
	margin-top: 70px;
`;

const SearchResult = styled.div`
`;
class Results extends Component {
	constructor(props) {
		super(props);
		this.handleLinkClick = this.handleLinkClick.bind(this);
	}
	handleLinkClick(videoId, title, event) {
		this.props.play(videoId);
		this.props.updateNowPlayingTitle(title);
		// this.props.addToQueue(videoId);
	}
	render() {
		return (
			<SearchResults>
				{this.props.searchResults.map(result =>
					<SearchResult>
						<a key={result.id} className="" onClick={(e) => this.handleLinkClick(result.id, result.title, e)}>{result.title}</a>
					</SearchResult>
				)}
			</SearchResults>
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
		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Results);