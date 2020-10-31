/*
 * this class deals with each player's hand
 */

import { Card } from "./card.js";

export class Hand{
	constructor(cards, x, y, width, height, card_width, card_length){
		this.cards = cards;
		this.width = width;
		this.length = length;
		this.card_width = card_width;
		this.card_length = card_length;
	}

	draw(context){
		if(this.cards.len() % 2 == 1){
			let startX = this.width / 2 - this.cards.len() * this.card_width / 2;

			for(card in cards){
				card.draw(context, startX, startY)
			}
		}

	}

}