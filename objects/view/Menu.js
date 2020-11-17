
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

const Button = require('./Button.js');

class Menu{
	constructor(buttons){
		this.buttons = buttons;
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

const MainMenu = new Menu([MainToCollection, MainToBattle]);

const battle_back_request = {
	type : "Menu",
	destination : "Main",
	queue_side : null
}

const alien_battle_request = {
	type : "Queue",
	destination : "Queue",
	queue_side : "Alien"
}

const bug_battle_request = {
	type : "Queue",
	destination : "Queue",
	queue_side : "Bug"
}

const BackBattle = new Button('Black', 0, 0, 100, 100, 'White', 'Back', 45, 45, battle_back_request);
const BattleAsAlien = new Button('Purple', 150, 400, 200, 200, 'Black', 'Battle As Alien', 200, 500, alien_battle_request);
const BattleAsBug = new Button('Blue', 550, 400, 200, 200, 'Black', 'Battle As Bug', 600, 500, bug_battle_request);

const BattleMenu = new Menu([BackBattle, BattleAsAlien, BattleAsBug]);

const collection_back_request = {
	type : "Menu",
	destination : "Main",
	queue_side : null
}

const BackCollection = new Button('Black', 0, 0, 100, 100, 'White', 'Back', 45, 45, collection_back_request);

const CollectionMenu = new Menu([BackCollection]);

module.exports = { Menu, MainMenu, BattleMenu, CollectionMenu };



