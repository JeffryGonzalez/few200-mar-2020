import * as fromCounter from './counter.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface AppState {
  counter: fromCounter.CounterState;
}


export const reducers: ActionReducerMap<AppState> = {
  counter: fromCounter.reducer
};


// Selectors
// create a selector per branch

const selectCounterBranch = (state: AppState) => state.counter;

export const getCurrent = createSelector(selectCounterBranch, b => b.current);

export const selectResetDisabled = createSelector(
  getCurrent,
  c => c === 0
);

export const selectCountingBy = createSelector(selectCounterBranch, b => b.by);
