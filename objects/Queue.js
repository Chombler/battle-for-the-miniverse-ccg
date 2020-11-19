
const Game = require('./Game.js');
const Board = require('./board/Board.js');

const gameBoard = new Board(null, 800, 400, 0, 0);

gameBoard.addLane(0, 'heights');
gameBoard.addLane(1, 'ground');
gameBoard.addLane(2, 'ground');
gameBoard.addLane(3, 'ground');
gameBoard.addLane(4, 'void');

class Queue{
	constructor(){
		this.bug_players = [];
		this.alien_players = [];
	}

	join(client_id, side){
		if(side == "Bug"){
			this.bug_players.unshift(client_id);
		}
		else if(side == "Alien"){
			this.alien_players.unshift(client_id);
		}
	}

	removePlayer(id){
		for(let index = 0; index < this.alien_players.length; index++){
			if(this.alien_players[index] == id){
				this.alien_players.splice(index, 1);
				return;
			}
		}
		for(let index = 0; index < this.bug_players.length; index++){
			if(this.bug_players[index] == id){
				this.bug_players.splice(index, 1);
				return;
			}
		}
	}

	gameReady(){
		if(this.bug_players.length > 0 && this.alien_players.length > 0){
			return(true);
		}
		return(false);
	}

	createGame(players, gameId){
		let alien_id = this.alien_players.pop();
		let bug_id = this.bug_players.pop();
		let new_board = gameBoard.createCopy(alien_id, bug_id);
		
		console.log("New Game created between players", alien_id, "and", bug_id);
		return new Game(gameId, new_board, players[alien_id], players[bug_id]);
	}
}

module.exports = Queue;