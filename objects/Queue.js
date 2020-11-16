
const Game = require('./Game.js');
const Board = require('./board/Board.js');

const gameBoard = new Board(null, 800, 600, 0, 0);

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

	join(client_id, side, players, games){
		if(side == "Bug"){
			this.bugJoin(client_id, players, games);
		}
		else if(side == "Alien"){
			this.alienJoin(client_id, players, games);
		}
	}

	bugJoin(bug_id, players, games){
		for(let index = 0; index < this.alien_players.length; index++){
			let alien_id = this.alien_players[index];
			this.alien_players.splice(index, 1);
			return this.createGame(players[alien_id], players[bug_id]);
		}
		this.bug_players.push(bug_id);
	}

	alienJoin(alien_id, players){
		for(let index = 0; index < this.bug_players.length; index++){
			let bug_id = this.bug_players[index];
			this.bug_players.splice(index, 1);
			return this.createGame(players[alien_id], players[bug_id]);
		}
		this.alien_players.push(alien_id);
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

	createGame(alien_player, bug_player){
		let new_board = gameBoard.createCopy(alien_player, bug_player);
		return new Game(new_board, alien_player, bug_player);
	}
}

module.exports = Queue;