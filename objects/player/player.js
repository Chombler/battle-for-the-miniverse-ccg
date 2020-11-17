/*
 * This class creates a player object in order to split sides
 */

const Card = require('../deck/Card.js');
const Hand = require('./Hand.js');
const Cursor = require('./Cursor.js');
const GamePlayer = require('../GamePlayer.js');
const menu_locations = ['Main', 'Battle', 'Collection', 'Deck Selection'];
const overlay_locations = ['Deck Creation', 'Waiting Room'];

class Player{
	constructor(socket_id, location){
		this.socket_id = socket_id;
		this.decks = {};
		this.selected_deck_id = 0;
		this.menu = 'Main';
		this.overlay = 'None';
		this.inQueue = false;
		this.inGame = false;
		this.waitroomId = null;
		this.gameId = null;
	}

	addDeck(deck, deck_id){
		this.decks[deck_id] = deck;
		this.selectDeck(deck_id);
	}

	selectDeck(deck_id){
		this.selected_deck_id = deck_id
	}

	getCurrentDeck(){
		return(this.decks[this.selected_deck_id]);
	}

	setMenu(menu){
		this.menu = menu;	
	}

	getMenu(){
		return(this.menu);
	}

	setOverlay(overlay){
		this.overlay = overlay;
	}

	getOverlay(){
		return this.overlay;
	}

	setGameId(id){
		this.gameId = id;
	}
	
	createGamePlayer(){
		return new GamePlayer(this.socket_id, this.decks[this.selected_deck_id]);
	}

}

module.exports = Player;