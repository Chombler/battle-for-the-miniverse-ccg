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

	draw(menu){
		this.context.clearRect(0, 0, this.width, this.height);

		this.drawMenu(menu.buttons);
	}

	drawMenu(buttons){
		for(let button of buttons){
			this.context.fillStyle = button.color;
			this.context.fillRect(button.x, button.y, button.width, button.height);
			this.context.fillStyle = button.textColor;
			this.context.fillText(button.text, button.textX, button.textY);
		}
	}

	drawBattle(buttons){
		this.context.fillStyle = 'Black';
		this.context.fillRect(buttons[0].x, buttons[0].y, buttons[0].width, buttons[0].height);
		this.context.fillStyle = 'Black';
		this.context.fillText(buttons[0].text, buttons[0].textX, buttons[0].textY);

		this.context.fillStyle = 'Purple';
		this.context.fillRect(buttons[1].x, buttons[1].y, buttons[1].width, buttons[1].height);
		this.context.fillStyle = 'Black';
		this.context.fillText(buttons[1].text, buttons[1].textX, buttons[1].textY);

		this.context.fillStyle = 'Blue';
		this.context.fillRect(buttons[2].x, buttons[2].y, buttons[2].width, buttons[2].height);
		this.context.fillStyle = 'Black';
		this.context.fillText(buttons[2].text, buttons[2].textX, buttons[2].textY);
	}

}