/*
 * This class is for the board background
 */

const Lane = require('./Lane.js');
const Constants = require('../../constants/constants.js');

class Board{
	constructor(lanes){
		this.x = Constants.board.X;
		this.y = Constants.board.Y;
		this.lanes = lanes == null ? [] : lanes;
	}

	createCopy(){
		return new Board(this.lanes);
	}

	addLane(index, path){
		this.lanes[index] = new Lane(this.x + index * Constants.board.LANE_WIDTH, this.y, path);
	}
}

module.exports = Board;

