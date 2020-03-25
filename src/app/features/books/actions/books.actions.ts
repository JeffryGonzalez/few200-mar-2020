import { BookEntity } from '../reducers/books.reducer';
import { createAction, props } from '@ngrx/store';

export const booksLoadedSuccessfully = createAction(
  '[booksFeature] books loaded successfully',
  props<{ books: BookEntity[] }>()
);

let tempId = 1;

export const bookAdded = createAction(
  '[booksFeature] book added',
  ({ title, author }: { title: string, author: string }) => ({
    payload: {
      id: 'T' + tempId++,
      title,
      author
    } as BookEntity
  })
);

export const bookAddedSuccess = createAction(
  '[booksFeature] book added successfully',
  props<{ tempId: string, book: BookEntity }>()
);

export const bookAddedFailure = createAction(
  '[booksFeature] book added failed',
  props<{ book: BookEntity, errorMessage: string }>()
);
