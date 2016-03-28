import { Interactions, reducer } from 'redux-interactions';

export class TrackedThunkInteractions extends Interactions {

  @reducer
  start(state) {

  }

  @reducer
  success(state) {

  }

  @reducer
  failure(state) {

  }

}
export default new TrackedThunkInteractions;
