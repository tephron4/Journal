import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TodoData, TodoItemComponent } from '../todo-item/todo-item.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatIconModule, 
    TodoItemComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  @Input() todoItems: TodoData[] = [];
  @Output() addTodoItem = new EventEmitter<any>();
  @Output() deleteTodoItem = new EventEmitter<number>();
  @Output() updateTodoItem = new EventEmitter<any>();

  addItem() {
    this.addTodoItem.emit();
  }

  deleteItem(index: number) {
    this.deleteTodoItem.emit(index);
  }

  updateItem(item: {index: number, data: TodoData}) {
    this.updateTodoItem.emit(item);
  }

  getIndex(item: TodoData) {
    return this.todoItems.indexOf(item);
  }
}
