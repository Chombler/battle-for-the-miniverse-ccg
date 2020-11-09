/*
 * This class stores information about a player's cursor
 */

const Card = require('../deck/card.js');

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

	isWithin(card){
		if(this.mouseX > card.x &&
			this.mouseX < (card.x + card.width)
			&&
			this.mouseY > card.y &&
			this.mouseY < (card.y + card.height) ){
			return(true);
		}
		return(false);
	}

}

module.exports = Cursor;