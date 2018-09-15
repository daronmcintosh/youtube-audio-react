import React, { Component } from 'react';
import Search from './Search';
import Player from './Player';
import Home from './Home';
import Results from './Results';
import InvalidPage from './404';
import styled, { injectGlobal } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlay, faPause, faStepForward, faStepBackward, faHome } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

library.add(faSearch, faPlay, faPause, faStepBackward, faStepForward, faHome);

injectGlobal`
	html,
	body {
		max-width: 100%;
		overflow-x: hidden;
		font-family: 'Open Sans', sans-serif;
	}
`;

const RouteWrapper = styled.div`
`;

const AppWrapper = styled.div`
`;

class App extends Component {
	render() {
		return (
			<Router className='router'>
				<RouteWrapper className='routes-wrapper'>
					<AppWrapper className='App'>
						<Search className='Search' />
						<Player className='Player' />
					</AppWrapper>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/results' component={Results} />
						<Route component={InvalidPage} />
					</Switch>
				</RouteWrapper>
			</Router>
		);
	}
}

export default App;