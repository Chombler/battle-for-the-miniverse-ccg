/*
 * This class creates a player object in order to split sides
 */

const Card = require('../deck/Card.js');
const Hand = require('./Hand.js');
const Cursor = require('./Cursor.js');
const GamePlayer = require('../GamePlayer.js');
const menu_locations = ['Main', 'Battle', 'Collection', 'Deck Edit'];
const overlay_locations = ['Deck Select', 'Waiting Room'];

class Player{
	constructor(socket_id){
		this.cursor = new Cursor(0,0);
		this.deckIdIterator = 0;
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

	addDeck(deck){
		this.decks[this.deckIdIterator] = deck;
		this.selectDeck(this.deckIdIterator++);
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
	
	setIntervalId(id){
		this.intervalId = id;
	}

	createGamePlayer(id, board){
		this.gameId = id;
		this.inGame = true;
		this.inQueue = false;
		this.overlay = 'None';
		return new GamePlayer(this.socket_id, this.getCurrentDeck(), board);
	}

}

module.exports = Player;
