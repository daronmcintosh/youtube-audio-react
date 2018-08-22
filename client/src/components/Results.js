/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToQueue, play, pause } from '../actions';
import styled from 'styled-components';

const SearchResults = styled.div`
	margin-top: 70px;
`;
class Results extends Component {
	constructor(props) {
		super(props);
		this.handleLinkClick = this.handleLinkClick.bind(this);
	}
	handleLinkClick(videoId, event) {
		this.props.play(videoId);
		// this.props.addToQueue(videoId);
	}
	render() {
		return (
			<SearchResults>
				{this.props.searchResults.map(result =>
					<a key={result.id} className="" onClick={(e) => this.handleLinkClick(result.id, e)}>{result.title}</a>
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
		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Results);