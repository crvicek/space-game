import { GAME_ACTION, uuid } from '../common';
import { ICanvasElement, ICanvasElementPosition } from './ServerCanvas';
import Game from './Game';

export interface IPlayerKeys {
  up: boolean;
  left: boolean;
  right: boolean;
  space: boolean;
}

export interface IPlayerActionKeysData {
  keys: IPlayerKeys
  currentPosition: ICanvasElementPosition
  timestamp: number
}

export interface IPAHistory extends IPlayerKeys {
  timestamp: number;
}

export class Player {
  
  id: string;
  name: string;
  activeKeys: IPlayerKeys;
  history: IPAHistory[];
  score: number;
  socket: any;
  game: Game;
  canvasElement: ICanvasElement;
  
  constructor(name: string, socket: any) {
    this.id = uuid();
    this.name = name;
    this.score = 0;
    this.activeKeys = {
      up: false,
      left: false,
      right: false,
      space: false,
    };
    this.history = [];
    this.score = 0;
    this.canvasElement = {
      id: this.id,
      pos: { x: 0, y: 0 },
      angle: 0,
      vel: { x: 0, y: 0 },
    };
    this.socket = socket;
    this.socket.on('disconnect', () => this.playerDisconnected());
  }
  
  private playerDisconnected() {
    this.game.stopGame(this);
  }
  
  public startListeningForPlayerActions = () => {
    this.socket.on(GAME_ACTION.receiveInput, (data: IPlayerActionKeysData) => {
      this.processPlayerAction(data);
    });
  };
  
  private processPlayerAction = (data: IPlayerActionKeysData) => {
    this.activeKeys = { ...this.activeKeys, ...data.keys };
    this.game.broadcastPlayerAction(this.id, this.activeKeys);
    this.history.unshift({ ...this.activeKeys, timestamp: data.timestamp });
    if (this.history.length > 30) this.history.pop();
  };
}
