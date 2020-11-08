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


socket.on('state', function(gameState) {
	context.clearRect(0, 0, canvas.width, canvas.height);

	try{
		drawing.drawBoard(gameState.board);
	}
	catch(error){
		console.log("Board drawing error", error);
	}

	try{
		for(let player in gameState.players){
			drawing.drawPlayer(gameState.players[player]);
		}
	}
	catch(error){
		console.log("Player drawing error", error);
	}
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
