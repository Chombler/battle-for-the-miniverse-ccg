const Card = require('./deck/Card.js');
const Board = require('./board/Board.js');
const Hand = require('./player/Hand.js');
const Player = require('./player/Player.js');

class Game{
	/*constructor(alien_player, bug_player, board){
		this.alien_id = alien_player.id
		this.bug_id = bug_player.id
		this.players[alien_id] = alien_player;
		this.players[bug_id] = bug_player;
		this.board = board;
	}*/

	constructor(board, bug_player, alien_player){
		this.board = board;
		this.players = {};
		this.addPlayer(bug_player, bug_player.socket_id);
		this.addPlayer(alien_player, alien_player.socket_id);
	}

	addPlayer(player, client_id){
		this.players[client_id] = player;
	}

	checkMousePosition(client_id, cursor){
		for(let card of this.players[client_id].hand.cards){
			if(cursor.isWithin(card)){
				card.startDragging();
				cursor.setOffsetFrom(card);
				return;
			}
		}

	}

	stopDragging(client_id){
		for(let card of this.players[client_id].hand.cards){
			card.stopDragging();
		}
	}

	update(){
		for(let player in this.players){
			if(this.updateHand(this.players[player])){

			}
		}

	}

	updateHand(player){
		let dragging = false;
		let hand = player.hand;
		let mouseX = player.cursor.mouseX;
		let mouseY = player.cursor.mouseY;
		let xOffset = player.cursor.xOffset;
		let yOffset = player.cursor.yOffset;
		let startX = hand.x + (hand.width / 2 - 100 * (hand.cards.length / 2));

		for(let card of player.hand.cards){
			if(!card.isBeingDragged){
				card.setLocation(startX, hand.y);
			}
			else{
				card.setLocation(mouseX - xOffset, mouseY - yOffset);
				dragging = true;
			}
			startX += 100;
		}
		return(dragging);
	}

	deletePlayer(client_id){
		delete this.players[client_id];
	}
}

module.exports = Game;