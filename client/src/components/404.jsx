import React from 'react';
import styled from 'styled-components';

const InvalidPageMessage = styled.h3`
  margin-top: 70px;
  text-align: center;
`;

function InvalidPage() {
  return (
    <InvalidPageMessage>This page does not exist</InvalidPageMessage>
  );
}

export default InvalidPage;
