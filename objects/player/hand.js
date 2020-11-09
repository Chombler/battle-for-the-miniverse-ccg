/*
 * this class deals with each player's hand
 */

const Card = require('../deck/card.js');

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
		if(this.cards.length < 10){
			this.cards.append(card);
			return(true);
		}
		return(false);
	}

	getCards(){
		return(this.cards);
	}
}

module.exports = Hand;