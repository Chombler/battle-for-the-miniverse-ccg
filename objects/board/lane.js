/*
 * This class is for lanes
 */

class Lane{
	constructor(key, x, y, width, height){
		this.key = key;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.residants = {};
	}

	addResident(name, yParam){
		this.residents[name] = {
			x : this.x + 30,
			y : yParam
		}
	}

}

module.exports = Lane;