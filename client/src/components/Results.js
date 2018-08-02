/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToQueue, play, pause } from '../actions';
import './Results.css';

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
			<div className="list-group">
				{this.props.searchResults.map(result =>
					<a key={result.id} className="list-group-item list-group-item-action" onClick={(e) => this.handleLinkClick(result.id, e)}>{result.title}</a>
				)}
			</div>
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