import interactions from './interactions';

/**
 *
 */
export default function trackedThunk(target, key, descriptor) {
  const actionCreator = descriptor.value;
  if (typeof actionCreator !== 'function') {
    throw new TypeError(`@tracked can only decorate methods`);
  }

  descriptor.value = function trackedThunkActionCreator(...args) {
    return async function trackedThunkAction(dispatch, getState) {
      dispatch(interactions.start());

      const thunk = actionCreator.call(target, ...args);
      if (typeof thunk !== 'function') {
        throw new TypeError(
          `@tracked can only decorate async thunked action creators.  ` +
          `Got ${thunk} for ${key}`
        );
      }
      const promise = thunk(dispatch, getState);
      if (!promise || typeof promise.then !== 'function') {
        throw new TypeError(
          `@tracked can only decorate async thunked action creators.  ` +
          `Got a non-Promise result: ${promise} for ${key}`
        );
      }

      try {
        const result = await promise;
        dispatch(interactions.success());
        return result;
      } catch (error) {
        dispatch(interactions.failure());
      }
    };
  };
}
