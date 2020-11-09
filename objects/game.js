const Card = require('./deck/card.js');
const Board = require('./board/board.js');
const Hand = require('./player/hand.js');
const Player = require('./player/player.js');

class Game{
	/*constructor(alien_player, bug_player, board){
		this.alien_id = alien_player.id
		this.bug_id = bug_player.id
		this.players[alien_id] = alien_player;
		this.players[bug_id] = bug_player;
		this.board = board;
	}*/

	constructor(board){
		this.board = board;
		this.players = {};
	}

	addPlayer(player, client_id){
		this.players[client_id] = player;
	}

	updateMousePosition(client_id, mouseX, mouseY){
		this.players[client_id].cursor.updatePosition(mouseX, mouseY);
	}

	checkMousePosition(client_id){
		let cursor = this.players[client_id].cursor;
		for(let card_index in this.players[client_id].hand.cards){
			let card = this.players[client_id].hand.cards[card_index];
			console.log(card.x, card.y);

			if(cursor.isWithin(card)){
				console.log(true);
				this.players[client_id].hand.cards[card_index].startDragging();
				this.players[client_id].cursor.setOffsetFrom(card);
				console.log(this.players[client_id].cursor.xOffset, this.players[client_id].cursor.yOffset);
				return;
			}

		}
		console.log(false);
		console.log(this.players[client_id].cursor.xOffset, this.players[client_id].cursor.yOffset);
	}

	stopDragging(client_id){
		for(let card of this.players[client_id].hand.cards){
			card.stopDragging();
		}
	}

	update(){
		for(let player in this.players){
			let hand = this.players[player].hand;
			let mouseX = this.players[player].cursor.mouseX;
			let mouseY = this.players[player].cursor.mouseY;
			let xOffset = this.players[player].cursor.xOffset;
			let yOffset = this.players[player].cursor.yOffset;

			let startX = hand.x + (hand.width / 2 - 100 * (hand.cards.length / 2));

			for(let card of this.players[player].hand.cards){
				if(!card.isBeingDragged){
					card.setLocation(startX, hand.y);
				}
				else{
					card.setLocation(mouseX - xOffset, mouseY - yOffset);
					
				}

				startX += 100;
			}

		}

	}

	deletePlayer(client_id){
		delete this.players[client_id];
	}
}

module.exports = Game;