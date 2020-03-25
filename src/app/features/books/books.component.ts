import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksFeatureState, selectBookListModelArray } from './reducers';
import { Observable } from 'rxjs';
import { BookListItem } from './models';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books$: Observable<BookListItem[]>;
  constructor(private store: Store<BooksFeatureState>) { }

  ngOnInit(): void {
    this.books$ = this.store.select(selectBookListModelArray);
  }

}
