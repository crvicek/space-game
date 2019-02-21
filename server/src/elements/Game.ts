import { IPlayerKeys, Player } from './Player';
import { GAME_STATE, uuid } from '../shared';
import { ServerCanvas } from './ServerCanvas';
import { Server } from '../Server';

export type GameState = -1 | 0 | 1 | number;

export default class Game {
  
  id: string;
  startedAt: Date;
  gameState: GameState;
  player1: Player;
  player2: Player;
  canvas: ServerCanvas;
  server: Server;
  
  constructor(server: Server, player1: Player) {
    this.id = uuid();
    this.startedAt = new Date();
    this.player1 = player1;
    this.player1.game = this;
    this.player2 = null;
    this.gameState = GAME_STATE.waiting;
    this.canvas = null;
    this.server = server;
    console.log(`[${this.id}]: New game created - waiting for second player`);
  }
  
  public assignPlayerTwo(playerTwo: Player) {
    this.player2 = playerTwo;
    this.player2.game = this;
    this.canvas = new ServerCanvas(this.player1, this.player2);
    console.log(`[${this.id}]: Player assigned to empty spot`);
    this.startGame();
  }
  
  public broadcastPlayerAction(from: string, action: IPlayerKeys) {
    const to = from === this.player1.id ? this.player2 : this.player1;
    to.socket.emit('@action/actionBroadcast', {
      keys: action,
    });
  }
  
  public startGame() {
    this.gameState = GAME_STATE.started;
    this.player1.startListeningForPlayerActions();
    this.player2.startListeningForPlayerActions();
    this.canvas.start();
    console.log(`[${this.id}]: Started`);
  }
  
  public stopGame(whoEnded: Player) {
    this.canvas.stop();
    const whoStayed = whoEnded === this.player1 ? this.player2 : this.player1;
    !!whoStayed && whoStayed.socket.disconnect(true);
    console.log(`[${this.id}]: Player ${whoEnded.id} disconnected`);
    this.server.destroyGame(this);
  }
}