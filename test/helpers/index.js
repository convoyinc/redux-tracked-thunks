/**
 * Calls `callback` once Mocha has loaded its environment.
 *
 * See https://github.com/mochajs/mocha/issues/764
 */
export function withMocha(callback) {
  if ('beforeEach' in global) {
    callback();
    return;
  }

  setImmediate(() => {
    withMocha(callback);
  });
}

export function actionsReducer(state = [], action) {
  if (action.type === '@@redux/INIT') return state;
  return [...state, action];
}

export function pause(duration) {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, duration);
  });
}
