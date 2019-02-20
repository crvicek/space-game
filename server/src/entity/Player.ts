import { GAME_ACTION } from '../shared';

export interface IPlayerActiveKeys {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  space: boolean;
}

export interface IPlayerActionKeysData {
  keys: IPlayerActiveKeys
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
      down: false,
      left: false,
      right: false,
      space: false,
    };
    this.history = [];
    this.score = 0;
    this.socket = socket;
  }
  
  public startListening = () => {
    const socket = this.socket;
    socket.on(GAME_ACTION.receiveInput, (data: IPlayerActionKeysData) => {
      this.processPlayerAction(data);
    });
  };
  
  private processPlayerAction = (data: IPlayerActionKeysData) => {
    this.activeKeys = { ...this.activeKeys, ...data.keys };
    this.history.unshift({ ...this.activeKeys, timestamp: data.timestamp });
    if (this.history.length > 30) this.history.pop();
  };
}
