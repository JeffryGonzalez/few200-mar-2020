import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/counter.actions';
export interface CounterState {
  current: number;
  by: number;
}

const initialState: CounterState = {
  current: 0,
  by: 1
};

const reducerHelper = createReducer(
  initialState,
  on(actions.countIncremented, (s) => ({ ...s, current: s.current + s.by })), // Object Spread Operator
  on(actions.countDecremented, (s) => ({ ...s, current: s.current - s.by })),
  on(actions.countReset, () => initialState),
  on(actions.countBySet, (s, a) => ({ ...s, by: a.by }))
);
// when an action is dispatched, it is given the current state, the action, and it must return a new state.
export function reducer(state: CounterState = initialState, action: Action) {
  return reducerHelper(state, action);
}
