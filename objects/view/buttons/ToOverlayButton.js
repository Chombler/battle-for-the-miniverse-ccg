
const Button = require('./Button.js');

class ToOverlayButton extends Button{
	constructor(name, color, x, y, width, height, textColor, text, textX, textY, toOverlay){
		super(name, color, x, y, width, height, textColor, text, textX, textY);
		this.toOverlay = toOverlay;
	}

	onClick(player){
		player.setOverlay(this.toOverlay);
	}
}

module.exports = ToOverlayButton;