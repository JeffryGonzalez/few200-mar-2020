import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as appActions from '../../../actions/app.actions';
import * as booksActions from '../actions/books.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { BookEntity } from '../reducers/books.reducer';
import { of } from 'rxjs';
@Injectable()
export class BooksEffects {


  // bookAdded => (API CALL) => bookAddedSuccessfully | bookAddedFailure

  saveBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksActions.bookAdded),
      switchMap(action => this.client.post<BookEntity>('http://localhost:3000/books',
        { title: action.payload.title, author: action.payload.author })
        .pipe(
          map(book => booksActions.bookAddedSuccess({ tempId: action.payload.id, book })),
          catchError(() => of(booksActions.bookAddedFailure({ book: action.payload, errorMessage: 'Cannot add that book' })))
        )
      )
    ), { dispatch: true }
  );

  // applicationStarted => (API CALL) => booksLoadedSuccessfully

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted), // if it is applicationStarted
      switchMap(() => this.client.get<{ books: BookEntity[] }>('http://localhost:3000/books') // switch to a http get
        .pipe(
          map(response => response.books), // that response will be { books: BookEntity[]} so just "pluck out" the books property
          map(books => booksActions.booksLoadedSuccessfully({ books })) // dispatch the action with the books from the API
        )
      )
    ), { dispatch: true }

  );

  constructor(private actions$: Actions, private client: HttpClient) { }
}
