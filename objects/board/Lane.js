/*
 * This class is for lanes
 */

const Constants = require('../../constants/constants.js');

class Lane{
	constructor(x, y, key){
		this.x =  x;
		this.y = y;
		this.width = Constants.board.LANE_WIDTH;
		this.height  = Constants.board.HEIGHT;
		this.key = key;
	}
}

module.exports = Lane;
