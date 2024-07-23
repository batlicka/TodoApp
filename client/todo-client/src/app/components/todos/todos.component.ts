import { TodoService } from './../../services/todo.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  editMode: boolean = true;
  todos: Todo[] = [];
  todosInEditMode: string [] = [];
  newTodo: Todo = {
    id: '',
    name: '',
    isComplete: false,    
  };

  constructor(private todoService: TodoService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllTodos();
    console.log("content of todosInEditMode[]: " + JSON.stringify(this.todosInEditMode))
  }

  getAllTodos() {
    this.todoService.getAllUncompletedTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
    });
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo).subscribe({
      next: (todo) => {
        console.log('new todo obtained from server: ' + JSON.stringify(todo));
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

  updatet(id: string, todo: Todo) {
    this.onChange(id, todo);
  }

  cancelt(todo: Todo) {
    //this.editMode = false;
    this.filterOutId(todo.id); 
    console.log("cancel | editted row in todosInEditMode: " + JSON.stringify(this.todosInEditMode)) 
    this.changeDetectorRef.detectChanges();     
  }

  onEdit(todo: Todo) {
    //this.editMode = true;    
   if(!this.todosInEditMode.includes(todo.id.toString())){
    this.todosInEditMode.push(todo.id.toString())
    console.log("onEdit | editted row in todosInEditMode: " + JSON.stringify(this.todosInEditMode));
    this.changeDetectorRef.detectChanges()   
   }
  }

  filterOutId(id : string) {
    //return this.todosInEditMode.filter(word => !word.includes(id));
    id = id.toString();
    const index = this.todosInEditMode.indexOf(id);
    if (index !== -1) {
      this.todosInEditMode.splice(index, 1);
    }
  }  
}
