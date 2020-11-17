

class Button{
	constructor(color, x, y, width, height, textColor, text, textX, textY, request){
		this.color = color;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.textColor = textColor;
		this.text = text;
		this.textX = textX;
		this.textY = textY;
		this.request = request;
	}

	onClick(){
		return(this.request);
	}
}

module.exports = Button;