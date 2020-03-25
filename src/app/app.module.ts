import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { NavComponent } from './components/nav/nav.component';
import { ShoppingEntryComponent } from './components/shopping/components/shopping-entry/shopping-entry.component';
import { ShoppingListComponent } from './components/shopping/components/shopping-list/shopping-list.component';
import { ShoppingService } from './services/shopping.service';
import { CounterComponent } from './components/counter/counter.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './effects/counter.effects';
import { BooksModule } from './features/books/books.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ShoppingComponent,
    NavComponent,
    ShoppingEntryComponent,
    ShoppingListComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BooksModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([CounterEffects])
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
