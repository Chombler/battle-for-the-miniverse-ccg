
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

const Button = require('../buttons/Button.js');

const back_request = {
	type : "Menu",
	destination : "Main",
	queue_side : null
}

const Back = new Button('Black', 0, 0, 100, 100, 'White', 'Back', 45, 45, back_request);

class CollectionMenu{
	constructor(){
		this.buttons = [Back];
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

module.exports = CollectionMenu;