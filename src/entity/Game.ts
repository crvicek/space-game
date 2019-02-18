import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import User, { Player } from './User';

export type GameState = 'waitingForPlayers' | 'started' | 'ended';

export interface ICanvasElementPosition {
  x: number;
  y: number;
}

export interface ICanvasElement {
  id: number | string;
  pos: ICanvasElementPosition;
}

export class ServerCanvas {
  
  public elements = {
    players: {
      one: <ICanvasElement>undefined,
      two: <ICanvasElement>undefined,
    },
    objects: <ICanvasElement[]>[],
  };
  public lastRenderTimestamp: Date;
  
  constructor(playerOnePos: ICanvasElement, playerTwoPos: ICanvasElement, preSetObjects: ICanvasElement[]) {
    this.elements.players.one = playerOnePos;
    this.elements.players.two = playerTwoPos;
    this.elements.objects = [...preSetObjects];
    this.lastRenderTimestamp = new Date();
  }
  
  updatePositions() {
    
  }
  
  render() {
    
  }
  
  start() {
    
  }
  
}

@Entity()
export default class Game {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  startedAt: Date;
  
  @Column()
  state: GameState;
  
  @Column()
  player1: Player;
  
  @Column()
  player2: Player;
  
}