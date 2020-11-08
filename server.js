//Dependencies
var express = require('express'); //Express
var http = require('http'); //http
var socketio = require('socket.io'); //Socket.io


//Instance Declarations
var app = express(); //Creates an Express instance
var server = http.Server(app); //Creates an http server using the Express framework
var io = socketio(server); //Creates Socket.io instance related to the http server just created

var port_to_listen = process.env.PORT || 3000; //Specifies which port to listen on

app.use('/client', express.static('client'));
app.use('/images', express.static('images'));
app.use('/constants', express.static('constants'));

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
var index;

//When a connection is made, starts listening for responses from the server
io.on('connection', function(client) {
  console.log('Connection made on id:', client.id);

	client.on('mouseclick', function(message, client_mouseX, client_mouseY) {
	  console.log(message, client_mouseX, client_mouseY);
	});

	client.on('mouseclickinside', function(card_index, client_mouseX, client_mouseY, client_cardX, client_cardY) {
	  console.log('The mouse was clicked within basic zombie', client_mouseX, client_mouseY, client_cardX, client_cardY);
	  index = card_index;
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
	  if(dragCard){
	  	io.emit('stopDragging', index);
	  }
	  dragCard = false;
	});
});


setInterval(function() {
	if(dragCard){
		let newX = mouseX - xOffset;
		let newY = mouseY - yOffset;
		io.emit('cardUpdate', index, newX, newY);
	}
}, 1000 / 60);

const Card = require('./objects/card.js');
const Board = require('./objects/board.js');
const Hand = require('./objects/hand.js');
const Player = require('./objects/player.js');

var basic_zombie = new Card("Paul", 2, 2, 1, 375, 125);
var another_zombie = new Card("Bob", 2, 2, 1, 375, 125);
var a_third_zombie = new Card("Chris", 2, 2, 1, 375, 125);

var cards_in_hand = [basic_zombie, another_zombie, a_third_zombie];

var player_hand = new Hand(cards_in_hand, 0, 600, 800, 200);

var gameState = {
	players : {},
	board : new Board(800, 600)
};

gameState.board.addLane(0, 'heights');
gameState.board.addLane(1, 'ground');
gameState.board.addLane(2, 'ground');
gameState.board.addLane(3, 'ground');
gameState.board.addLane(4, 'void');

setInterval(function() {
	io.emit('state', gameState);
}, 1000 / 10);



