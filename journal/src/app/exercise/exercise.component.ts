import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Exercise, ExerciseType, WeightUnit } from '../day/day.component';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {
  @Input() exercise: Exercise = {desc: '', type: ExerciseType.LIFTING};
  @Output() deleteExercise = new EventEmitter<Exercise>();
  @Output() updateExercise = new EventEmitter<Exercise>();
  @Output() moveUp = new EventEmitter<Exercise>();
  @Output() moveDown = new EventEmitter<Exercise>();

  time: Time = {hours: 0, minutes: 0};

  delete() {
    this.deleteExercise.emit(this.exercise);
  }

  setTime() {
    this.exercise.time = this.time;
    this.update();
  }

  update() {
    this.updateExercise.emit(this.exercise);
  }

  move(dir: number) {
    dir === -1 ? 
      this.moveUp.emit(this.exercise) 
      : this.moveDown.emit(this.exercise);
  }

  getTypes() {
    return [
      ExerciseType.LIFTING,
      ExerciseType.CARDIO,
    ];
  }

  getTypeString(t: ExerciseType) {
    switch (t) {
      case ExerciseType.LIFTING:
        return 'Lifting';
      case ExerciseType.CARDIO:
        return 'Cardio';
      default:
        return 'UNKNOWN';
    }
  }

  isLifting() {
    if (this.exercise.type === ExerciseType.LIFTING) {
      return true;
    }

    return false;
  }

  getUnits() {
    return [
      WeightUnit.POUNDS,
      WeightUnit.KILOGRAMS,
    ];
  }

  getUnitString(u: WeightUnit) {
    switch (u) {
      case WeightUnit.POUNDS:
        return 'lbs';
      case WeightUnit.KILOGRAMS:
        return 'kg';
      default:
        return 'UNKNOWN';
    }
  }
}
