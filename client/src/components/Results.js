import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToQueue, play, pause, updateNowPlayingTitle, addSearchResults } from '../actions';
import styled from 'styled-components';
import queryString from 'query-string';

const SearchResults = styled.div`
	margin-top: 70px;
`;

const SearchResult = styled.div`
`;
class Results extends Component {
	componentDidMount() {
		const searchQuery = queryString.parse(this.props.location.search).searchQuery;
		fetch(`/results?searchQuery=${searchQuery}`)
			.then(res => res.json())
			.then(data => this.props.addSearchResults(data));
	}
	componentWillUnmount(){
		this.props.addSearchResults([]);
	}
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
					<SearchResult key={result.id}>
						<a className="" onClick={(e) => this.handleLinkClick(result.id, result.title, e)}>{result.title}</a>
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
		},
		addSearchResults: (searchResults) => {
			dispatch(addSearchResults(searchResults));
		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Results);