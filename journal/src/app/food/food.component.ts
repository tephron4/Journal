import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FoodItemComponent } from '../food-item/food-item.component';
import { Food } from '../day/day.component';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    CommonModule, 
    FoodItemComponent,
    MatInputModule, 
    MatFormFieldModule,
    MatIconModule, 
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {
  @Input() foods: Food[] = [];
  @Output() addFood = new EventEmitter<any>();
  @Output() deleteFood = new EventEmitter<number>();
  @Output() updateFood = new EventEmitter<any>();

  add() {
    this.addFood.emit();
  }

  delete(index: number) {
    this.deleteFood.emit(index);
  }

  update(item: {index: number, data: Food}) {
    this.updateFood.emit(item);
  }

  getIndex(item: Food) {
    return this.foods.indexOf(item);
  }
}
