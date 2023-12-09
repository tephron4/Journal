import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WaterIntake, WaterMeasurement } from '../day/day.component';

@Component({
  selector: 'app-water',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './water.component.html',
  styleUrl: './water.component.css'
})
export class WaterComponent {
  @Input() water: WaterIntake = {total: 0, type: WaterMeasurement.OUNCES};
  @Output() updateTotal = new EventEmitter<number>();
  @Output() updateType = new EventEmitter<WaterMeasurement>();

  getTypes() {
    return [
      WaterMeasurement.OUNCES,
      WaterMeasurement.CUPS,
      WaterMeasurement.BOTTLES,
    ];
  }

  getTypeString(t: WaterMeasurement) {
    switch (t) {
      case WaterMeasurement.OUNCES:
        return 'Ounces';
      case WaterMeasurement.CUPS:
        return 'Cups';
      case WaterMeasurement.BOTTLES:
        return 'Bottles';
      default:
        return 'UNKNOWN';
    }
  }

  changeTotal() {
    this.updateTotal.emit(this.water.total);
  }

  changeType() {
    this.updateType.emit(this.water.type);
  }
}
