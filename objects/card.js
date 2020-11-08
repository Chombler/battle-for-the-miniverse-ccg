/*
 * This class is for cards
 */

//const CardConstants = require('../constants/card.js');

class Card{
	constructor(name, strength, health, cost, x, y){
		this.name = name;
		this.strength = strength;
		this.health = health;
		this.cost = cost;
		this.width = 100;
		this.height = 100;
		this.x = x;
		this.y = y;
		this.isBeingDragged = false;
	}

	setLocation(x, y){
		this.x = x;
		this.y = y;
	}

	startDragging(){
		this.isBeingDragged = true;
	}

	stopDragging(){
		this.isBeingDragged = false;
	}

	getWidth(){
		return(this.width);
	}

	getHeight(){
		return(this.height);
	}
	
	getX(){
		return(this.x);
	}

	getY(){
		return(this.y);
	}

	getName(){
		return(this.name);
	}

	isBeingDragged(){
		return(this.isBeingDragged);
	}
}

module.exports = Card;