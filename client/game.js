var socket = io();
var x = 0;
var y = 0;

console.log("Loaded game.js")

//When a connection is made, tell the console
socket.on('message', function(data) {
  console.log(data);
});

document.addEventListener('mousedown', function(event) {
  x = event.offsetX;
  y = event.offsetY;
	console.log('mouse down');
	socket.emit('mouseclick', 'The mouse was clicked', x, y);
});

document.addEventListener('mouseup', function(event) {
  x = event.offsetX;
  y = event.offsetY;
	console.log('mouse up');
	socket.emit('mouselift', 'The mouse was lifted', x, y);
});
