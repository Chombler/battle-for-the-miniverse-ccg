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

//When a connection is made, starts listening for responses from the server
io.on('connection', function(client){

	client.on("newPlayer", function(){
		console.log("A new Player", client.id, "has joined the game");
	});

	client.on('mouseclick', function(mouseX, mouseY) {
	});

	client.on('mousemovement', function(mouseX, mouseY) {
	});

	client.on('mouselift', function(mouseX, mouseY) {
	});

	client.on('disconnect', function(mouseX, mouseY) {
	});

});
