/*
 * Handles drawing all objects in the game
 */

import { BoardConstants } from '../constants/board.js';
import { CardConstants } from '../constants/card.js';


export class GameDrawing{

	constructor(canvas){
		this.width = canvas.width;
		this.height = canvas.height;

		this.context = canvas.getContext('2d');

		const images = {};

		for(let key of BoardConstants.IMG_KEYS){
			images[key] = new Image();
			images[key].src = `${BoardConstants.PATH}/${key}.png`;
		}

		this.images = images;
	}

	draw(gameState, client_id){
		this.context.clearRect(0, 0, this.width, this.height);

		this.drawBoard(gameState.board, client_id);
		for(let player in gameState.players){
			this.drawPlayer(gameState.players[player], player == client_id ? false : true);
		}
	}

	drawBoard(board, client_id){
		for(let lane of board.lanes){
			this.context.drawImage(this.images[lane.key], lane.x, lane.y, lane.width, lane.height);
		}
	}

	drawPlayer(player, opponent){
		this.drawHand(player.hand, opponent);
	}

	drawHand(hand, opponent){
		if(opponent){
			this.context.fillStyle = 'Red';
			this.context.fillRect(0, 0, hand.width, hand.height);
		}
		else{
			this.context.fillStyle = 'Green';
			this.context.fillRect(hand.x, hand.y, hand.width, hand.height);
		}
		this.context.fillStyle = 'Black';
		this.context.strokeStyle = 'Black';

		for(let card of hand.cards){
			this.drawCardinHand(card, opponent);
		}
	}

	drawCardinHand(card, opponent){
		if(opponent){
			this.context.fillRect(card.x, card.y - 600, card.width, card.height);
		}
		else{
			this.context.strokeRect(card.x, card.y, card.width, card.height);
			this.context.fillText(card.name, card.x + 10, card.y + 15);
			this.context.fillText(card.cost, card.x + card.width - 15, card.y + 15);
			let stats = card.strength + "/" + card.health;
			this.context.fillText(stats, card.x + card.width - 20, card.y + card.height - 5);
		}
	}
}