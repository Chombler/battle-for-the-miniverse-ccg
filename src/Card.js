import React from 'react';
import the_void from './images/board/void.png';

export class Card extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: props.style.name || 'Card',
			cost: props.style.cost || 1,
			strength: props.style.strength || 2,
			health: props.style.health || 2,
		}
	}

	static getDerivedStateFromProps(props, state){
		return({
			height: props.style.height,
			width: props.style.width,
		});
	}

	render(){
		const divStyle = {
			height: this.state.height,
			width: this.state.width,
			position: 'relative',
		};
		const imgStyle = {
			height: '100%',
			width: '100%',
		};
		const nameStyle = {
			position: 'absolute',
			top: '5%',
			left: '5%',
		}
		const costStyle = {
			position: 'absolute',
			top: '5%',
			left: '95%',
			transform: 'translate(-100%, 0)',
		}
		const statStyle = {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		}
		return(
			<div style = {divStyle} draggable = 'true'>
				<img style = {imgStyle}  src = {the_void} alt = 'void card'/>
				<div style = {nameStyle} class = 'name'>{this.state.name}</div>
				<div style = {costStyle} class = 'cost'>{this.state.cost}</div>
				<div style = {statStyle} class = 'stats'>{this.state.strength}/{this.state.health}</div>
			</div>
		);
	}
}