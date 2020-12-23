/*
 * this class deals with each player's hand
 */

const Constants = require('../../constants/constants.js');
const Card = require('../deck/Card.js');

class Hand{
	constructor(cards){
		this.cards = cards;
		this.x = Constants.hand.PLAYER_X;
		this.y = Constants.hand.PLAYER_Y;
		this.width = Constants.hand.WIDTH;
		this.height = Constants.hand.HEIGHT;
	}

	addCard(card){
		this.cards.push(card);
	}

	getCardCount(){
		return(this.cards.length);
	}

}

module.exports = Hand;
