import { Card } from './card.js';
import { Board } from './board.js';
import { Lane } from './lane.js';
import { Hand } from './hand.js';
import { Cursor } from './cursor.js';

var socket = io();

var canvas = document.getElementById('canvasId');
var context = canvas.getContext('2d');

var heights = new Image();
var ground = new Image();
var the_void = new Image();

heights.src = "/game/images/heights.png";
ground.src = "/game/images/ground.png";
the_void.src = "/game/images/void.png";

var lane_images = [heights, ground, ground, ground, the_void]

var board = new Board(lane_images, 800, 500);
var basic_zombie = new Card("Paul", 2, 2, 1, 375, 125);
var another_zombie = new Card("Bob", 2, 2, 1, 375, 125);
var a_third_zombie = new Card("Chris", 2, 2, 1, 375, 125);

var cards_in_hand = [basic_zombie, another_zombie, a_third_zombie];

var player_hand = new Hand(cards_in_hand, 0, 500, 800, 100);

var player_cursor = new Cursor(0, 0);

setInterval(function() {
	context.clearRect(0, 0, 800, 600);
	board.draw(context);
	player_hand.draw(context);
}, 1000 / 60);

//When a connection is made, tell the console
socket.on('connected', function(data) {
	console.log(data);
});

socket.on('cardUpdate', function(index, x, y) {
	player_hand.getCards()[index].startDragging();
	player_hand.getCards()[index].setLocation(x, y);
});

socket.on('stopDragging', function(index) {
	player_hand.getCards()[index].stopDragging();
});

//Triggers when the mouse is clicked
document.addEventListener('mousedown', function(event) {
	player_cursor.updatePosition(event.offsetX, event.offsetY);
	let index = 0;

	for(let card of player_hand.getCards()){
		if(player_cursor.isWithinCard(card)){
		console.log("The mouse was clicked inside", card.getName(),"which has an index of", index);
			socket.emit('mouseclickinside', index, player_cursor.getX(), player_cursor.getY(), card.getX(), card.getY());
			return;
		}
		index++;
	}
	//Checks to see if click is within card outline
	socket.emit('mouseclick', 'The mouse was clicked', player_cursor.getX(), player_cursor.getY());
 });

//Triggers when the mouse is moved
document.addEventListener('mousemove', function(event) {
	player_cursor.updatePosition(event.offsetX, event.offsetY);

	//Sends the mouse's current position to the server
	socket.emit('mousemovement', player_cursor.getX(), player_cursor.getY());
});

//Triggers when the mouse is de-clicked
document.addEventListener('mouseup', function(event) {
	let index = 0;

	for(let card of player_hand.getCards()){
		if(player_cursor.isWithinCard(card)){
			console.log("The mouse was lifted inside", card.getName(),"which has an index of", index);
			socket.emit('mouselift', 'The mouse was lifted inside a card', player_cursor.getX(), player_cursor.getY());
			return;
		}
		index++;
	}
	//Checks to see if click is within card outline
	socket.emit('mouselift', 'The mouse was lifted', player_cursor.getX(), player_cursor.getY());
});

console.log("Loaded game.js");
