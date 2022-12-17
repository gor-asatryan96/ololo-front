export function createReducer(initialState, cb) {
  // eslint-disable-next-line func-names
  return function (state = initialState, action) {
    const switchableObject = cb(state, action);
    // eslint-disable-next-line no-prototype-builtins
    if (switchableObject.hasOwnProperty(action.type)) {
      if (typeof switchableObject[action.type] !== 'function') {
        throw new TypeError(
          'object value in create reducer callback object must be a function',
        );
      } else {
        const value = switchableObject[action.type]();
        return value !== undefined ? value : state;
      }
    }
    return state;
  };
}

export function createAction(type) {
  return value => ({ type, value });
}
