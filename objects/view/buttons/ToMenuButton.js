
const Button = require('./Button.js');

class ToMenuButton extends Button{
	constructor(color, x, y, width, height, textColor, text, textX, textY, toMenu){
		super(color, x, y, width, height, textColor, text, textX, textY);
		this.toMenu = toMenu;
	}

	onClick(player){
		player.setMenu(this.toMenu);
	}
}

module.exports = ToMenuButton;