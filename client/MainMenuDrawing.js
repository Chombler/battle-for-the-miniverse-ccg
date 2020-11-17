/*
 * Handles drawing all objects in the game
 */

import { MenuConstants } from '../constants/menu.js';


export class MainMenuDrawing{

	constructor(canvas){
		this.width = canvas.width;
		this.height = canvas.height;

		this.context = canvas.getContext('2d');
	}

	draw(menu, overlay){
		this.context.clearRect(0, 0, this.width, this.height);

		this.drawMenu(menu.buttons);
		if(overlay != null){
			this.drawOverlay(overlay);
		}
	}

	drawMenu(buttons){
		for(let button of buttons){
			this.context.fillStyle = button.color;
			this.context.fillRect(button.x, button.y, button.width, button.height);
			this.context.fillStyle = button.textColor;
			this.context.fillText(button.text, button.textX, button.textY);
		}
	}

	drawOverlay(overlay){
		this.context.fillStyle = 'Black';
		this.context.fillRect(overlay.x, overlay.y, overlay.width, overlay.height);

		for(let button of overlay.buttons){
			this.context.fillStyle = button.color;
			this.context.fillRect(button.x, button.y, button.width, button.height);
			this.context.fillStyle = button.textColor;
			this.context.fillText(button.text, button.textX, button.textY);
		}
	}

}