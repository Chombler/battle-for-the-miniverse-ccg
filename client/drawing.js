/*
 * Handles drawing all objects in the game
 */

import { BoardConstants } from '../constants/board.js';

export class Drawing{

	constructor(context){
		this.context = context;

		const images = {};

		for(let key of BoardConstants.LANE_IMG_KEYS){
			console.log(key);
			images[key] = new Image();
			images[key].src = `${BoardConstants.BOARD_PATH}/${key}.png`;
		}

		this.images = images;
	}

	drawBoard(board){
		for(let lane of board.lanes){
			this.context.drawImage(this.images[lane.key], lane.x, lane.y, lane.width, lane.height);
		}
	}

}
