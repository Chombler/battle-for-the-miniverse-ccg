
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

const ToMenuButton = require('../buttons/ToMenuButton.js');
const ToOverlayButton = require('../buttons/ToOverlayButton.js');

const MainToCollection = new ToMenuButton('Green', 0, 0, 800, 400, 'Black', 'Collection', 200, 200, 'Collection');
const MainToBattle = new ToMenuButton('Red', 0, 400, 800, 400, 'Black', 'Battle', 200, 600, 'Battle');

class MainMenu{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.width = 800;
		this.height = 800;
		this.buttons = [MainToBattle, MainToCollection];
	}

	checkClick(cursor, player){
		for(let button of this.buttons){
			if(cursor.isWithin(button)){
				button.onClick(player);
				return("The mouse was clicked within a button");
			}
		}
		return("The mouse was NOT clicked within a button");
	}

}

module.exports = MainMenu;