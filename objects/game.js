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

	constructor(id, board, bug_player, alien_player){
		this.id = id;
		this.board = board;
		this.players = {};
		this.addPlayer(bug_player, bug_player.socket_id);
		this.addPlayer(alien_player, alien_player.socket_id);
	}

	addPlayer(player, client_id){
		player.setGameId(this.id);
		this.players[client_id] = player.createGamePlayer(this.id);
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

	update(cursor){
		for(let player in this.players){
			if(this.updateHand(this.players[player], cursor)){

			}
		}
	}

	updateHand(player, cursor){
		let dragging = false;
		let hand = player.hand;
		let mouseX = cursor.mouseX;
		let mouseY = cursor.mouseY;
		let xOffset = cursor.xOffset;
		let yOffset = cursor.yOffset;
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