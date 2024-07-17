import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-completed',
  templateUrl: './todo-completed.component.html',
  styleUrl: './todo-completed.component.css'
})
export class TodoCompletedComponent implements OnInit{
  todos: Todo[] = [];
  constructor(private todoService: TodoService) {}
  
  ngOnInit(): void {
    this.todoService.getAllCompletedTodos().subscribe({
      next: (res : Todo[]) => {
        this.todos = res;
      },
    });
  }

  undoCompleted(id : string, todo : Todo) {
    this.todoService.undoCompletedTodo(id, todo)
    .subscribe({
      next: (response) => {
        this.getAllTodos();
      }
    })
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
    });
  }

}  
