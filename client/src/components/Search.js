import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

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

const HomeButton = styled(Link)`
	color: #FFFFFF;
	text-decoration: none;
	display: inline-block;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
`;

class Search extends Component {
	render() {
		return (
				<div>
					<SearchNav className='search-nav'>
						<HomeButton to='/'>Youtube Audio</HomeButton>
						<SearchForm />
					</SearchNav>
				</div>
		);
	}
}

export default Search;