/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { addSearchResults } from '../actions';
import { connect } from 'react-redux';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = { searchTerm: '' };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		fetch(`/results?searchQuery=${this.state.searchTerm}`)
			.then(res => res.json())
			// .then(data => console.log(data));
			.then(data => this.props.addSearchResults(data));
	}
	handleChange(event) {
		this.setState({ searchTerm: event.target.value });
	}
	render() {
		return (
			<div>
				<nav className='navbar navbar-light bg-light ml-auto mr-auto'>
					<form className='form-inline ml-auto mr-auto' onSubmit={this.handleSubmit}>
						<input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search' value={this.state.searchTerm} onChange={this.handleChange} />
						<button className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
					</form>
				</nav>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addSearchResults: (searchResults) => {
			dispatch(addSearchResults(searchResults));
		}
	};
};

export default connect(null, mapDispatchToProps)(Search);