import React from 'react';
import { Battle } from './Game';
import { BattleBoard } from './Board';
import { Lobby } from 'boardgame.io/react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

const BattleClient = Client({
  game: Battle,
  board: BattleBoard,
  multiplayer: SocketIO({ server: 'localhost:3000' }),
});


const App = () => (
  <div>
    <BattleClient playerID="0" />
    <BattleClient playerID="1" />
  </div>
);

export default App;
