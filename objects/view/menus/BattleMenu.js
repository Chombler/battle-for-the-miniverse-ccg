
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

const Back = new ToMenuButton('Black', 0, 0, 100, 100, 'White', 'Back', 45, 45, 'Main');
const BattleAsAlien = new ToMenuButton('Purple', 150, 400, 200, 200, 'Black', 'Battle As Alien', 200, 500, 'Waiting Room');
const BattleAsBug = new ToMenuButton('Blue', 550, 400, 200, 200, 'Black', 'Battle As Bug', 600, 500, 'Waiting Room');

class MainMenu{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.width = 800;
		this.height = 800;
		this.buttons = [Back, BattleAsAlien, BattleAsBug];
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