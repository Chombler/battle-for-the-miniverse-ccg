/*
 * This class is for the board background
 */

const Lane = require('./lane.js');

class Board{
	constructor(width, height){
		this.lanes = [];
		this.lane_width = width / 5;
		this.width = width;
		this.height = height;
	}

	addLane(index, path){
		this.lanes[index] = new Lane(path, this.lane_width * index, 0, this.lane_width, this.height);
	}

	getLanes(){
		return(this.lanes);
	}
	
}

module.exports = Board;