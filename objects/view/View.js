const QueueOverlay = require('./overlays/QueueOverlay.js'); //Includes waiting room object
const { MainMenu, BattleMenu, CollectionMenu } = require('./Menu.js'); //Includes Menu objects

class View{
	constructor(){
		this.menus = {
			'Main' : MainMenu,
			'Battle' : BattleMenu,
			'Collection' : CollectionMenu,
			'Deck Edit' : null
		}

		this.overlays = {
			'Deck Select' : null,
			'Queue' : new QueueOverlay(),
			'None' : null
		}
	}

	checkClick(player){
		if(player.overlay == 'None'){
			return(this.menus[player.menu].checkClick(player.cursor));			
		}
		else{
			return(this.overlays[player.overlay].checkClick(player.cursor));			
		}
	}
}

module.exports = View;