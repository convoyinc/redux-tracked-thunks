import { Interactions, reducer } from 'redux-interactions';

export class TrackedThunkInteractions extends Interactions {

  @reducer
  start(state) {
    return state;
  }

  @reducer
  success(state) {
    return state;
  }

  @reducer
  failure(state) {
    return state;
  }

}
export default new TrackedThunkInteractions;
