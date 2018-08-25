/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';
import Home from './Home';
import Player from './Player';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlay, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faPlay, faStepBackward, faStepForward);

const AppWrapper = styled.div`
	font-family: 'Open Sans', sans-serif;
`;
class App extends Component {
	render() {
		return (
			<AppWrapper className='App'>
				<Search />
				<Player />
			</AppWrapper>
		);
	}
}

export default App;