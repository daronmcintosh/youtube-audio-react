/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { addSearchResults } from '../actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchNav = styled.nav`
	display: flex;
	background-color: #343A40;
	top: 0;
	right: 0;
	left: 0;
	position: fixed;
	width: 100%;
	padding: 10px;
`;
const SearchForm = styled.form`
	margin: 0 auto;
`;
const SearchInput = styled.input`
	height: 2.5rem;
	border-radius: .3rem;
	padding: 5px;
	margin-right: 4px;
`;
const SearchButton = styled.button`
	height: 2.5rem;
	width: 2.5rem;
	border-radius: .3rem;
	background: none;
	color: #FFFFFF;
	/* border: none; */
`;

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
			<SearchNav className=''>
				<SearchForm className='' onSubmit={this.handleSubmit}>
					<SearchInput className='' type='search' placeholder='Search' aria-label='Search' value={this.state.searchTerm} onChange={this.handleChange} />
					<SearchButton type='submit'><FontAwesomeIcon icon='search' size='lg' /></SearchButton>
				</SearchForm>
			</SearchNav>
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