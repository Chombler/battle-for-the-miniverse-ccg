/*
 * This class is for the board background
 */

import { Lane } from './lane.js';

export class Board{
	constructor(lane_images, width, height){
		this.width = width
		this.lane_width = width / 5;
		this.height = height;
		this.lanes = [];
		for(let i = 0; i < 5; i++){
			this.lanes.push(new Lane(lane_images[i], this.lane_width * i, 0, this.lane_width, height));
		}
	}

	draw(context){
		for(let lane of this.lanes){
			lane.draw(context);
		}
	}
	
}