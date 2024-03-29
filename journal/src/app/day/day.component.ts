import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

import { CaloriesComponent } from '../calories/calories.component';
import { DateType } from '../app.component';
import { FoodComponent } from '../food/food.component';
import { NotesComponent } from '../notes/notes.component';
import { StepsComponent } from '../steps/steps.component';
import { TodoComponent } from '../todo/todo.component';
import { TodoData } from '../todo-item/todo-item.component';
import { WaterComponent } from '../water/water.component';
import { WorkoutComponent } from '../workout/workout.component';

export enum WaterMeasurement {
  OUNCES = 1,
  CUPS = 2,
  BOTTLES = 3,
}

export interface WaterIntake {
  total: number;
  type: WaterMeasurement;
}

export interface Food {
  name: string,
  calories: number,
}

export interface FoodIntake {
  totalCalories: number,
  foods: Food[],
}

export enum ExerciseType {
  LIFTING = 1,
  CARDIO = 2,
}

export enum WeightUnit {
  POUNDS = 1,
  KILOGRAMS = 2,
}

export interface Exercise {
  desc: string,
  type: ExerciseType,
  sets?: number,
  reps?: number,
  weight?: number,
  unit?: WeightUnit,
  time?: Time,
}

export interface Workout {
  time: Time,
  exercises: Exercise[],
}

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [
    CaloriesComponent,
    CommonModule,
    FoodComponent,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    NotesComponent,
    StepsComponent,
    TodoComponent,
    WaterComponent,
    WorkoutComponent,
  ],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
  @Input() date?: DateType;
  @Output() changeDay = new EventEmitter<DateType>();

  todoItems: TodoData[] = [];
  notesText = '';
  steps: number = 0;
  water: WaterIntake = {total: 0, type: WaterMeasurement.OUNCES};
  food: FoodIntake = {totalCalories: 0, foods: []};
  workout: Workout = {time: {hours: 0, minutes: 0}, exercises: []};

  displayDate(): string {
    if (this.date !== undefined) {
      return this.getMonthName(this.date?.month) + ' ' +
        this.date?.day + ', ' +
        this.date?.year;
    }
    
    return 'Undefined date';
  }

  getMonthName(m: Number) {
    switch (m) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5: 
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November'; 
      case 12:
        return 'December';
      default:
        return 'Unknown month: ' + m;
    }
  }

  previousDay() {
    let newDate: DateType;
    if (this.date !== undefined) {
      newDate = {
        month: this.date?.month,
        day: this.date?.day.valueOf() - 1,
        year: this.date?.year
      };
    } else {
      return;
    }

    if (newDate.day === 0) {
      newDate.month = newDate.month.valueOf() - 1;
      if (newDate.month === 0) {
        newDate.month = 12;
        newDate.year = newDate.year.valueOf() - 1;
      }
      newDate.day = this.getLastDay(newDate.month, newDate.year);
    }

    this.changeDay.emit(newDate);
  }
  
  nextDay() {
    let newDate: DateType;
    if (this.date !== undefined) {
      newDate = {
        month: this.date?.month,
        day: this.date?.day.valueOf() + 1,
        year: this.date?.year
      };
    } else {
      return;
    }

    console.log('newDate: ', newDate);
    if (newDate.day > this.getLastDay(this.date?.month, this.date?.year)) {
      newDate.month = newDate.month.valueOf() + 1;
      if (newDate.month === 13) {
        newDate.month = 1;
        newDate.year = newDate.year.valueOf() + 1;
      }
      newDate.day = 1;
    }

    this.changeDay.emit(newDate);
  }

  getLastDay(m: Number, y: Number): Number {
    console.log('Checking month: ', m);
    console.log('Checking year: ', y);
    switch (m.valueOf()) {
      case 1:
      case 3:
      case 5: 
      case 7:
      case 8:
      case 10: 
      case 12:
        console.log('31');
        return 31;
      case 4:
      case 6: 
      case 9: 
      case 11:
        console.log('30');
        return 30;
      case 2:
        if (y.valueOf() % 4 !== 0) return 28;
        return 29;
      default:
        console.log('default 31');
        return 31;
    }
  }

  addItem() {
    this.todoItems.push({done: false, description: ''});
  }

  deleteItem(index: number) {
    this.todoItems.splice(index, 1);
  }

  updateItem(item: {index: number, data: TodoData}) {
    this.todoItems.splice(item.index, 1, item.data);
  }

  updateNotes(text: string) {
    this.notesText = text;
  }

  updateSteps(num: number) {
    this.steps = num;
  }

  updateWaterTotal(val: number) {
    this.water.total = val;
  }

  changeWaterMeasure(t: WaterMeasurement) {
    this.water.type = t;
  }

  addFood() {
    this.food.foods.push({name: '', calories: 0});
  }

  deleteFood(index: number) {
    this.food.foods.splice(index, 1);
    this.updateCalories();
  }

  updateFood(item: {index: number, data: Food}) {
    this.food.foods.splice(item.index, 1, item.data);
    this.updateCalories();
  }

  updateCalories() {
    let count = 0;
    for (var food of this.food.foods) {
      count = count + food.calories;
    }
    this.food.totalCalories = count;
  }

  setWorkoutTime(time: Time) {
    this.workout.time = time;
  }

  addExercise() {
    this.workout.exercises.push({desc: '', type: ExerciseType.LIFTING});
  }

  deleteExercise(index: number) {
    this.workout.exercises.splice(index, 1);
  }

  updateExercise(item: {index: number, data: Exercise}) {
    this.workout.exercises.splice(item.index, 1, item.data);
  }

  moveExercise(indexes: {currIndex: number, newIndex: number}) {
    const temp = this.workout.exercises[indexes.newIndex];
    this.workout.exercises.splice(
      indexes.newIndex,
      1,
      this.workout.exercises[indexes.currIndex]
    );
    this.workout.exercises.splice(
      indexes.currIndex,
      1,
      temp
    );
  }
}
