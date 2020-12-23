/*
 * This class stores information about a player's cursor
 */

const Card = require('../deck/Card.js');

class Cursor{
	constructor(mouseX, mouseY){
		this.mouseX = mouseX;
		this.mouseY = mouseY;
		this.xOffset = 0;
		this.yOffset = 0;
	}

	updatePosition(mouseX, mouseY){
		this.mouseX = mouseX;
		this.mouseY = mouseY;
	}

	setOffsetFrom(card){
		this.xOffset = this.mouseX - card.x;
		this.yOffset = this.mouseY - card.y;
	}

	isWithin(object){
		console.log(this.mouseX, this.mouseY, object.x, object.x + object.width, object.y, object.y + object.height);
		if(this.mouseX > object.x &&
			this.mouseX < (object.x + object.width)
			&&
			this.mouseY > object.y &&
			this.mouseY < (object.y + object.height) ){
			return(true);
		}
		return(false);
	}

}

module.exports = Cursor;
