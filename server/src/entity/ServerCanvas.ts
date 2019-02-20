import { Player } from './Player';
import { GAME_AREA } from '../shared';

export interface ICanvasElementPosition {
  x: number;
  y: number;
}

export interface ICanvasElement {
  id: number | string;
  pos: ICanvasElementPosition;
  angle: number;
  vel: ICanvasElementPosition;
}


export interface ICanvasFrameState {
  tick: number;
  timestamp: Date;
  elements: ICanvasElement[];
}

export interface ICanvasQueuedAction {
  timestamp: Date;
  
}

export interface ICanvasState {
  current: ICanvasFrameState;
  history: ICanvasFrameState[];
  queue: ICanvasQueuedAction[];
}

export class ServerCanvas {
  
  public state: ICanvasState = {
    current: undefined,
    history: [],
    queue: [],
  };
  
  constructor(playerOne: Player, playerTwo: Player) {
    
  }
  
  private calculateElementPosition(element: ICanvasElement, stepX: number, stepY: number) {
    
    const modifiedElement = { ...element };
    
    if (stepX) modifiedElement.angle += stepX;
    if (modifiedElement.angle > 360) modifiedElement.angle = 0;
    else if (modifiedElement.angle < 0) modifiedElement.angle = 360;
    
    if (stepY) {
      modifiedElement.vel.x -= Math.sin(-modifiedElement.angle * Math.PI / 180) * 0.2;
      modifiedElement.vel.y -= Math.cos(-modifiedElement.angle * Math.PI / 180) * 0.2;
    }
    
    modifiedElement.pos.x += modifiedElement.vel.x;
    modifiedElement.pos.y += modifiedElement.vel.y;
    modifiedElement.vel.x *= 0.98;
    modifiedElement.vel.y *= 0.98;
    
    if (modifiedElement.pos.x < 0) modifiedElement.pos.x = GAME_AREA.width;
    if (modifiedElement.pos.x > GAME_AREA.width) modifiedElement.pos.x = 0;
    if (modifiedElement.pos.y > GAME_AREA.height) modifiedElement.pos.y = 0;
    if (modifiedElement.pos.y < 0) modifiedElement.pos.y = GAME_AREA.height;
    
    return modifiedElement;
  }
  
  //
  // private startFrameCalculation() {
  //   return null;
  // }
  //
  // start(): Date {
  //   return null;
  // }
  //
  // stop(): ICanvasFrameState {
  //   return null;
  // }
}