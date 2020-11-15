/*
 * This class is for the board background
 */

const Lane = require('./Lane.js');

class Board{
	constructor(lanes, width, height, alien_player_id, bug_player_id){
		this.lanes = lanes == null ? [] : lanes;
		this.lane_width = width / 5;
		this.width = width;
		this.height = height;
		this.alien_player_id = alien_player_id;
		this.bug_player_id = bug_player_id;
	}

	createCopy(alien_player, bug_player){
		return new Board(this.lanes, this.width, this.height, alien_player.socket_id, bug_player.socket_id);
	}

	addLane(index, path){
		this.lanes[index] = new Lane(path, this.lane_width * index, 0, this.lane_width, this.height, this.bug_player_id, this.alien_player_id);
	}

	getLanes(){
		return(this.lanes);
	}
	
}

module.exports = Board;

