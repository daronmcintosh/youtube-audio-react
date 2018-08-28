import React, { Component } from 'react';
import Search from './Search';
import Player from './Player';
import Home from './Home';
import Results from './Results';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlay, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router, Route } from 'react-router-dom';

library.add(faSearch, faPlay, faStepBackward, faStepForward);

const AppWrapper = styled.div`
	font-family: 'Open Sans', sans-serif;
`;
class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<AppWrapper className='App'>
						<Search />
						<Player />
					</AppWrapper>
					<Route exact path='/' component={Home} />
					<Route path='/results' component={Results} />
				</div>
			</Router>
		);
	}
}

export default App;