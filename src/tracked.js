import uniqueType from 'unique-type';

import interactions from './interactions';
import status from './status';

/**
 *
 */
export default function trackedThunk(target, key, descriptor) {
  if (typeof target === 'function') {
    return _applyTrackedThunk.bind(this, target);
  }
  return _applyTrackedThunk.call(this, _defaultIdentityMapper, target, key, descriptor);
}

function _applyTrackedThunk(identityMapper, target, key, descriptor) {
  const actionCreator = descriptor.value;
  if (typeof actionCreator !== 'function') {
    throw new TypeError(`@tracked can only decorate methods`);
  }
  const actionCreatorId = _actionCreatorId(target, key);

  descriptor.value = function trackedThunkActionCreator(...args) {
    const actionId = identityMapper(...args);

    return async function trackedThunkAction(dispatch, getState) {
      dispatch(interactions.start(actionCreatorId, actionId));

      const thunk = actionCreator.call(target, ...args);
      if (typeof thunk !== 'function') {
        throw new TypeError(
          `@tracked can only decorate async thunked action creators.  ` +
          `Got ${thunk} for ${actionCreatorId} (${actionId})`
        );
      }
      const promise = thunk(dispatch, getState);
      if (!promise || typeof promise.then !== 'function') {
        throw new TypeError(
          `@tracked can only decorate async thunked action creators.  ` +
          `Got a non-Promise result: ${promise} for ${actionCreatorId} (${actionId})`
        );
      }

      try {
        const result = await promise;
        dispatch(interactions.success(actionCreatorId, actionId));
        return result;
      } catch (error) {
        dispatch(interactions.failure(actionCreatorId, actionId, error));
      }
    };
  };

  descriptor.value.status = function trackedThunkStatusCreator(...args) {
    const actionId = identityMapper(...args);
    return function trackedThunkStatus(state, path) {
      return status(actionCreatorId, actionId, state, path);
    };
  };
}

function _actionCreatorId(target, key) {
  return uniqueType(`${target.constructor.name}:${key}`);
}

function _defaultIdentityMapper(...args) {
  return JSON.stringify(args);
}
