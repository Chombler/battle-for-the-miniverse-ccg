


/*
 * Main Menu Class
 * Has Hierarchal structure as shown below
 * 
 * Main menu
 * -Battle
 * --Waiting Room
 * ---Game (returns to Battle on completion)
 * -Choose deck
 * --Edit Deck
 */

const Button = require('../Button.js');

const escape_request = {
	type : "Escape",
	destination : null,
	queue_side : null
}

const Escape = new Button('Red', 750, 350, 50, 50, 'White', 'X', 775, 375, escape_request);

class QueueOverlay{
	constructor(){
		this.x = 0;
		this.y = 350;
		this.width = 800;
		this.height = 200;
		this.buttons = [Escape];
	}

	checkClick(cursor){
		for(let button of this.buttons){
			if(cursor.isWithin(button)){
				return(button.onClick());
			}
		}
		return(null);
	}

}

module.exports = QueueOverlay;