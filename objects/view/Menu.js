
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

const MainToCollection = new Button('Green', 500, 75, 200, 150, 'Black', 'Collection', 571, 139, to_collection_request);
const MainToBattle = new Button('Red', 50, 75, 400, 225, 'Black', 'Battle', 221, 176, to_battle_request);

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

const BackBattle = new Button('Black', 0, 0, 75, 75, 'White', 'Back', 24, 31, battle_back_request);
const BattleAsAlien = new Button('Purple', 25, 150, 125, 50, 'Black', 'Battle As Alien', 48, 168, alien_battle_request);
const BattleAsBug = new Button('Blue', 25, 225, 125, 50, 'Black', 'Battle As Bug', 52, 243, bug_battle_request);

const BattleMenu = new Menu([BackBattle, BattleAsAlien, BattleAsBug]);

const collection_back_request = {
	type : "Menu",
	destination : "Main",
	queue_side : null
}

const BackCollection = new Button('Black', 0, 0, 75, 75, 'White', 'Back', 24, 31, collection_back_request);

const CollectionMenu = new Menu([BackCollection]);

module.exports = { Menu, MainMenu, BattleMenu, CollectionMenu };



