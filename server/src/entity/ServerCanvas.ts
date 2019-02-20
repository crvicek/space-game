import { Player } from './Player';

export interface ICanvasElementPosition {
  x: number;
  y: number;
}

export interface ICanvasElement {
  id: number | string;
  pos: ICanvasElementPosition;
}

export interface ICanvasFrameState {
  tick: number;
  timestamp: Date;
  elements: ICanvasElement[];
}

export interface ICanvasState {
  current: ICanvasFrameState;
  history: ICanvasFrameState[];
}

export class ServerCanvas {
  
  public state: ICanvasState = {
    current: undefined,
    history: [],
  };
  
  constructor(playerOne: Player, playerTwo: Player) {
    
  }
  
  private renderCanvas() {
    
  }
  
  start(): Date {
    
  }
  
  stop(): ICanvasFrameState {
    
  }
}