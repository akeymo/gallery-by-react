import React from 'react';
import {render} from 'react-dom';

class HelloReact extends React.Component {
	render(){
		return (
			<div>
				<h1>Hello React!</h1>
			</div>
		)
	}
}

render(<HelloReact />, document.getElementById('app'));