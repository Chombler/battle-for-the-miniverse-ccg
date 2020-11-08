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

	isWithinCard(card){
		if(this.mouseX > card.getX() &&
			this.mouseX < (card.getX() + card.getWidth())
			&&
			this.mouseY > card.getY() &&
			this.mouseY < (card.getY() + card.getHeight()) ){
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