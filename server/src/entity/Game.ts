import { IPlayerActiveKeys, Player } from './Player';
import { GAME_STATE, uuid } from '../shared';
import { ServerCanvas } from './ServerCanvas';
// import { ServerStore } from '../store';

export type GameState = number;

export interface IGameState {
  id: string;
  startedAt: Date;
  gameState: GameState;
  player1: Player;
  player2: Player;
}

export default class Game implements IGameState {
  
  id: string;
  startedAt: Date;
  gameState: GameState;
  player1: Player;
  player2: Player;
  canvas: ServerCanvas;
  
  constructor(player1: Player, player2?: Player) {
  
    // ServerStore.update({
    //   id: uuid(),
    //   startedAt: new Date(),
    //   player1: player1,
    //   player2: null,
    //   gameState: GAME_STATE.waiting,
    // });
  
    this.id = uuid();
    this.startedAt = new Date();
    this.player1 = player1;
    this.player1.game = this;
    this.player2 = null;
    this.gameState = GAME_STATE.waiting;
  }
  
  assignPlayer(player: Player) {
    this.player2 = player;
    this.player2.game = this;
    // ServerStore.update({
    //   player2: player,
    // });
    this.startGame();
  }
  
  emitPlayerAction(from: string, action: IPlayerActiveKeys) {
    if (this.player1.user.id === from)
      this.player2.socket.emit('@action/actionPropagation', {
        keys: action,
        timestamp: Date.now(),
      });
    if (this.player2.user.id === from)
      this.player1.socket.emit('@action/actionPropagation', {
        keys: action,
        timestamp: Date.now(),
      });
  }
  
  startGame() {
    console.log('Start game');
    this.gameState = GAME_STATE.started;
    this.player1.startListening();
    this.player2.startListening();
  }
  
}