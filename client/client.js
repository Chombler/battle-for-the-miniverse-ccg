var socket = io();

socket.on('Game', function(gameState, id) {
});

socket.on('Menu', function(menu, overlay, player_socket) {
});

//Triggers when the mouse is clicked
document.addEventListener('mousedown', function(event) {
	let mouseX = event.offsetX;
	let mouseY = event.offsetY;
});

//Triggers when the mouse is moved
document.addEventListener('mousemove', function(event) {
	let mouseX = event.offsetX;
	let mouseY = event.offsetY;
});

//Triggers when the mouse is de-clicked
document.addEventListener('mouseup', function(event) {
	let mouseX = event.offsetX;
	let mouseY = event.offsetY;
	//socket.emit("mouselift", mouseX, mouseY);
});

//When the page is loaded, tell the server to create
//a new player
socket.emit("newPlayer");

console.log("Loaded client");

