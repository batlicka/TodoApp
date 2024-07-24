import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  todosUnEditted: Todo[] = [];
  todosInEditMode: string[] = [];
  newTodo: Todo = {
    id: '',
    name: '',
    isComplete: false,
  };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAllUncompletedTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        //this.todosUnEditted = [...todos];               
      },
    });
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo).subscribe({
      next: (todo) => {
        this.getAllTodos();
      },
    });
  }

  onCompleteChange(id: string, todo: Todo) {
    todo.isComplete = !todo.isComplete;
    this.todoService.updatedTodo(id, todo).subscribe({
      next: (response) => {
        this.getAllTodos();
      },
    });
  }

  onChange(id: string, todo: Todo) {
    this.todoService.updatedTodo(id, todo).subscribe({
      next: (response) => {
        this.getAllTodos();
        this.cancel(todo);
      },
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe({
      next: (response) => {
        this.getAllTodos();
      },
    });
  }

  cancel(todo: Todo) {
    this.filterOutId(todo.id);    
    this.getAllTodos();  
    //this.todos = [...this.todosUnEditted] 
  }

  onEdit(todo: Todo) {
    if (!this.todosInEditMode.includes(todo.id.toString())) {
      this.todosInEditMode.push(todo.id.toString());      
      this.todosInEditMode = [...this.todosInEditMode];
    }
  }

  filterOutId(id: string) {    
    const index = this.todosInEditMode.indexOf(id.toString());
    if (index !== -1) {
      this.todosInEditMode.splice(index, 1);
    }
    this.todosInEditMode = [...this.todosInEditMode];
  }
}
