/*
 * This class stores information about a player's cursor
 */

const Card = require('./card.js');

class Cursor{
	constructor(mouseX, mouseY){
		this.mouseX = mouseX;
		this.mouseY = mouseY;
	}

	updatePosition(mouseX, mouseY){
		this.mouseX = mouseX;
		this.mouseY = mouseY;
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

	getX(){
		return(this.mouseX);
	}

	getY(){
		return(this.mouseY);
	}
}

module.exports = Cursor;