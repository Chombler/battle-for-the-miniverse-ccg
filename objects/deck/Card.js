/*
 * This class is for cards
 */

const Constants = require('../../constants/constants.js');

class Card{
	constructor(name, strength, health, cost, x, y){
		this.name = name;
		this.cost = cost;
		this.strength = strength;
		this.health = health;
		this.x = x;
		this.y = y;
		this.width = Constants.card.WIDTH;
		this.height = Constants.card.HEIGHT;
		this.isBeingDragged = false;
	}

	setWidth(width){
		this.width = width;
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

	createCopy(){
		return new Card(this.name, this.strength, this.health, this.cost, this.x, this.y);
	}
}

module.exports = Card;
