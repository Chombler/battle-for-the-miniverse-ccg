/*
 * this class deals with each player's hand
 */

const Card = require('../deck/Card.js');

let card_length = 100;

class Hand{
	constructor(cards, x, y, width, height){
		this.cards = cards;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	addCard(card){
		this.cards.push(card);
	}

}

module.exports = Hand;