/*
 * This class is for the board background
 */

const Lane = require('./Lane.js');
const Constants = require('../../constants/constants.js');

class Board{
	constructor(lanes, alien_player_id, bug_player_id){
		this.x = Constants.board.X;
		this.y = Constants.board.Y;
		this.lanes = lanes == null ? [] : lanes;
		this.alien_player_id = alien_player_id;
		this.bug_player_id = bug_player_id;
	}

	createCopy(alien_id, bug_id){
		return new Board(this.lanes, alien_id, bug_id);
	}

	addLane(index, path){
		this.lanes[index] = new Lane(this.x + index * Constants.board.LANE_WIDTH, this.y, path);
	}
}

module.exports = Board;

