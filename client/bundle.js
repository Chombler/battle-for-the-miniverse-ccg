(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
 * Handles drawing all objects in the game
 */

const Constants = require('../constants/constants.js');

class GameDrawing{

	constructor(canvas){
		this.width = canvas.width;
		this.height = canvas.height;

		this.context = canvas.getContext('2d');

		const images = {};

		for(let key of Constants.board.IMG_KEYS){
			images[key] = new Image();
			images[key].src = `${Constants.board.PATH}/${key}.png`;
		}

		this.images = images;
	}

	draw(gameState, client_id){
		this.context.clearRect(0, 0, this.width, this.height);

		this.drawPlayer(gameState.bug_player, gameState.bug_player.socket_id == client_id ? false : true);
		this.drawPlayer(gameState.alien_player, gameState.alien_player.socket_id == client_id ? false : true);
	}

	drawBoard(board, isOpponent){
		let index = 0
		if(isOpponent){
			for(let lane of board.lanes){
				this.context.drawImage(this.images[lane.key], lane.x, lane.y, lane.width, lane.height);
				index++;
			}
		}
		else{
			for(let lane of board.lanes){
				this.context.drawImage(this.images[lane.key], lane.x, lane.y + lane.height, lane.width, lane.height);
				index++;
			}
		}
	}

	drawPlayer(player, isOpponent){
		this.drawBoard(player.board, isOpponent);
		this.drawHand(player.hand, isOpponent);
	}

	drawHand(hand, isOpponent){
		if(isOpponent){
			this.context.fillStyle = Constants.hand.OPPONENT_FILL_COLOR;
			this.context.fillRect(Constants.hand.OPPONENT_X, Constants.hand.OPPONENT_Y, hand.width, hand.height);
		}
		else{
			this.context.fillStyle = Constants.hand.PLAYER_FILL_COLOR;
			this.context.fillRect(hand.x, hand.y, hand.width, hand.height);
		}
		this.context.fillStyle = 'Black';
		this.context.strokeStyle = 'Black';

		for(let card of hand.cards){
			this.drawCardinHand(card, isOpponent);
		}
	}

	drawCardinHand(card, isOpponent){
		if(isOpponent){
			this.context.fillRect(card.x, card.y - 600, card.width, card.height);
		}
		else{
			this.context.strokeRect(card.x, card.y, card.width, card.height);
			this.context.fillText(card.name, card.x + 10, card.y + 15);
			this.context.fillText(card.cost, card.x + card.width - 15, card.y + 15);
			let stats = card.strength + "/" + card.health;
			this.context.fillText(stats, card.x + card.width - 20, card.y + card.height - 5);
		}
	}
}

module.exports = GameDrawing;
},{"../constants/constants.js":4}],2:[function(require,module,exports){
/*
 * Handles drawing all objects in the game
 */


class MenuDrawing{

	constructor(canvas){
		this.width = canvas.width;
		this.height = canvas.height;

		this.context = canvas.getContext('2d');
	}

	draw(menu, overlay){
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.strokeRect(0, 0, this.width, this.height);

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

module.exports  = MenuDrawing;
},{}],3:[function(require,module,exports){
const GameDrawing = require('./GameDrawing.js');
const MenuDrawing = require('./MenuDrawing.js');

var socket = io();

var canvas = document.getElementById('canvasId');
var context = canvas.getContext('2d');

var game_drawing = new GameDrawing(canvas);
var menu_drawing = new MenuDrawing(canvas);

socket.on('Game', function(gameState, id) {
	game_drawing.draw(gameState, id);
});

socket.on('Menu', function(menu, overlay, player_socket) {
	menu_drawing.draw(menu, overlay);
});

//Triggers when the mouse is clicked
document.addEventListener('mousedown', function(event) {
	let mouseX = event.offsetX;
	let mouseY = event.offsetY;

	socket.emit("mouseclick", mouseX, mouseY);
});

//Triggers when the mouse is moved
document.addEventListener('mousemove', function(event) {
	let mouseX = event.offsetX;
	let mouseY = event.offsetY;

	//Sends the mouse's current position to the server
	socket.emit('mousemovement', mouseX, mouseY);
});

//Triggers when the mouse is de-clicked
document.addEventListener('mouseup', function(event) {
	let mouseX = event.offsetX;
	let mouseY = event.offsetY;

	socket.emit("mouselift", mouseX, mouseY);
});

//When the page is loaded, tell the server to create
//a new player
socket.emit("newPlayer");

console.log("Loaded game.js");


},{"./GameDrawing.js":1,"./MenuDrawing.js":2}],4:[function(require,module,exports){

const Constants = {
	hand : {
		PLAYER_X : 75,
		PLAYER_Y : 350,
		PLAYER_FILL_COLOR : 'Green',

		OPPONENT_X : 75,
		OPPONENT_Y : 0,
		OPPONENT_FILL_COLOR : 'Red',
		
		WIDTH : 250,
		HEIGHT : 100
	},

	board : {
		PATH : '/images/board',
		IMG_KEYS : ['heights', 'ground', 'void'],
		X : 150,
		Y : 100,
		WIDTH : 500,
		HEIGHT : 125,
		LANE_WIDTH : 500 / 5
	},

	card : {
		WIDTH : 75,
		HEIGHT : 75
	}
}

module.exports = Constants;
},{}]},{},[3]);
