//Dependencies
var express = require('express'); //Express
var http = require('http'); //http
var socketio = require('socket.io'); //Socket.io


//Instance Declarations
var app = express(); //Creates an Express instance
var server = http.Server(app); //Creates an http server using the Express framework
var io = socketio(server); //Creates Socket.io instance related to the http server just created

var port_to_listen = process.env.PORT || 3000; //Specifies which port to listen on

//Includes the following static files
//for use client-side
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

const Card = require('./objects/deck/card.js');
const Board = require('./objects/board/board.js');
const Hand = require('./objects/player/hand.js');
const Player = require('./objects/player/player.js');
const Game = require('./objects/game.js');

var basic_zombie = new Card("Paul", 2, 2, 1, 375, 125);
var another_zombie = new Card("Bob", 2, 2, 1, 375, 125);
var a_third_zombie = new Card("Chris", 2, 2, 1, 375, 125);

var cards_in_hand = [basic_zombie, another_zombie, a_third_zombie];

var player_hand = new Hand(cards_in_hand, 0, 600, 800, 200);

var board = new Board(800, 600);
board.addLane(0, 'heights');
board.addLane(1, 'ground');
board.addLane(2, 'ground');
board.addLane(3, 'ground');
board.addLane(4, 'void');

var game = new Game(board);

//When a connection is made, starts listening for responses from the server
io.on('connection', function(client) {

	client.on("newPlayer", function(){
		console.log("A New Player has joined the game with the id", client.id);
		game.addPlayer(new Player(client.id, client.id, player_hand), client.id);
		console.log(game.players);
	});

	client.on('mouseclick', function(mouseX, mouseY) {
		console.log("The mouse was clicked at", mouseX, mouseY, "by player", client.id);
		game.updateMousePosition(client.id, mouseX, mouseY);
		game.checkMousePosition(client.id);
	});

	client.on('mousemovement', function(mouseX, mouseY) {
		game.updateMousePosition(client.id, mouseX, mouseY);
	});

	client.on('mouselift', function(mouseX, mouseY) {
		console.log("The mouse was lifted at", mouseX, mouseY, "by player", client.id);
		game.stopDragging(client.id);
	});

	client.on('disconnect', function(mouseX, mouseY) {
		console.log("A Player has left the game with the id", client.id);
		game.deletePlayer(client.id);
		console.log(game.players);
	});

});

setInterval(function() {
	game.update()
	for(player in game.players){
		io.to(player).emit('state', game, player);
	}
}, 1000 / 1);

