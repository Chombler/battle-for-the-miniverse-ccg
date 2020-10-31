//Dependencies
var express = require('express'); //Express
var http = require('http'); //http
var socketio = require('socket.io'); //Socket.io

//Instance Declarations
var app = express(); //Creates an Express instance
var server = http.Server(app); //Creates an http server using the Express framework
var io = socketio(server); //Creates Socket.io instance related to the http server just created

var port_to_listen = process.env.PORT || 3000; //Specifies which port to listen on

app.use('/game', express.static('game'));

//Default page displayed, always sent to game.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//Tells the server to listen for any incoming inconnections
server.listen(port_to_listen, () => {
  console.log(`Listening on ${port_to_listen}`);
});

var dragCard = false;
var xOffset = 0;
var yOffset = 0;
var mouseX = 0;
var mouseY = 0;

//When a connection is made, starts listening for responses from the server
io.on('connection', function(client) {
  console.log('Connection made');

	client.on('mouseclick', function(message, client_mouseX, client_mouseY) {
	  console.log(message, client_mouseX, client_mouseY);
	});

	client.on('mouseclickinside', function(message, client_mouseX, client_mouseY, client_cardX, client_cardY) {
	  console.log(message, client_mouseX, client_mouseY, client_cardX, client_cardY);
	  xOffset = client_mouseX - client_cardX;
	  yOffset = client_mouseY - client_cardY;
	  dragCard = true;
	});

	client.on('mousemovement', function(client_mouseX, client_mouseY) {
		mouseX = client_mouseX;
		mouseY = client_mouseY;
	});

	client.on('mouselift', function(message, client_mouseX, client_mouseY) {
	  console.log(message, client_mouseX, client_mouseY);
	  dragCard = false;
	});
});


setInterval(function() {
	if(dragCard){
		let newX = mouseX - xOffset;
		let newY = mouseY - yOffset;
		io.emit('cardUpdate', newX, newY)
	}
}, 1000 / 60);
