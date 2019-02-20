import { Player } from './Player';
import { GAME_STATE, uuid } from '../shared';
import { ServerCanvas } from './ServerCanvas';

export type GameState = number;

export interface IGame {
  id: string;
  startedAt: Date;
  gameState: GameState;
  player1: Player;
  player2: Player;
}

export default class Game implements IGame {
  
  id: string;
  startedAt: Date;
  gameState: GameState;
  player1: Player;
  player2: Player;
  canvas: ServerCanvas;
  
  constructor(player1: Player, player2?: Player) {
    this.id = uuid();
    this.startedAt = new Date();
    this.player1 = player1;
    this.player2 = undefined;
    this.gameState = GAME_STATE.waiting;
  }
  
  assignPlayer(player: Player) {
    this.player2 = player;
  }
  
  startGame() {
    this.gameState = GAME_STATE.started;
    this.player1.startListening();
    this.player2.startListening();
  }
  
}