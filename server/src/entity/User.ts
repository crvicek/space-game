import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IPlayerActions {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  space: boolean;
}

export interface IPAHistory extends IPlayerActions {
  timestamp: Date;
}

export class Player {
  
  public user: User;
  public current: IPlayerActions;
  public history: IPAHistory[];
  public score: number;
  
  constructor(user: User) {
    this.user = user;
    this.current = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
    };
    this.history = [];
    this.score = 0;
  }
  
  public processInput = (actionsToChange: Partial<IPlayerActions>, timestamp: Date): IPlayerActions => {
    this.current = { ...this.current, ...actionsToChange };
    this.history.unshift({ ...this.current, timestamp: timestamp });
    if (this.history.length > 30) this.history.pop();
    return this.current;
  };
}

@Entity()
export default class User {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  nickname: string;
  
  @Column()
  currentScore: number;
  
}