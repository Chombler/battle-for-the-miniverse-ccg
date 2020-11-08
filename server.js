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

var xOffset = 0;
var yOffset = 0;

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

//When a connection is made, starts listening for responses from the server
io.on('connection', function(client) {

  client.on("newPlayer", function(message){
  	console.log("A New Player has joined the game with the id", client.id);
  	gameState.players[client.id] = new Player(client.id, player_hand);
  });

	client.on('mouseclick', function(client_mouseX, client_mouseY) {
	  console.log("The mouse was clicked at", client_mouseX, client_mouseY, "by player", client.id);
	  gameState.players[client.id].cursor.updatePosition(client_mouseX, client_mouseY);
	  let result = checkPlayerCursorLocation(gameState.players[client.id]);

	  if(result.isWithin){
	  	gameState.players[client.id].hand.cards[result.index].startDragging();
			let card = gameState.players[client.id].hand.cards[result.index];
			xOffset = gameState.players[client.id].cursor.mouseX - card.x;
			yOffset = gameState.players[client.id].cursor.mouseY - card.y;
	  }
	  else{
	  	xOffset = 0;
	  	yOffset = 0;
	  }
	  console.log(xOffset, yOffset);

	});

	client.on('mousemovement', function(client_mouseX, client_mouseY) {
	  gameState.players[client.id].cursor.updatePosition(client_mouseX, client_mouseY);
	});

	client.on('mouselift', function(client_mouseX, client_mouseY) {
	  console.log("The mouse was lifted at", client_mouseX, client_mouseY, "by player", client.id);
		for(let player in gameState.players){
			for(let card of gameState.players[player].hand.cards){
				card.stopDragging();
			}
		}
	});

});

function checkPlayerCursorLocation(player){

	let hand = player.getHand();
	let cursor = player.getCursor();
	let result = {
		isWithin : false,
		index : 0
	};

	for(let card of hand.getCards()){
		if(cursor.isWithin(card)){
			result.isWithin = true;
			return(result);
		}
		result.index++;
	}
	return(result);
}


setInterval(function() {
	update()
	io.emit('state', gameState);
}, 1000 / 10);



function update(){

	for(let player in gameState.players){
		let hand = gameState.players[player].hand;
		let mouseX = gameState.players[player].cursor.mouseX;
		let mouseY = gameState.players[player].cursor.mouseY;

		let startX = hand.x + (hand.width / 2 - 100 * (hand.cards.length / 2));

		for(let card of gameState.players[player].hand.cards){
			if(!card.isBeingDragged){
				card.setLocation(startX, hand.y);
			}
			else{
				card.setLocation(mouseX - xOffset, mouseY - yOffset);
			}

			startX += 100;
		}

	}

}

