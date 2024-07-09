import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseApiUrl: string = "https://localhost:7132"
  
  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseApiUrl + '/api/TodoItems');
  }
}
