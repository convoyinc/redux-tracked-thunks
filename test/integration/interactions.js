import { Interactions, reducer } from 'redux-interactions';
import * as _ from 'lodash';
import * as redux from 'redux';
import * as uuid from 'uuid';
import thunk from 'redux-thunk';

import { actionsReducer, pause } from '../helpers';

import * as trackedThunks from '../../src';
const tracked = trackedThunks.tracked;

const interactions = new class TodoInteractions extends Interactions {
  initialState = [];

  @tracked(category => category)
  add(category, text, fail = false) {
    return async (dispatch, _getState) => {
      const id = uuid.v4();
      dispatch(this.addLocal(id, category, text, true));
      await pause(1);
      if (fail) {
        dispatch(this.deleteLocal(id));
        throw new Error('failed');
      } else {
        dispatch(this.markSaved(id));
      }
    };
  }

  @reducer
  addLocal(state, id, category, text, saving = false) {
    return [...state, {id, category, text, saving}];
  }

  @reducer
  deleteLocal(state, id) {
    return _.reject(state, t => t.id === id);
  }

  @reducer
  markSaved(state, id) {
    return state.map(todo => {
      if (todo.id !== id) return todo;
      todo.saving = false;
    });
  }
};

function createStore(initialState = {}) {
  const rootReducer = redux.combineReducers({
    todos: interactions.reducer,
    trackedThunks: trackedThunks.reducer,
    actions: actionsReducer,
  });

  const rootEnhancer = redux.applyMiddleware(
    thunk,
    trackedThunks.middleware
  );

  return redux.createStore(rootReducer, initialState, rootEnhancer);
}

describe(`interactions`, () => {

  let store;
  beforeEach(`store`, () => {
    store = createStore();
  });

  it(`tracks successful actions`, async () => {
    await store.dispatch(interactions.add('general', 'stuff'));
    expect(store.getState().actions).to.containSubset([
      {type: trackedThunks.ACTION_START},
      {type: interactions.ADD_LOCAL},
      {type: interactions.MARK_SAVED},
      {type: trackedThunks.ACTION_SUCCESS},
    ]);
    expect(interactions.add.status('general')(store.getState())).to.containSubset({
      active: false,
      success: true,
      failure: false,
      error: null,
    });
  });

  it(`tracks failed actions`, async () => {
    await store.dispatch(interactions.add('general', 'stuff', true));
    expect(store.getState().actions).to.containSubset([
      {type: trackedThunks.ACTION_START},
      {type: interactions.ADD_LOCAL},
      {type: interactions.DELETE_LOCAL},
      {type: trackedThunks.ACTION_FAILURE},
    ]);
    expect(interactions.add.status('general')(store.getState())).to.containSubset({
      active: false,
      success: false,
      failure: true,
      error: {message: 'failed'},
    });
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
