import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.h3`
  margin-top: 70px;
  text-align: center;
`;

function Error(props) {
  const { message } = props;
  return <ErrorMessage>{message}</ErrorMessage>;
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
