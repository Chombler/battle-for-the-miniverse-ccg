/*
 * This class is for cards
 */

//const CardConstants = require('../constants/card.js');

class Card{
	constructor(name, strength, health, cost, x, y){
		this.name = name;
		this.cost = cost;
		this.strength = strength;
		this.health = health;
		this.x = x;
		this.y = y;
		this.width = 100;
		this.height = 100;
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

	createCopy(){
		return new Card(this.name, this.strength, this.health, this.cost, this.x, this.y);
	}
}

module.exports = Card;