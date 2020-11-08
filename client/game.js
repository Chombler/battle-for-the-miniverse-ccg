import { Drawing } from './drawing.js';

var socket = io();

var canvas = document.getElementById('canvasId');
var context = canvas.getContext('2d');

var lane_images = {};

const drawing = new Drawing(context);


lane_images['heights'] = new Image();
lane_images['heights'].src = '/images/board/heights.png';
lane_images['ground'] = new Image();
lane_images['ground'].src = '/images/board/ground.png';
lane_images['void'] = new Image();
lane_images['void'].src = '/images/board/void.png';

//When a connection is made, tell the console
socket.on('connected', function(data) {
	console.log(data);
});

socket.on('state', function(gameState) {
	context.clearRect(0, 0, canvas.width, canvas.height);

	try{
		drawing.drawBoard(gameState.board);
	}
	catch(error){
		console.log(error);
	}

	for(let player in gameState.players){
		gameState.players[player].draw(context);
	}
});

/*
//Triggers when the mouse is clicked
document.addEventListener('mousedown', function(event) {
	player.getCursor().updatePosition(event.offsetX, event.offsetY);
	let index = 0;

	for(let card of player.getHand().getCards()){
		if(player.getCursor().isWithinCard(card)){
			console.log("The mouse was clicked inside", card.getName(),"which has an index of", index);
			socket.emit('mouseclickinside', index, player.getCursor().getX(), player.getCursor().getY(), card.getX(), card.getY());
			return;
		}
		index++;
	}
	//Checks to see if click is within card outline
	socket.emit('mouseclick', 'The mouse was clicked', player.getCursor().getX(), player.getCursor().getY());
});

//Triggers when the mouse is moved
document.addEventListener('mousemove', function(event) {
	player.getCursor().updatePosition(event.offsetX, event.offsetY);

	//Sends the mouse's current position to the server
	socket.emit('mousemovement', player.getCursor().getX(), player.getCursor().getY());
});

//Triggers when the mouse is de-clicked
document.addEventListener('mouseup', function(event) {
	let index = 0;

	for(let card of player.getHand().getCards()){
		if(player.getCursor().isWithinCard(card)){
			console.log("The mouse was lifted inside", card.getName(), "by player", player.getId(), "the card has an index of", index);
			socket.emit('mouselift', 'The mouse was lifted inside a card', player.getCursor().getX(), player.getCursor().getY());
			return;
		}
		index++;
	}
	//Checks to see if click is within card outline
	socket.emit('mouselift', 'The mouse was lifted', player.getCursor().getX(), player.getCursor().getY());
});
*/
console.log("Loaded game.js");
