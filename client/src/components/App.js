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
	.react-contextmenu {
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid rgba(0,0,0,.15);
		border-radius: .25rem;
		color: #373a3c;
		font-size: 16px;
		margin: 2px 0 0;
		min-width: 160px;
		outline: none;
		opacity: 0;
		padding: 5px 0;
		pointer-events: none;
		text-align: left;
		transition: opacity 250ms ease !important;
	}

	.react-contextmenu.react-contextmenu--visible {
		opacity: 1;
		pointer-events: auto;
		z-index: 9999;
	}

	.react-contextmenu-item {
		background: 0 0;
		border: 0;
		color: #373a3c;
		cursor: pointer;
		font-weight: 400;
		line-height: 1.5;
		padding: 3px 20px;
		text-align: inherit;
		white-space: nowrap;
	}

	.react-contextmenu-item.react-contextmenu-item--active,
	.react-contextmenu-item.react-contextmenu-item--selected {
		color: #fff;
		background-color: #20a0ff;
		border-color: #20a0ff;
		text-decoration: none;
	}

	.react-contextmenu-item.react-contextmenu-item--disabled,
	.react-contextmenu-item.react-contextmenu-item--disabled:hover {
		background-color: transparent;
		border-color: rgba(0,0,0,.15);
		color: #878a8c;
	}

	.react-contextmenu-item--divider {
		border-bottom: 1px solid rgba(0,0,0,.15);
		cursor: inherit;
		margin-bottom: 3px;
		padding: 2px 0;
	}
	.react-contextmenu-item--divider:hover {
		background-color: transparent;
		border-color: rgba(0,0,0,.15);
	}

	.react-contextmenu-item.react-contextmenu-submenu {
		padding: 0;
	}

	.react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item {
	}

	.react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item:after {
		content: "▶";
		display: inline-block;
		position: absolute;
		right: 7px;
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