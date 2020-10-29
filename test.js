//Dependencies
var app = require('express')(); //Pulls in Express framework
var http = require('http').Server(app); //Pulls in http module
var io = require('socket.io')(http); //Pulls in Socket.io framework

//Default page displayed, always sent to index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
  console.log('Connection made')
});

//Tells the server to listen for any incoming inconnections
http.listen(3000, () => {
  console.log(`Listening on 3000`);
});