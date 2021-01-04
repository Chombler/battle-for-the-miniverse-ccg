const Card = require('./deck/Card.js');
const Board = require('./board/Board.js');
const Hand = require('./player/Hand.js');
const Player = require('./player/Player.js');
const Constants = require('../constants/constants.js');

const sections = ['Mulligan', 'Main', 'Post'];
const phases = ['Alien', 'Bug', 'Alien Tricks', 'Battle'];


class Game{
	constructor(id, board, bug_player, alien_player){
		this.id = id;
		this.players = {};
		this.bug_player = bug_player.createGamePlayer(this.id, board);
		this.alien_player = alien_player.createGamePlayer(this.id, board);
		this.phase = 0;
	}

	getPlayer(client_id){
		if(this.bug_player.socket_id == client_id){
			return(this.bug_player);
		}
		if(this.alien_player.socket_id == client_id){
			return(this.alien_player);
		}
		console.log("No Player with that client id was found");
		return(0);
	}

	checkMousePosition(client_id){
		this.checkHandClick(this.getPlayer(client_id));
	}

	checkHandClick(player){
		console.log("Player clicked the mouse");
		for(let card of player.hand.cards){
			if(player.cursor.isWithin(card)){
				console.log("clicked within card");
				card.startDragging();
				player.cursor.setOffsetFrom(card);
				return;
			}
		}
	}

	stopDragging(client_id){
		for(let card of this.getPlayer(client_id).hand.cards){
			card.stopDragging();
		}
	}

	update(){
		this.updateHand(this.bug_player);
		this.updateHand(this.alien_player);
	}

	updateHand(player){
		let dragging = false;
		let hand = player.hand;
		let cardX = player.cursor.mouseX - player.cursor.xOffset;
		let cardY = player.cursor.mouseY - player.cursor.yOffset;
		let card_width = (hand.width / hand.getCardCount() > Constants.card.WIDTH) ? Constants.Constants.card.WIDTH : (hand.width / hand.getCardCount());
		let startX = hand.x + (hand.width / 2 - card_width * (hand.getCardCount() / 2));

		for(let card of player.hand.cards){
			if(!card.isBeingDragged){
				card.setWidth(card_width);
				card.setLocation(startX, hand.y);
			}
			else{
				card.setWidth(card_width);
				card.setLocation(cardX, cardY);
				dragging = true;
			}
			startX += card_width;
		}
		return(dragging);
	}

	deletePlayer(client_id){
		delete this.players[client_id];
	}
}

module.exports = Game;
