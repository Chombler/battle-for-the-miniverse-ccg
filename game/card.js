/*
 * This class is for cards
 */

export class Card{
	constructor(name, strength, health, cost, x, y, width, height){
		this.name = name;
		this.strength = strength;
		this.health = health;
		this.cost = cost;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	withinOutline(clickX, clickY){
		if(clickX >= this.x && clickX <= (this.x + this.width) &&
			clickY >= this.y && clickY <= (this.y + this.height)){
			return(true);
		}
		return(false);
	}

	getX(){
		return(this.x);
	}

	getY(){
		return(this.y);
	}

	getWidth(){
		return(this.width);
	}

	getHeight(){
		return(this.height);
	}
}
