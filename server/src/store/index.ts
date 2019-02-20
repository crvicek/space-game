import reducers from './reducers';
import { createStore } from 'redux';
import Game from '../entity/Game';

export const STORE = {
  game: 'gameState',
};
export const STORE_ACTIONS = {
  update: 'update',
};

const updateStore = (storeToUpdate, action, data) => {
  const actionType = `@${storeToUpdate}/${action}`;
  return { actionType, ...data };
};

// export default class Store {
//  
//   private static instance: Store;
//  
//   private store = undefined;
//   readonly isLogging;
//  
//   constructor(shouldLog: boolean = false) {
//     if (Store.instance) {
//       return Store.instance;
//     }
//     Store.instance = this;
//     this.store = createStore(reducers);
//     this.isLogging = shouldLog;
//   }
//  
//   public update = (storeToUpdate, action, data) => {
//     this.isLogging && console.log(this.store.getState());
//     const unsubscribe = this.store.subscribe(() => console.log(this.store.getState()));
//     this.store.dispatch(updateStore(storeToUpdate, STORE_ACTIONS.update, data));
//     unsubscribe();
//   };
// }

// class GameStore {
//  
//   private static _instance: GameStore;
//  
//   private store = undefined;
//   readonly isLogging;
//  
//   private constructor() {
//     this.store = createStore(reducers);
//     this.isLogging = true;
//   }
//  
//   public static getStore() {
//     if (!this._instance) GameStore._instance = new GameStore();
//     return GameStore._instance;
//   }
//  
//   public update = (storeToUpdate, action, data) => {
//     this.isLogging && console.log(this.store.getState());
//     const unsubscribe = this.store.subscribe(() => console.log(this.store.getState()));
//     this.store.dispatch(updateStore(storeToUpdate, STORE_ACTIONS.update, data));
//     unsubscribe();
//   };
// }

declare module GameStore {
  export class Store {
    
  }
}