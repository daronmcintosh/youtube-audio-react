/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';
import Player from './Player';

class App extends Component {
	render() {
		return (
			<div>
				<div className='App container'>
					<Search />
					<Results />
				</div>
				<Player />
			</div>
		);
	}
}

export default App;