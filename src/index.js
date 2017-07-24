import React from 'react';
import { render } from 'react-dom';

import './styles/main.scss';

let imgData = require('./data/imgData.json');

// 生成图片路径信息
imgData = ((imgDataArr) => {
	for(let i=0, len=imgDataArr.length; i<len; i++){
		let singleImageData = imgDataArr[i];

		singleImageData.imageURL = require(`images/${singleImageData.fileName}`);

		imgDataArr[i] = singleImageData;
	}
})(imgData);

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