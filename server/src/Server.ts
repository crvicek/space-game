import 'reflect-metadata';
import { useKoaServer } from "routing-controllers";
import * as socketio from 'socket.io';
import * as Koa from 'koa';
import Game from './entity/Game';
import { IUser, Player } from './entity/Player';
import { GAME_ACTION, uuid } from './shared';

interface IServerState {
  games: Game[]
}

export class GameServer {
  
  port = undefined;
  app = undefined;
  server = undefined;
  io = undefined;
  
  state: IServerState = {
    games: [],
  };
  
  constructor() {
    this.port = process.env.PORT || 4000;
    this.app = new Koa();
    this.server = require('http').createServer(this.app.callback());
    this.io = socketio(this.server);
    useKoaServer(this.app, {
      cors: true,
    });
  }
  
  getLastGame(): Game {
    if (this.state.games.length < 1) return null;
    return this.state.games[this.state.games.length - 1];
  }
  
  assignGame(user: IUser, socket: any) {
    
    const player = new Player(user, socket);
    
    if (this.state.games.length === 0 || this.getLastGame().player2 !== null) {
      const game = new Game(player);
      this.state.games.push(game);
    } else {
      const game = this.getLastGame();
      game.assignPlayer(player);
    }
  }
  
  start() {
    
    this.io.on('connection', socket => {
      this.assignGame({
        id: uuid(),
        name: 'Player 1',
      }, socket);
    });
    
    this.server.listen(this.port);
  }
  
}