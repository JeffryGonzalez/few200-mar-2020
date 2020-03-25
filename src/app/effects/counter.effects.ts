import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, filter } from 'rxjs/operators';
import * as counterActions from '../actions/counter.actions';
import * as appActions from '../actions/app.actions';

@Injectable()
export class CounterEffects {

  // applicationStarted -> (read the value from localStorage for 'by') -> (countBySet(x) | nothing)

  readCountBySet$ = createEffect(() => this.actions$
    .pipe(
      ofType(appActions.applicationStarted),
      map(() => localStorage.getItem('by')), // -> "1" | "3" | "5" || null
      filter(a => a !== null), // if it is null, your work done.
      map(savedValue => counterActions.countBySet({ by: +savedValue })) // Action
    ), {
    dispatch: true
  }
  );
  // CountBySet -> write it local storage -> do nothing.
  saveCountBySet$ = createEffect(() => this.actions$
    .pipe(
      ofType(counterActions.countBySet),
      tap(a => localStorage.setItem('by', a.by.toString()))
    ), {
    dispatch: false
  });

  constructor(private actions$: Actions) { }

}
