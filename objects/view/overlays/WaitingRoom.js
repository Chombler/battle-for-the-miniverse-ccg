
const Game = require('../../../Game.js');
const Board = require('../../../board/Board.js');

const gameBoard = new Board(null, 800, 600, 0, 0);

gameBoard.addLane(0, 'heights');
gameBoard.addLane(1, 'ground');
gameBoard.addLane(2, 'ground');
gameBoard.addLane(3, 'ground');
gameBoard.addLane(4, 'void');

class WaitingRoom{
	constructor(id, player_socket_id, side){
		this.id = id;
		this.players = {};
		if(player_socket_id == null){
			return;
		}
		this.players[player_socket_id] = side;
	}

	addPlayer(player_socket_id, side){
		this.players[player_socket_id] = side;
		return(this.id);
	}

	getPlayerID(side){
		return(this.players[side]);
	}

	hasSpace(joiningSide){
		for(let id in this.players){
			if(this.players[id] == joiningSide){
				return(false);
			}
		}
		return(true);
	}

	getSide(player_socket_id){
		return(this.players[player_socket_id]);
	}

	isFull(){
		if(this.hasSpace("bug") || this.hasSpace("alien")){
			return(false);
		}
		return(true);
	}

	removePlayer(player_socket_id){
		delete this.players[this.getSide(player_socket_id)];
	}

	createGame(alien_player, bug_player){
		let new_board = gameBoard.createCopy(this.players["alien"], this.players["bug"]);
		let new_game = new Game(new_board, alien_player, bug_player);
		delete this.players["alien"];
		delete this.players["bug"];
		return new_game;
	}
}

module.exports = WaitingRoom;