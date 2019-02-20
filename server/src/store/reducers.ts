import { combineReducers } from 'redux';
import { IGameState } from '../entity/Game';

const initGameState = {};
//
// function GameState(state = initGameState, action) {
//   switch (action.type) {
//     case STORE_ACTIONS.update:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// }

export const STORE = {
  game: 'gameState',
};
export const STORE_ACTIONS = {
  update: 'update',
};

const generateReducers = (initialStates) => {
  return initialStates.map((stateDefinition) => {
    const reducerDefinition = {};
    return reducerDefinition[stateDefinition.name] = (function (state: object = stateDefinition.definition, action) {
        switch (action.type) {
          case STORE_ACTIONS.update:
            return { ...state, ...action.payload };
          default:
            return state;
        }
      }
    );
  });
};

const stores = [{
  name: 'GameState',
  definition: initGameState,
}];

export default combineReducers(generateReducers(stores));