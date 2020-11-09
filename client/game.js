import { Drawing } from './drawing.js';

var socket = io();

var canvas = document.getElementById('canvasId');
var context = canvas.getContext('2d');

var drawing = new Drawing(canvas);

socket.on('state', function(gameState, id) {
	drawing.draw(gameState, id);
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

