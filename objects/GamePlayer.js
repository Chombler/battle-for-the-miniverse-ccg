/*
 * This class creates a game player object
 */

const Card = require('./deck/Card.js');
const Hand = require('./player/Hand.js');
const Cursor = require('./player/Cursor.js');

class GamePlayer{
	constructor(socket_id, deck){
		this.health = 20;
		this.mana = 0;
		this.superMana = 0;
		this.socket_id = socket_id;
		this.deck = deck;
		this.createHand();
		this.mulligan = null;
	}

	setDeck(deck){
		this.deck = deck;
	}

	createHand(){
		let cardsinhand = [];
		for(let i = 0; i < 4; i++){
			cardsinhand.push(this.deck.drawCard());
		}
		this.hand = new Hand(cardsinhand, 0, 600, 800, 200);
	}

	drawCard(){
		if(this.hand.cards.length < 10){
			this.hand.addCard(this.deck.drawCard());
			return(true);
		}
		return(false);
	}

}

module.exports = GamePlayer;

