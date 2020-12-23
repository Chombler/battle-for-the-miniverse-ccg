/*
 * Handles drawing all objects in the game
 */

const Constants = require('../constants/constants.js');

class GameDrawing{

	constructor(canvas){
		this.width = canvas.width;
		this.height = canvas.height;

		this.context = canvas.getContext('2d');

		const images = {};

		for(let key of Constants.board.IMG_KEYS){
			images[key] = new Image();
			images[key].src = `${Constants.board.PATH}/${key}.png`;
		}

		this.images = images;
	}

	draw(gameState, client_id){
		this.context.clearRect(0, 0, this.width, this.height);

		this.drawBoard(gameState.board, client_id);
		this.drawPlayer(gameState.bug_player, gameState.bug_player.socket_id == client_id ? false : true);
		this.drawPlayer(gameState.alien_player, gameState.alien_player.socket_id == client_id ? false : true);
	}

	drawBoard(board, client_id){
		let index = 0
		for(let lane of board.lanes){
			this.context.drawImage(this.images[lane.key], lane.x, lane.y, lane.width, lane.height);
			index++;
		}
	}

	drawPlayer(player, isOpponent){
		this.drawHand(player.hand, isOpponent);
	}

	drawHand(hand, isOpponent){
		if(isOpponent){
			this.context.fillStyle = Constants.hand.OPPONENT_FILL_COLOR;
			this.context.fillRect(Constants.hand.OPPONENT_X, Constants.hand.OPPONENT_Y, hand.width, hand.height);
		}
		else{
			this.context.fillStyle = Constants.hand.PLAYER_FILL_COLOR;
			this.context.fillRect(hand.x, hand.y, hand.width, hand.height);
		}
		this.context.fillStyle = 'Black';
		this.context.strokeStyle = 'Black';

		for(let card of hand.cards){
			this.drawCardinHand(card, isOpponent);
		}
	}

	drawCardinHand(card, isOpponent){
		if(isOpponent){
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

module.exports = GameDrawing;