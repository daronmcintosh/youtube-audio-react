import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
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
	@media (max-width: 768px) {
		.search-nav-home-button-text {
			display: none;
		}
	}
`;

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
	color: #FFFFFF;
	display: none;
	@media (max-width: 768px) {
		display: block;
	}
`;

class Search extends Component {
	render() {
		return (
			<div>
				<SearchNav className='search-nav'>
					<HomeButton to='/' className='search-nav-home-button'><span className='search-nav-home-button-text'>Youtube Audio</span><FontAwesomeIconWrapper icon='home' size='2x' /></HomeButton>
					<SearchForm className='search-nav-form' />
				</SearchNav>
			</div>
		);
	}
}

export default Search;