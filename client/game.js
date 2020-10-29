var socket = io();

console.log("Loaded game.js")

socket.on('message', function(data) {
	console.log("message received")
  console.log(data);
});

