import { Interactions, reducer } from 'redux-interactions';

export class TrackedThunkInteractions extends Interactions {

  @reducer
  start(state, actionCreatorId, actionId) {
    return this._mergeStatus(state, actionCreatorId, actionId, {
      active: true,
      failure: false,
      success: false,
      error: null,
    });
  }

  @reducer
  success(state, actionCreatorId, actionId) {
    return this._mergeStatus(state, actionCreatorId, actionId, {
      active: false,
      failure: false,
      success: true,
      error: null,
    });
  }

  @reducer
  failure(state, actionCreatorId, actionId, error) {
    return this._mergeStatus(state, actionCreatorId, actionId, {
      active: false,
      failure: true,
      success: false,
      error,
    });
  }

  // Helpers

  _mergeStatus(state, actionCreatorId, actionId, status) {
    return {
      ...state,
      [actionCreatorId]: {
        ...state[actionCreatorId],
        [actionId]: status,
      },
    };
  }
}
export default new TrackedThunkInteractions;
