import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseApiUrl: string = 'https://localhost:7132';
  handleError: any;

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseApiUrl + '/api/TodoItems');
  }

  getAllUncompletedTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseApiUrl + '/api/TodoItems/get-all-uncompleted-todos')
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    newTodo.id = '0';
    console.log('new todo: :' + JSON.stringify(newTodo));
    return this.http.post<Todo>(this.baseApiUrl + '/api/TodoItems', newTodo);
  }

  // addTodo2(newTodo: Todo): Observable<Todo> {
  //   newTodo.id = '00000000-0000-0000-0000-000000000000';
  //   return this.http
  //     .post<Todo>(this.baseApiUrl + 'api/', newTodo)
  //     .pipe(catchError(this.handleError('addTodo', newTodo)));
  // }

  updatedTodo(id: string, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.baseApiUrl + '/api/TodoItems/' + id, todo);
  }

  deleteTodo(id: string) : Observable<Todo> {
    return this.http.delete<Todo>(this.baseApiUrl + '/api/TodoItems/' + id)
  }
 //get all completed
  getAllCompletedTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseApiUrl + '/api/TodoItems/get-all-completed-todos');
  }

  //undo-completed-todo/{id:Guid}
  undoCompletedTodo(id: string, todo: Todo) : Observable<Todo> {
    return this.http.put<Todo>(this.baseApiUrl + '/api/TodoItems/undo-completed-todo/' + id, todo)
  }

}
