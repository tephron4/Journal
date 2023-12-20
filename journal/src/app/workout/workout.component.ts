import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Exercise, ExerciseType, Workout } from '../day/day.component';
import { ExerciseComponent } from '../exercise/exercise.component';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    CommonModule, 
    ExerciseComponent,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {
  @Input() workout: Workout = {time: {hours: 0, minutes: 0}, exercises: []};
  @Output() setWorkoutTime = new EventEmitter<Time>();
  @Output() addExercise = new EventEmitter<any>();
  @Output() deleteExercise = new EventEmitter<number>();
  @Output() updateExercise = new EventEmitter<any>();
  @Output() moveExercise = new EventEmitter<any>();

  setTime() {
    this.setWorkoutTime.emit(this.workout.time);
  }

  add() {
    this.addExercise.emit();
  }

  delete(item: Exercise) {
    this.deleteExercise.emit(this.getIndex(item))
  }

  update(item: Exercise) {
    this.updateExercise.emit({index: this.getIndex(item), data: item});
  }

  moveUpExercise(item: Exercise) {
    const curr = this.getIndex(item);
    if (curr > 0) {
      this.moveExercise.emit({currIndex: curr, newIndex: curr - 1});
    }
  }

  moveDownExercise(item: Exercise) {
    const curr = this.getIndex(item);
    if (curr < this.workout.exercises.length - 1) {
      this.moveExercise.emit({currIndex: curr, newIndex: curr + 1});
    }
  }

  getIndex(item: Exercise) {
    return this.workout.exercises.indexOf(item);
  }
}
