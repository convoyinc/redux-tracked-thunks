import * as redux from 'redux';
import thunk from 'redux-thunk';

import { actionsReducer } from '../helpers';

import * as trackedThunks from '../../src';

function createStore(initialState = {}) {
  const rootReducer = redux.combineReducers({
    trackedThunks: trackedThunks.reducer,
    actions: actionsReducer,
  });

  const rootEnhancer = redux.applyMiddleware(
    thunk,
    trackedThunks.middleware
  );

  return redux.createStore(rootReducer, initialState, rootEnhancer);
}

describe(`untracked`, () => {

  let store;
  beforeEach(`store`, () => {
    store = createStore();
  });

  it(`ignores regular dispatches`, () => {
    store.dispatch({type: 'foo'});
    expect(store.getState().actions).to.eql([{type: 'foo'}]);
  });

  it(`ignores non-async thunk dispatches`, () => {
    store.dispatch(dispatch => {
      dispatch({type: 'foo'});
      dispatch({type: 'bar'});
    });
    expect(store.getState().actions).to.eql([
      {type: 'foo'},
      {type: 'bar'},
    ]);
  });

  it(`ignores untracked async thunk dispatches`, async () => {
    await store.dispatch(async (dispatch, _getState) => {
      dispatch({type: 'foo'});
      dispatch({type: 'bar'});
    });
    expect(store.getState().actions).to.eql([
      {type: 'foo'},
      {type: 'bar'},
    ]);
  });

});
