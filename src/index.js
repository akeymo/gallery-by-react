import React from 'react';
import ReactDOM, { render } from 'react-dom';

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

// 获取区间内的随机值
let getRangeRandom = (low, high) => Math.floor(Math.random()*(high - low) + low);

// 获取正负0-30度随机角度值
let getAngleRandom = () => {
	return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random()*30);
}

class ImgFigure extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){

		this.props.inverse();

		e.stopPropagation();
		e.preventDefault();
	}

	render(){

		let styleObj = {};
		let imgFigureClassName = 'img-figure';

		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos
		}

		if(this.props.arrange.rotate){
			(['Webkit','Moz','ms','']).forEach((value) => {
				styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			})
		}

		return(
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick}>
						<p>
							{this.props.data.title}
						</p>
					</div>
				</figcaption>
			</figure>
		)
	}
}

class GalleryByReactApp extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			imgsArrangeArr: []
		}

		this.constant = {
			centerPos:{
				left:0,
				top:0
			},
			hPosRange: {
				//水平方向的取值范围
				leftSecX: [0,0],
				rigthSecX: [0,0],
				y: [0,0]
			},
			vPosRange: {
				//垂直方向的取值范围
				x: [0,0],
				topY: [0,0]
			}
		}
	}

	/*
	 * 重新布局所有图片
	 * @param centerIndex 指定居中排布哪个图片
	 */
	rearrange(centerIndex){
		let imgsArrangeArr = this.state.imgsArrangeArr;
		let imgsArrangeTopArr = [];
		let topImgNum = Math.floor(Math.random()*2); //返回0或1的随机整数
		let topImgSpliceIndex = 0;
		let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

		// 居中图片的位置信息
		imgsArrangeCenterArr[0].pos = this.constant.centerPos;
		imgsArrangeCenterArr[0].rotate = 0;
		// 布局上侧的图片
		topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
		imgsArrangeTopArr.forEach((value, index) => {
			imgsArrangeTopArr[index] = {
				pos:{
					left: getRangeRandom(this.constant.vPosRange.x[0],this.constant.vPosRange.x[1]),
					top: getRangeRandom(this.constant.vPosRange.topY[0], this.constant.vPosRange.topY[1])
				},
				rotate: getAngleRandom()
			}
		});
		// 布局两侧图片
		for(let i=0,len=imgsArrangeArr.length,k=len/2;i<len;i++){
			let hPosRangeLOrR = null;
			if(i<k){
				hPosRangeLOrR = this.constant.hPosRange.leftSecX
			}else{
				hPosRangeLOrR = this.constant.hPosRange.rigthSecX
			}

			imgsArrangeArr[i] = {
				pos: {
					left: getRangeRandom(hPosRangeLOrR[0],hPosRangeLOrR[1]),
					top: getRangeRandom(this.constant.hPosRange.y[0],this.constant.hPosRange.y[1])
				},
				rotate: getAngleRandom()

			}
		}

		// 将取出的图片重新放回数组
		if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
			imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0])
		}
		imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
		console.log(imgsArrangeArr)
		this.setState({
			imgsArrangeArr: imgsArrangeArr
		})
	}

	/*
	 * 点击翻转
	 * @param 需要翻转的图片的index
	 * return 闭包函数
	 */
	inverse(index){
		return () => {
			let imgsArrangeArr = this.state.imgsArrangeArr;

			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
			this.setState({
				imgsArrangeArr: imgsArrangeArr
			})
		}
	}

	componentDidMount(){
		// 舞台大小
		let stageDom = ReactDOM.findDOMNode(this.refs.stage);
		let stageW = stageDom.scrollWidth,
			stageH = stageDom.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);

		//一个ImgFigure的大小
		let imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0);
		let imgW = imgFigureDom.scrollWidth,
			imgH = imgFigureDom.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);

		//计算中心图片位置点
		this.constant.centerPos.left = halfStageW - halfImgW;
		this.constant.centerPos.top = halfStageH - halfImgH;

		// 计算水平方向取值
		this.constant.hPosRange.leftSecX[0] = -halfImgW;
		this.constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		this.constant.hPosRange.rigthSecX[0] = halfStageW + halfImgW;
		this.constant.hPosRange.rigthSecX[1] = stageW - halfImgW;
		this.constant.hPosRange.y[0] = -halfImgH;
		this.constant.hPosRange.y[1] = stageH - halfImgH;

		// 计算垂直方向取值
		this.constant.vPosRange.x[0] = halfStageW - imgW;
		this.constant.vPosRange.x[1] = halfStageW;
		this.constant.vPosRange.topY[0] = - halfImgH;
		this.constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

		this.rearrange(0);
	}

	render(){

		let controllerUnits = [];
		let ImgFigures = [];
		imgDatas.forEach((value, index) => {

			if(!this.state.imgsArrangeArr[index]){
				this.state.imgsArrangeArr[index] = {
					pos:{
						left:0,
						top:0
					},
					rotate: 0,
					isInverse: false,	//正面为false，反面为true
				}
			}

			ImgFigures.push(<ImgFigure data={value} key={index} ref={`imgFigure${index}`} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}/>);
		});

		return (
			<section className="stage" ref="stage">
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