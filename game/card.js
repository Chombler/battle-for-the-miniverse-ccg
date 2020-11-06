/*
 * This class is for cards
 */

export class Card{
	constructor(name, strength, health, cost, x, y){
		this.name = name;
		this.strength = strength;
		this.health = health;
		this.cost = cost;
		this.x = x;
		this.y = y;
		this.width = 100;
		this.height = 100;
		this.beingDragged = false;
	}
	
	setLocation(x, y){
		this.x = x;
		this.y = y;
	}

	setSize(width, height){
		this.width = width;
		this.height = height;
	}

	setLocationAndSize(x, y, width, height){
		this.setLocation(x, y);
		this.setSize(width, height);
	}

	draw(context){
		context.beginPath();
		context.rect(this.x, this.y, this.width, this.height);
		context.fillText(this.name, this.x + 2, this.y + 10);
		context.stroke();
	}

	drawLocation(context, x, y){
		this.setLocation(x, y)
		this.draw(context);
	}

	drawSize(context, width, height){
		this.setSize(width, height)
		this.draw(context);
	}

	drawLocationAndSize(context, x, y, width,  height){
		this.setLocation(x, y);
		this.setSize(width, height);
		this.draw(context)
	}

	startDragging(){
		this.beingDragged = true;
	}

	stopDragging(){
		this.beingDragged = false;
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

	getName(){
		return(this.name);
	}

	isBeingDragged(){
		return(this.beingDragged);
	}
}
