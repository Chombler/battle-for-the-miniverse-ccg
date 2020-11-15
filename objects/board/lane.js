/*
 * This class is for lanes
 */

class Lane{
	constructor(key, x, y, width, height, bug_player_id, alien_player_id){
		this.key = key;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.residants = {};
		this.residants[bug_player_id] = {};
		this.residants[alien_player_id] = {};
	}

	addResident(client_id, card){
		this.residents[client_id] = card;
	}

	removeResident(card){
		delete this.residents[card.name];
	}

	isPlayable(card){
		if(this.residents.length < 1){
			return(true);
		}
		return(false);
	}

}

module.exports = Lane;