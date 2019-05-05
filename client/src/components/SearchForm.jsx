import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { addSearchResults } from '../actions';

const Form = styled.form`
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

class SearchForm extends Component {
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
      .then(data => this.props.addSearchResults(data));
    this.props.history.push(`/results?searchQuery=${this.state.searchTerm}`);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Form className="search-form" onSubmit={this.handleSubmit}>
        <SearchInput className="search-input" type="search" placeholder="Search" aria-label="Search" value={this.state.searchTerm} onChange={this.handleChange} />
        <SearchButton className="search-button" type="submit"><FontAwesomeIcon icon="search" size="lg" /></SearchButton>
      </Form>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  addSearchResults: (searchResults) => {
    dispatch(addSearchResults(searchResults));
  },
});

export default withRouter(connect(null, mapDispatchToProps)(SearchForm));
