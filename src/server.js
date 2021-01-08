const { Server } = require('boardgame.io/server');
const { Battle } = require('./Game');

const server = Server({ games: [Battle] });

server.run(3000);