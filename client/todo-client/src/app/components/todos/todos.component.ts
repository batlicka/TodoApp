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
  newTodo: Todo = {
    id: '',
    name: '',
    isComplete: false,
    //completedDate: new Date(),
    //createdDate: new Date(),
  }

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getAllTodos();
  }


  getAllTodos() {
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
    });
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo).subscribe({
      next: (todo) =>  {
        console.log("new todo obtained from server: " + JSON.stringify(todo))
        this.getAllTodos();
      }
    });
  }

  onCompleteChange(id : string, todo : Todo) {
    todo.isComplete = !todo.isComplete;
    this.todoService.updatedTodo(id, todo)
    .subscribe({
      next: (response) => {
        this.getAllTodos();
      }
    })
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id)
    .subscribe({
      next: (response) => {
        this.getAllTodos();
      }
    })
    
  }
}
