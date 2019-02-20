import reducers from './reducers';
import { createStore } from 'redux';

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

export default class Store {
  
  private static instance: Store;
  
  private store = undefined;
  readonly isLogging;
  
  constructor(shouldLog: boolean = false) {
    if (Store.instance) {
      return Store.instance;
    }
    Store.instance = this;
    this.store = createStore(reducers);
    this.isLogging = shouldLog;
  }
  
  public update = (storeToUpdate, action, data) => {
    this.isLogging && console.log(this.store.getState());
    const unsubscribe = this.store.subscribe(() => console.log(this.store.getState()));
    this.store.dispatch(updateStore(storeToUpdate, STORE_ACTIONS.update, data));
    unsubscribe();
  };
}

// export const ServerStore = (function () {
//   this.serverStore = new Store(true);
//   return this.serverStore;
// })();