import React from 'react';
import { Battle } from './Game';
import { BattleBoard } from './Board';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { LobbyClient } from 'boardgame.io/client';

const { protocol, hostname, port } = window.location;
const server_url = `${protocol}//${hostname}:${port}`;

const lobby = new LobbyClient({server: server_url});

const BattleClient = Client({
  game: Battle,
  board: BattleBoard,
  multiplayer: SocketIO({ server: server_url }),
});

class App extends React.Component {
  state = {
    view: 'main',
    playerID: null,
    playerName: 'Bob',
    credentials: null,
    matchID: null
  }

  async queueAsAlien(){
    let { matchID } = await lobby.createMatch('battle', {
      numPlayers: 2
    });
    let { playerCredentials } = await lobby.joinMatch('battle', matchID, {
      playerID: '0',
      playerName: this.state.playerName,
    });
    console.log("matchID", matchID, "credentials", playerCredentials);
    this.setState({
      view: 'battle',
      matchID: matchID,
      playerID: '0',
      credentials: playerCredentials,
    });
  }

  async getJoinableMatch(){
    let { matches } = await lobby.listMatches('battle');

    for(let match of matches){
      console.log(match);
      if(typeof match.players[1].name === 'undefined'){
        return(match.matchID);
      }
    }
  }

  async queueAsBug(){
    let match_id = await this.getJoinableMatch();
    let { playerCredentials } = await lobby.joinMatch('battle', match_id, {
      playerID: '1',
      playerName: this.state.playerName,
    });
    this.setState({
      view: 'battle',
      matchID: match_id,
      playerID: '1',
      credentials: playerCredentials,
    });
  }

  componentDidMount(){
    lobby.listMatches('battle')
    .then(console.log)
    .catch(console.error)
  }

  render(){
    if(this.state.view === 'main'){
      return(
        <div>
          <button onClick={() => this.setState({view: 'lobby'})}>
          Battle
          </button>
        </div>
      );
    }
    if(this.state.view === 'lobby'){
      return(
        <div>
          <p>Play as</p>
          <button onClick={() => { this.queueAsAlien() }}>
            Alien
          </button>
          <button onClick={() => { this.queueAsBug() }}>
            Bug
          </button>
        </div>
      );
    }
    if(this.state.view === 'battle'){
      console.log(this.state);
      return(
        <div>
          <BattleClient credentials={this.state.credentials} playerID={this.state.playerID} matchID={this.state.matchID} />
        </div>
      );
    }
  }
}

export default App;

console.log(server_url);
