import { GAME_ACTION } from '../shared';
import { ICanvasElementPosition } from './ServerCanvas';

export interface IPlayerActiveKeys {
  up: boolean;
  left: boolean;
  right: boolean;
  space: boolean;
}

export interface IPlayerActionKeysData {
  keys: IPlayerActiveKeys
  currentPosition: ICanvasElementPosition
  timestamp: Date
}

export interface IPAHistory extends IPlayerActiveKeys {
  timestamp: Date;
}

export interface IUser {
  id?: Number
  name: string
}

export class Player {
  
  user: IUser;
  activeKeys: IPlayerActiveKeys;
  history: IPAHistory[];
  score: number;
  socket: any;
  
  constructor(user: IUser, socket: any) {
    this.user = user;
    this.score = 0;
    this.activeKeys = {
      up: false,
      left: false,
      right: false,
      space: false,
    };
    this.history = [];
    this.score = 0;
    this.socket = socket;
    //
    // ServerStore.update({
    //   player1: {
    //     user: user,
    //     score: 0,
    //     activeKeys: {
    //       up: false, left: false, right: false, space: false,
    //     },
    //     history: [],
    //     // score: 0,
    //     socket: socket,
    //   },
    // });
  }
  
  public startListening = () => {
    const socket = this.socket;
    socket.on(GAME_ACTION.receiveInput, (data: IPlayerActionKeysData) => {
      this.processPlayerAction(data);
    });
  };
  
  private processPlayerAction = (data: IPlayerActionKeysData) => {
    console.log(data);
    this.activeKeys = { ...this.activeKeys, ...data.keys };
    this.history.unshift({ ...this.activeKeys, timestamp: data.timestamp });
    if (this.history.length > 30) this.history.pop();
  };
}
