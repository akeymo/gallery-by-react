import React from 'react';
import { render } from 'react-dom';

import './styles/main.scss';

let imgDatas = require('./data/imgData.json');

// 生成图片路径信息
imgDatas = ((imgDatasArr) => {
	for(let i=0, len=imgDatasArr.length; i<len; i++){
		let singleImageData = imgDatasArr[i];

		singleImageData.imageURL = require(`./images/${singleImageData.fileName}`);

		imgDatasArr[i] = singleImageData;
	}

	return imgDatasArr;

})(imgDatas);

class GalleryByReactApp extends React.Component {
	render(){
		return (
			<section className="stage">
				<section className="img-sec">
				</section>
				<nav className="controller-nav">
				</nav>
			</section>
		)
	}
}

render(<GalleryByReactApp />, document.getElementById('app'));