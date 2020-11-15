
const Card = require('./Card.js');

class Deck{
	constructor(cards){
		this.cards = cards;
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
	
}

module.exports = Deck;