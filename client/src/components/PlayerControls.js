/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

class PlayerControls extends Component {
	render() {
		return (
			<div className='ml-auto mr-auto'>
				<span style={{fontSize: 75, cursor: 'pointer'}}>&larr;</span>
				<span style={{fontSize: 75, cursor: 'pointer'}}>&rarr;</span>
			</div>
		);
	}
}

export default PlayerControls;