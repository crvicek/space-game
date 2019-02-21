import 'reflect-metadata';
import { useKoaServer } from "routing-controllers";
import * as socketio from 'socket.io';
import * as Koa from 'koa';
import Game from './elements/Game';
import { Player } from './elements/Player';

export class Server {
  
  port = process.env.PORT || 4000;
  app: any;
  server: any;
  io: any;
  games: Game[];
  
  
  constructor() {
    this.games = [];
  }
  
  getLastGame(): Game {
    if (this.games.length < 1) return null;
    return this.games[this.games.length - 1];
  }
  
  assignGame(name: string, socket: any) {
    const player = new Player(name, socket);
    if (this.games.length === 0 || this.getLastGame().player2 !== null)
      this.games.push(new Game(this, player));
    else this.getLastGame().assignPlayerTwo(player);
    
  }
  
  destroyGame(game: Game) {
    this.games.splice(this.games.indexOf(game), 1);
    console.log(`[${game.id}]: Game destroyed`);
  }
  
  listenForConnections() {
    this.io.on('connection', socket => {
      this.assignGame(null, socket);
    });
  }
  
  start() {
    this.app = new Koa();
    this.server = require('http').createServer(this.app.callback());
    this.io = socketio(this.server);
    this.games = [];
    useKoaServer(this.app, {
      cors: true,
    });
    this.server.listen(this.port);
    this.listenForConnections();
  
    console.log(`Server up and running on port: ${this.port}`);
  }
}