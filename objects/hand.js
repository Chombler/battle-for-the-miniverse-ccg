/*
 * this class deals with each player's hand
 */

const Card = require('./card.js');

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

	draw(context){
		context.fillStyle = 'Green';

		context.fillRect(this.x, this.y, this.width, this.height);

		let startX = this.x  + (this.width / 2 - card_length * (this.cards.length / 2));

		for(let card of this.cards){
			if(card.isBeingDragged()){
				card.draw(context);
			}
			else{
				card.drawLocation(context, startX, this.y);
			}
			startX += card_length;
		}
	}

	getCard(index){
		return(this.cards[index]);
	}

	getCards(){
		return(this.cards);
	}
}

module.exports = Hand;