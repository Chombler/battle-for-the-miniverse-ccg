import { Card } from './card.js';

var socket = io();
var mouseX = 0;
var mouseY = 0;
var canvas = document.getElementById('canvasId');
var context = canvas.getContext('2d');

console.log("Loaded game.js")

//When a connection is made, tell the console
socket.on('message', function(data) {
  console.log(data);
});

document.addEventListener('mousedown', function(event) {
  mouseX = event.offsetX;
  mouseY = event.offsetY;
 	if(basic_zombie.withinOutline(mouseX, mouseY)){
		socket.emit('mouseclick', 'The mouse was clicked within basic zombie', mouseX, mouseY);
 	}
 	else{
		socket.emit('mouseclick', 'The mouse was clicked', mouseX, mouseY);
 	}
});

document.addEventListener('mouseup', function(event) {
  mouseX = event.offsetX;
  mouseY = event.offsetY;
 	if(basic_zombie.withinOutline(mouseX, mouseY)){
		socket.emit('mouselift', 'The mouse was lifted within basic zombie', mouseX, mouseY);
 	}
 	else{
		socket.emit('mouselift', 'The mouse was lifted', mouseX, mouseY);
 	}
});

let basic_zombie = new Card("Paul", 2, 2, 1, 375, 275, 50, 50);
context.beginPath();
context.rect(basic_zombie.getX(), basic_zombie.getY(), basic_zombie.getWidth(), basic_zombie.getHeight());
context.stroke();

