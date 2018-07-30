/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Player from './Player';
import Search from './Search';
import Results from './Results';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<Search />
				<Results />
				<Player />
			</div>
		);
	}
}

export default App;