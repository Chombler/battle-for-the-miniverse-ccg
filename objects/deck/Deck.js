
const Card = require('./Card.js');

class Deck{
	constructor(cards){
		let temp = [];
		for(let card of cards){
			temp.push(card.createCopy());
		}
		this.cards = temp;
	}

	drawCard(){
		return(this.cards.pop());
	}

	shuffle(){
		let temp = this.cards;
		for(let i = 0; i < this.cards.length; i++){
			let index = Math.floor(Math.random() * temp.length);
			this.cards[i] = temp[index];
			temp.splice(index, 1);
		}
	}

	createCopy(){
		return new Deck(this.cards);
	}
	
}

module.exports = Deck;
