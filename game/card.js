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

	drawLocationAndSize(context, x, y){
		this.setLocation(x, y);
		this.setSize(width, height);
		this.draw(context)
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
