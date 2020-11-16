
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

const to_collection_request = {
	type : "Menu",
	destination : "Collection",
	queue_side : null
}

const to_battle_request = {
	type : "Menu",
	destination : "Battle",
	queue_side : null
}

const MainToCollection = new Button('Green', 0, 0, 800, 400, 'Black', 'Collection', 200, 200, to_collection_request);
const MainToBattle = new Button('Red', 0, 400, 800, 400, 'Black', 'Battle', 200, 600, to_battle_request);

class MainMenu{
	constructor(){
		this.buttons = [MainToBattle, MainToCollection];
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

module.exports = MainMenu;