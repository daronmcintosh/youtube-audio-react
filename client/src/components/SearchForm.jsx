import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { setSearchTerm } from '../redux/actions';

const Form = styled.form`
  margin: 0 auto;
`;

const SearchInput = styled.input`
  height: 2.5rem;
  border-radius: 0.3rem;
  padding: 5px;
  margin-right: 4px;
`;

const SearchButton = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.3rem;
  background: none;
  color: #ffffff;
  /* border: none; */
`;

class SearchForm extends Component {
  static propTypes = { history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired };

  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { searchTerm } = this.state;
    const { setSearchTermConnect, history } = this.props;

    event.preventDefault();
    setSearchTermConnect(searchTerm);
    history.push(`/results?searchQuery=${searchTerm}`);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm } = this.state;
    return (
      <Form className="search-form" onSubmit={this.handleSubmit}>
        <SearchInput
          className="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={this.handleChange}
        />
        <SearchButton className="search-button" type="submit">
          <FontAwesomeIcon icon="search" size="lg" />
        </SearchButton>
      </Form>
    );
  }
}

SearchForm.propTypes = {
  setSearchTermConnect: PropTypes.func.isRequired,
};
const mapDispatchToProps = { setSearchTermConnect: setSearchTerm };

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(SearchForm),
);
