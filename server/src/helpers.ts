export const STORE_ACTIONS = {
  update: 'UPDATE',
};

export const generateReducer = (store: string, initialState) => {
  return function reducer<T>(state: T = initialState, action): T {
    switch (action.type) {
      case (`@${store}/${STORE_ACTIONS.update}`):
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
};