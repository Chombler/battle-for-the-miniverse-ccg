import { Card } from './card.js';
import { Board } from './board.js';
import { Lane } from './lane.js';
var socket = io();

var canvas = document.getElementById('canvasId');
var context = canvas.getContext('2d');
var heights = new Image();
var ground = new Image();
var the_void = new Image();

heights.src = "/game/images/heights.png";
ground.src = "/game/images/ground.png";
the_void.src = "/game/images/void.png";

var board = new Board(heights, ground, ground, ground, the_void, 800, 600);
var basic_zombie = new Card("Paul", 2, 2, 1, 375, 125, 50, 50);

setInterval(function() {
	board.draw(context);
	basic_zombie.draw(context);
}, 1000 / 60);

//When a connection is made, tell the console
socket.on('message', function(data) {
  console.log(data);
});

socket.on('cardUpdate', function(x, y) {
  basic_zombie.setLocation(x, y);
});

var mouseX = 0;
var mouseY = 0;

//Triggers when the mouse is clicked
document.addEventListener('mousedown', function(event) {
  mouseX = event.offsetX;
  mouseY = event.offsetY;

  //Checks to see if click is within card outline
 	if(basic_zombie.withinOutline(mouseX, mouseY)){
		socket.emit('mouseclickinside', 'The mouse was clicked within basic zombie', mouseX, mouseY, basic_zombie.getX(), basic_zombie.getY());
 	}
 	else{
		socket.emit('mouseclick', 'The mouse was clicked', mouseX, mouseY);
 	}
});

//Triggers when the mouse is moved
document.addEventListener('mousemove', function(event) {
  mouseX = event.offsetX;
  mouseY = event.offsetY;

  //Sends the mouse's current position to the server
  socket.emit('mousemovement', mouseX, mouseY);

});


//Triggers when the mouse is de-clicked
document.addEventListener('mouseup', function(event) {
  mouseX = event.offsetX;
  mouseY = event.offsetY;

  //Checks to see if click is within card outline
 	if(basic_zombie.withinOutline(mouseX, mouseY)){
		socket.emit('mouselift', 'The mouse was lifted within basic zombie', mouseX, mouseY);
 	}
 	else{
		socket.emit('mouselift', 'The mouse was lifted', mouseX, mouseY);
 	}
});


console.log("Loaded game.js");
