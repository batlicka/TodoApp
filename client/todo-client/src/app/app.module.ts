import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TodoCompletedComponent } from './components/todo-completed/todo-completed.component';
import { IsEditModeActivePipe } from './shared/is-edit-mode-active.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoCompletedComponent, 
    IsEditModeActivePipe,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
