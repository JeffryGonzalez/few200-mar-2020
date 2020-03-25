import { Component, OnInit } from '@angular/core';
import { BooksFeatureState } from '../../reducers';
import { Store } from '@ngrx/store';
import { bookAdded } from '../../actions/books.actions';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private store: Store<BooksFeatureState>) { }

  ngOnInit(): void {
  }

  addBook(titleEl: HTMLInputElement, authorEl: HTMLInputElement) {
    const data = {
      title: titleEl.value,
      author: authorEl.value
    };

    this.store.dispatch(bookAdded(data));

    titleEl.value = '';
    authorEl.value = '';
    titleEl.focus();

  }
}
