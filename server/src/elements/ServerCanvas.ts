import { Player } from './Player';
import { GAME_AREA } from '../shared';

const STEP_Y = 5;
const STEP_X = 5;


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
  isRunning: boolean;
}

export class ServerCanvas {
  
  state: ICanvasState = {
    current: undefined,
    history: [],
    queue: [],
    isRunning: false,
  };
  
  tickLength: number;
  previousTick: number;
  currentTick: number;
  
  elements: (ICanvasElement | Player)[];
  
  constructor(playerOne: Player, playerTwo: Player) {
    this.elements = [];
    this.elements.push(playerOne);
    this.elements.push(playerTwo);
    this.tickLength = 1000 / 20;
    this.currentTick = 0;
    this.previousTick = this.hrtimeInMs();
    this.state.isRunning = false;
  }
  
  public recalculatePositions(element: ICanvasElement, stepX = 0, stepY = 0) {
    const recalcEl = { ...element };
    
    if (stepX != 0) recalcEl.angle += stepX;
    if (recalcEl.angle > 360) recalcEl.angle = 0;
    else if (recalcEl.angle < 0) recalcEl.angle = 360;
    
    if (stepY != 0) {
      recalcEl.vel.x -= Math.sin(-recalcEl.angle * Math.PI / 180) * 0.2;
      recalcEl.vel.y -= Math.cos(-recalcEl.angle * Math.PI / 180) * 0.2;
    }
    
    recalcEl.pos.x += recalcEl.vel.x;
    recalcEl.pos.y += recalcEl.vel.y;
    recalcEl.vel.x *= 0.98;
    recalcEl.vel.y *= 0.98;
    
    if (recalcEl.pos.x < 0) recalcEl.pos.x = GAME_AREA.width;
    if (recalcEl.pos.x > GAME_AREA.width) recalcEl.pos.x = 0;
    if (recalcEl.pos.y > GAME_AREA.height) recalcEl.pos.y = 0;
    if (recalcEl.pos.y < 0) recalcEl.pos.y = GAME_AREA.height;
    
    return recalcEl;
  }
  
  public mapKeysToMovementValues(player: Player) {
    const { up, left, right } = player.activeKeys;
    up ? player.canvasElement.vel.y = -STEP_Y : player.canvasElement.vel.y = 0;
    if (right) player.canvasElement.vel.x = STEP_X;
    else if (left) player.canvasElement.vel.x = -STEP_X;
    else player.canvasElement.vel.x = 0;
  }
  
  public calculateElementPosition(element: ICanvasElement | Player) {
    if (element instanceof Player) {
      this.mapKeysToMovementValues(element);
      this.recalculatePositions(element.canvasElement);
      // console.log(element.canvasElement.pos);
    } else {
      this.recalculatePositions(element);
    }
  }
  
  public startFrameCalculation(delta) {
    this.elements.forEach(element => this.calculateElementPosition(element));
  }
  
  hrtimeInMs() {
    const time = process.hrtime();
    return time[0] * 1000 + time[1] / 1000000;
  };
  
  loop() {
    try {
      if (!this.state.isRunning) return;
      setTimeout(this.loop.bind(this), this.tickLength);
      const now = this.hrtimeInMs();
      const delta = (now - this.previousTick) / 1000;
      this.startFrameCalculation(delta);
      this.previousTick = now;
      this.currentTick++;
      if (this.currentTick % 20 == 0) this.broadcastSyncData(this.currentTick, now, this.elements);
    } catch (e) {
      console.log(e);
    }
  };
  
  broadcastSyncData(tick, time, data) {
    // console.log(tick);
    // console.log(time);
    // console.log(data);
  }
  
  start() {
    this.state.isRunning = true;
    this.loop();
  }
  
  stop() {
    this.state.isRunning = false;
  }
}