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

//Object imports
const Card = require('./objects/deck/Card.js'); //Includes card object
const Player = require('./objects/player/Player.js'); //Includes Player object
const Game = require('./objects/Game.js'); //Includes game object
const Cursor = require('./objects/player/Cursor.js'); //Includes cursor object
const Deck = require('./objects/deck/Deck.js'); //Includes deck object
const Queue = require('./objects/Queue.js'); //Includes queue object
const View = require('./objects/view/View.js'); //Includes Menu and Overlay views

//Declarations
var first_card = new Card("Wall-Nut", 2, 2, 1, 375, 125);
var second_card = new Card("Sunflower", 2, 2, 1, 375, 125);
var third_card = new Card("Peashooter", 2, 2, 1, 375, 125);
var fourth_card = new Card("Chomper", 2, 2, 1, 375, 125);

var cards = [first_card, second_card, third_card, fourth_card];

var deck = new Deck(cards);

var gameId = 0;
var players = {};
var queue = new Queue();
var games = {};

var view = new View();

//When a connection is made, starts listening for responses from the server
io.on('connection', function(client){

	client.on("newPlayer", function(){
		console.log("A new Player", client.id, "has joined the game");
		let player = new Player(client.id);
		player.addDeck(deck.createCopy());
		player.setIntervalId(setInterval(function() { emitPlayer(client.id); } , 1000/1) );
		players[client.id] = player;
	});

	client.on('mouseclick', function(mouseX, mouseY) {
		console.log("The mouse was clicked at", mouseX, mouseY, "by socket", client.id);
		players[client.id].cursor.updatePosition(mouseX, mouseY);
		mouseclick(client.id);
	});

	client.on('mousemovement', function(mouseX, mouseY) {
		players[client.id].cursor.updatePosition(mouseX, mouseY);
	});

	client.on('mouselift', function(mouseX, mouseY) {
		console.log("The mouse was lifted at", mouseX, mouseY, "by socket", client.id);
	});

	client.on('disconnect', function(mouseX, mouseY) {
		clearInterval(players[client.id].intervalId);
		delete players[client.id];
		console.log("The Player", client.id, "has left the game");
	});

});

function emitPlayer(client_id){
	let player_socket = players[client_id].socketId;
	if(players[client_id].inGame){
		let game_id = players[client_id].gameId;
		try{
			games[game_id].update(players[client_id].cursor);
		}
		catch(error){
			console.log(error);
		}
		io.to(player_socket).emit('Game', games[game_id], player_socket);
	}
	else{
		let player_menu = players[client_id].getMenu();
		let player_overlay = players[client_id].getOverlay();
		io.to(player_socket).emit('Menu', view.menus[player_menu], view.overlays[player_overlay], player_socket);			
	}
}


function mouseclick(client_id){
	let cursor = players[client_id].cursor;

	if(players[client_id].getOverlay() == 'None'){
		request = view.menus[players[client_id].getMenu()].checkClick(cursor);			
	}
	else{
		request = view.overlays[players[client_id].getOverlay()].checkClick(cursor);			
	}

	if(request != null){
		if(request.type == 'Menu'){
			players[client_id].setMenu(request.destination);
		}
		else if(request.type == 'Overlay'){
			players[client_id].setOverlay(request.destination);
		}
		else if(request.type == 'Queue'){
			players[client_id].setOverlay(request.destination);
			players[client_id].inQueue = true;
			queue.join(client_id, request.queue_side);
		}
		else if(request.type == 'Escape'){
			if(players[client_id].inQueue){
				queue.removePlayer(client_id);
				players[client_id].inQueue = false;
			}
			players[client_id].setOverlay('None');
		}
	}

	if(queue.gameReady()){
		console.log(players);
		games[gameId] = queue.createGame(players, gameId);
		gameId++;
	}
}

