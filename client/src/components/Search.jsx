import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SearchForm from './SearchForm';

const SearchNav = styled.nav`
  display: flex;
  background-color: #343a40;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  width: 100%;
  padding: 10px;
`;

const HomeButton = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
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
  color: #ffffff;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

function Search() {
  return (
    <div>
      <SearchNav className="search-nav">
        <HomeButton to="/" className="search-nav-home-button">
          <span className="search-nav-home-button-text">Youtube Audio</span>
          <FontAwesomeIconWrapper icon="home" size="2x" />
        </HomeButton>
        <SearchForm className="search-nav-form" />
      </SearchNav>
    </div>
  );
}

export default Search;
