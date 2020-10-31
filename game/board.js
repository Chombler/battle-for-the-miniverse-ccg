/*
 * This class is for the board background
 */

import { Lane } from './lane.js';

export class Board{
	constructor(image_1, image_2, image_3, image_4, image_5, width, height){
		let lane_width = width / 5;
		this.lane1 = new Lane(image_1,							0, 0, lane_width, height);
		this.lane2 = new Lane(image_2,		 lane_width, 0, lane_width, height);
		this.lane3 = new Lane(image_3, 2 * lane_width, 0, lane_width, height);
		this.lane4 = new Lane(image_4, 3 * lane_width, 0, lane_width, height);
		this.lane5 = new Lane(image_5, 4 * lane_width, 0, lane_width, height);
		this.lanes = [this.lane1, this.lane2, this.lane3, this.lane4, this.lane5]
	}

	draw(context){
		var lane;

		for(var i = 0; i < 5; i++){
			this.lanes[i].draw(context);
		}

	}
}