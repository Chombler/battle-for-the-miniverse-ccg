/*
 * Handles drawing all objects in the game
 */

import { BoardConstants } from '../constants/board.js';
import { CardConstants } from '../constants/card.js';


export class Drawing{

	constructor(context){
		this.context = context;

		const images = {};

		for(let key of BoardConstants.IMG_KEYS){
			images[key] = new Image();
			images[key].src = `${BoardConstants.PATH}/${key}.png`;
		}

		this.images = images;
	}

	drawBoard(board){
		for(let lane of board.lanes){
			this.context.drawImage(this.images[lane.key], lane.x, lane.y, lane.width, lane.height);
		}
	}

	drawPlayer(player){
		let hand = player.hand;

		this.context.fillStyle = 'Green';
		this.context.fillRect(hand.x, hand.y, hand.width, hand.height);
		this.context.fillStyle = 'Black';
		this.context.strokeStyle = 'Black';

		for(let card of hand.cards){
			this.context.strokeRect(card.x, card.y, card.width, card.height);
			this.context.fillText(card.name, card.x + 10, card.y + 10);
		}

	}

}