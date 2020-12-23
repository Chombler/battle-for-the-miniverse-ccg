const GameDrawing = require('./GameDrawing.js');
const MenuDrawing = require('./MenuDrawing.js');

var socket = io();

var canvas = document.getElementById('canvasId');
var context = canvas.getContext('2d');

var game_drawing = new GameDrawing(canvas);
var menu_drawing = new MenuDrawing(canvas);

socket.on('Game', function(gameState, id) {
	console.log("In game")
	console.log(gameState);
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

