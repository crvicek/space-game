import { Player } from './Player';
import Game from './Game';
import { STEP_X, STEP_Y, SOCKET_POSITION_SYNC, GAME_AREA } from '../common';
import { performance } from 'perf_hooks';

const VEL_MULTIPLIER_PER_MS = 0.869908481;


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
  timestamp: number;
  elements: ICanvasElement[];
}

export interface ICanvasQueuedAction {
  timestamp: number;
}

export interface ISyncData {
  player1: ICanvasElement;
  player2: ICanvasElement;
  elapsedTime: number;
}

export class ServerCanvas {
  
  isRunning: boolean;
  tickLength: number;
  previousTick: number;
  currentTick: number;
  broadcastFreq: number;
  startedAt: number;
  lastRenderAt: number;
  
  elements: (ICanvasElement | Player)[];
  game: Game;
  
  constructor(game: Game, playerOne: Player, playerTwo: Player, ticksPerSecond: number = 20, broadcastFrequencyPerTenSecs: number = 10) {
    this.elements = [];
    this.elements.push(playerOne);
    this.elements.push(playerTwo);
    this.tickLength = 1000 / ticksPerSecond;
    this.currentTick = 0;
    this.previousTick = ServerCanvas.hrtimeInMs();
    this.isRunning = false;
    this.broadcastFreq = ticksPerSecond * (10 / broadcastFrequencyPerTenSecs);
    this.game = game;
  }
  
  public static recalculatePositions(element: ICanvasElement, delta: number, stepX: number = 0, stepY: number = 0) {
    const recalcEl = { ...element };
    
    stepX = stepX / 60000 * delta;
    stepY = stepY / 60000 * delta;
    
    if (stepX != 0) recalcEl.angle += stepX;
    if (recalcEl.angle > 360) recalcEl.angle = 0;
    else if (recalcEl.angle < 0) recalcEl.angle = 360;
    
    if (stepY != 0) {
      recalcEl.vel.x -= Math.sin(-recalcEl.angle * Math.PI / 180) * 0.2;
      recalcEl.vel.y -= Math.cos(-recalcEl.angle * Math.PI / 180) * 0.2;
    }
    
    recalcEl.pos.x += recalcEl.vel.x;
    recalcEl.pos.y += recalcEl.vel.y;
    recalcEl.vel.x *= VEL_MULTIPLIER_PER_MS ^ delta;
    recalcEl.vel.y *= VEL_MULTIPLIER_PER_MS ^ delta;
    
    if (recalcEl.pos.x < 0) recalcEl.pos.x = GAME_AREA.width;
    if (recalcEl.pos.x > GAME_AREA.width) recalcEl.pos.x = 0;
    if (recalcEl.pos.y > GAME_AREA.height) recalcEl.pos.y = 0;
    if (recalcEl.pos.y < 0) recalcEl.pos.y = GAME_AREA.height;
    
    return recalcEl;
  }
  
  public static mapKeysToMovementValues(player: Player) {
    const { up, left, right } = player.activeKeys;
    up ? player.canvasElement.vel.y = -STEP_Y : player.canvasElement.vel.y = 0;
    if (right) player.canvasElement.vel.x = STEP_X;
    else if (left) player.canvasElement.vel.x = -STEP_X;
    else player.canvasElement.vel.x = 0;
  }
  
  public calculateElementPosition(element: ICanvasElement | Player, delta) {
    if (element instanceof Player) {
      ServerCanvas.mapKeysToMovementValues(element);
      ServerCanvas.recalculatePositions(element.canvasElement, delta);
    } else {
      ServerCanvas.recalculatePositions(element, delta);
    }
  }
  
  public startFrameCalculation(delta) {
    this.elements.forEach(element => this.calculateElementPosition(element, delta));
  }
  
  static hrtimeInMs() {
    const time = process.hrtime();
    return time[0] * 1000 + time[1] / 1000000;
  };
  
  loop() {
    try {
      if (!this.isRunning) return;
      setTimeout(this.loop.bind(this), this.tickLength);
      const now = ServerCanvas.hrtimeInMs();
      const delta = (now - this.previousTick) / 1000;
      this.startFrameCalculation(delta);
      this.previousTick = now;
      this.currentTick++;
      this.lastRenderAt = performance.now() - this.startedAt;
      if (this.currentTick % this.broadcastFreq == 0) this.broadcastSyncData();
    } catch (e) {
      console.log(e);
    }
  };
  
  broadcastSyncData() {
    const data: ISyncData = {
      player1: this.game.player1.canvasElement,
      player2: this.game.player2.canvasElement,
      elapsedTime: this.lastRenderAt,
    };
    this.game.broadcastToBoth(SOCKET_POSITION_SYNC, data);
  }
  
  start() {
    this.isRunning = true;
    this.loop();
    this.startedAt = performance.now();
  }
  
  stop() {
    this.isRunning = false;
  }
}