import React, { Component } from 'react';
import styled from 'styled-components';

const InvalidPageMessage = styled.h3`
	margin-top: 70px;
	text-align: center;
`;
class InvalidPage extends Component {
	render() {
		return (
			<InvalidPageMessage>This page does not exist</InvalidPageMessage>
		);
	}
}

export default InvalidPage;