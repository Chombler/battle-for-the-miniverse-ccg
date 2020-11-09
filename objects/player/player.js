/*
 * This class creates a player object in order to split sides
 */

const Card = require('../deck/card.js');
const Hand = require('./hand.js');
const Cursor = require('./cursor.js');

class Player{
	constructor(id, socket_id, hand){
		this.id = id;
		this.socket_id = socket_id;
		this.cursor = new Cursor(0, 0);
		this.hand = hand;
	}

	getCursor(){
		return(this.cursor);
	}

	getHand(){
		return(this.hand);
	}

}

module.exports = Player;