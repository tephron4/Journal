import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Food } from '../day/day.component';

@Component({
  selector: 'app-food-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatIconModule, 
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './food-item.component.html',
  styleUrl: './food-item.component.css'
})
export class FoodItemComponent {
  @Input() food: Food = {name: '', calories: 0};
  @Input() index: number = -1;
  @Output() deleteFood = new EventEmitter<number>();
  @Output() updateFood = new EventEmitter<any>();

  delete() {
    this.deleteFood.emit(this.index);
  }

  update() {
    this.updateFood.emit({index: this.index, data: this.food});
  }
}
