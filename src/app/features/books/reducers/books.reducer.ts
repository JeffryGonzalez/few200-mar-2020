import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/books.actions';
export interface BookEntity {
  id: string;
  title: string;
  author: string;
}

export interface BooksState extends EntityState<BookEntity> {

}

export const adapter = createEntityAdapter<BookEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.booksLoadedSuccessfully, (s, a) => adapter.setAll(a.books, s)),
  on(actions.bookAdded, (s, a) => adapter.addOne(a.payload, s)),
  on(actions.bookAddedFailure, (s, a) => adapter.removeOne(a.book.id, s)),
  on(actions.bookAddedSuccess, (s, a) => {
    const tempState = adapter.removeOne(a.tempId, s);
    return adapter.addOne(a.book, tempState);
  })
);

export function reducer(state: BooksState = initialState, action: Action) {
  return reducerFunction(state, action);
}



