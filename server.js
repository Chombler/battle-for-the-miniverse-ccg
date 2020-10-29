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

//Default page displayed, always sent to game.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/game.html');
});

//Tells the server to listen for any incoming inconnections
server.listen(port_to_listen, () => {
  console.log(`Listening on ${port_to_listen}`);
});

//When a connection is made, logs the following response
io.on('connection', function(client) {
  console.log('Connection made');
});

//Testing to ensure socketio works
setInterval(function() {
	console.log("Attempting message send");
  io.sockets.emit('message', 'hi!');
}, 1000);