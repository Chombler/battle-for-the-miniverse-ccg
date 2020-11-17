import { GameDrawing } from './GameDrawing.js';
import { MainMenuDrawing } from './MainMenuDrawing.js';

var socket = io();

var canvas = document.getElementById('canvasId');
var context = canvas.getContext('2d');

var game_drawing = new GameDrawing(canvas);
var menu_drawing = new MainMenuDrawing(canvas);

socket.on('Game', function(gameState, id) {
	game_drawing.draw(gameState, id);
});

socket.on('Waiting Rooms', function() {
	context.clearRect(0, 0, 800, 600);
	context.fillText("You are waiting", 400, 300);
});

socket.on('Main', function(menu, overlay, player_socket) {
	menu_drawing.draw(menu, overlay);
});

socket.on('Battle', function(battle, overlay, player_socket) {
	menu_drawing.draw(battle, overlay);
});

socket.on('Collection', function(collection, overlay, player_socket) {
	menu_drawing.draw(collection, overlay);
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

