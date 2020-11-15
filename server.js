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
server.listen(port_to_listen, function() {
  console.log(`Listening on ${port_to_listen}`);
});

const Card = require('./objects/deck/Card.js');
const Player = require('./objects/player/Player.js');
const Game = require('./objects/Game.js');
const Cursor = require('./objects/player/Cursor.js');
const Deck = require('./objects/deck/Deck.js');
const WaitingRoom = require('./objects/view/overlays/waitingroom/WaitingRoom.js');
const MainMenu = require('./objects/view/menus/MainMenu.js');
const BattleMenu = require('./objects/view/menus/BattleMenu.js');

var basic_zombie = new Card("Paul", 2, 2, 1, 375, 125);
var another_zombie = new Card("Bob", 2, 2, 1, 375, 125);
var a_third_zombie = new Card("Chris", 2, 2, 1, 375, 125);

var cards = [basic_zombie, another_zombie, a_third_zombie];

var deck = new Deck(cards);

var gameId = 0;
var deckId = 0;
var roomId = 0;

var cursors = {};
var players = {};
var waitingrooms

var menus = {
	'Main' : new MainMenu(),
	'Battle' : new BattleMenu()
}

var overlays = {
	'Deck Creation' : null,
	'Waiting Room' : new WaitingRoom(),
	'None' : null
}

//When a connection is made, starts listening for responses from the server
io.on('connection', function(client){

	client.on("newPlayer", function(){

		console.log("A new Player", client.id, "has joined the game");

		cursors[client.id] = new Cursor(0, 0);
		players[client.id] = new Player(client.id, 0);
		players[client.id].addDeck(deck, deckId++);
	});

	client.on('mouseclick', function(mouseX, mouseY) {
		console.log("The mouse was clicked at", mouseX, mouseY, "by socket", client.id);
		cursors[client.id].updatePosition(mouseX, mouseY);
		let cursor = cursors[client.id];
		let player_menu = players[client.id].getMenu();

		console.log(menus[player_menu].checkClick(cursor, players[client.id]));

		console.log(cursors[client.id]);
	});

	client.on('mousemovement', function(mouseX, mouseY) {
		cursors[client.id].updatePosition(mouseX, mouseY);
	});

	client.on('mouselift', function(mouseX, mouseY) {
		console.log("The mouse was lifted at", mouseX, mouseY, "by socket", client.id);
	});

	client.on('disconnect', function(mouseX, mouseY) {
		console.log("The Player", client.id, "has left the game");
	});

});

setInterval(function() {
	for(player in players){
		let player_socket = players[player].socket_id;
		if(player.inGame){
			io.to(player_socket).emit('Game', games[players[player].gameId], player_socket);
		}
		else{
			let player_menu = players[player].getMenu();
			let player_overlay = players[player].getOverlay();
			io.to(player_socket).emit(player_menu, menus[player_menu], overlays[player_overlay], player_socket);			
		}
	}
}, 1000 / 1);

