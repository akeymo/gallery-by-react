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

class ImgFigure extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<figure>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2>{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
}

class GalleryByReactApp extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

		let controllerUnits = [];
		let ImgFigures = [];
		imgDatas.forEach((value) => {
			ImgFigures.push(<ImgFigure data={value}/>);
		});

		return (
			<section className="stage">
				<section className="img-sec">
					{ImgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>
			</section>
		)
	}
}

render(<GalleryByReactApp />, document.getElementById('app'));