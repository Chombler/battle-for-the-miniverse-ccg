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

const Card = require('./objects/deck/Card.js'); //Includes card object
const Player = require('./objects/player/Player.js'); //Includes Player object
const Game = require('./objects/Game.js'); //Includes game object
const Cursor = require('./objects/player/Cursor.js'); //Includes cursor object
const Deck = require('./objects/deck/Deck.js'); //Includes deck object
const QueueOverlay = require('./objects/view/overlays/QueueOverlay.js'); //Includes waiting room object
const Queue = require('./objects/Queue.js'); //Includes queue object

const { MainMenu, BattleMenu, CollectionMenu } = require('./objects/view/Menu.js');

var first_card = new Card("Wall-Nut", 2, 2, 1, 375, 125);
var second_card = new Card("Sunflower", 2, 2, 1, 375, 125);
var third_card = new Card("Peashooter", 2, 2, 1, 375, 125);
var fourth_card = new Card("Chomper", 2, 2, 1, 375, 125);

var cards = [first_card, second_card, third_card, fourth_card];

var deck = new Deck(cards);

var gameId = 0;
var deckId = 0;

var cursors = {};
var players = {};
var queue = new Queue();
var games = {};

var menus = {
	'Main' : MainMenu,
	'Battle' : BattleMenu,
	'Collection' : CollectionMenu,
	'Deck Edit' : null
}

var overlays = {
	'Deck Selection' : null,
	'Queue' : new QueueOverlay(),
	'None' : null
}

//When a connection is made, starts listening for responses from the server
io.on('connection', function(client){

	client.on("newPlayer", function(){

		console.log("A new Player", client.id, "has joined the game");

		cursors[client.id] = new Cursor(0, 0);
		players[client.id] = new Player(client.id, 0);
		players[client.id].addDeck(deck.createCopy(), deckId++);
		
		setInterval( function() {
			let player_socket = players[client.id].socket_id;
			if(players[client.id].inGame){
				let game_id = players[client.id].gameId;
				try{
					games[game_id].update(cursors[client.id]);
				}
				catch(error){
					console.log(error);
				}
				io.to(player_socket).emit('Game', games[game_id], player_socket);
			}
			else{
				let player_menu = players[client.id].getMenu();
				let player_overlay = players[client.id].getOverlay();
				io.to(player_socket).emit('Menu', menus[player_menu], overlays[player_overlay], player_socket);			
			}
		}, 1000 / 1);
	});

	client.on('mouseclick', function(mouseX, mouseY) {
		console.log("The mouse was clicked at", mouseX, mouseY, "by socket", client.id);
		cursors[client.id].updatePosition(mouseX, mouseY);

		let cursor = cursors[client.id];
		let player_menu = players[client.id].getMenu();
		let player_overlay = players[client.id].getOverlay();

		if(player_overlay == 'None'){
			request = menus[player_menu].checkClick(cursor);			
		}
		else{
			request = overlays[player_overlay].checkClick(cursor);			
		}

		if(request != null){
			if(request.type == "Menu"){
				players[client.id].setMenu(request.destination);
			}
			else if(request.type == "Overlay"){
				players[client.id].setOverlay(request.destination);
			}
			else if(request.type == "Queue"){
				players[client.id].setOverlay(request.destination);
				players[client.id].inQueue = true;
				queue.join(client.id, request.queue_side);
			}
			else if(request.type == "Escape"){
				if(players[client.id].inQueue){
					queue.removePlayer(client.id);
					players[client.id].inQueue = false;
				}
				players[client.id].setOverlay('None');
			}
		}

		if(queue.gameReady()){
			games[gameId] = queue.createGame(players, gameId);
			gameId++;
		}

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


