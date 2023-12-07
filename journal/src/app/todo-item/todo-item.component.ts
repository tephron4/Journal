import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface TodoData {
  done: boolean,
  description: string,
}

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule, 
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() data: TodoData = {done: false, description: ''};
  @Input() index: number = -1;
  @Output() deleteTodoItem = new EventEmitter<number>();
  @Output() updateTodoItem = new EventEmitter<any>();

  updateItem() {
    this.updateTodoItem.emit({index: this.index, data: this.data});
  }

  deleteItem() {
    this.deleteTodoItem.emit(this.index);
  }
}
