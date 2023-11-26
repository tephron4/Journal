import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DateType } from '../app.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @Output() changeDay = new EventEmitter<DateType>();

  selected: Date | null = null;

  selectedDate() {
    if (this.selected !== null) {
      const newDate: DateType = {
        month: this.selected.getMonth().toString(),
        day: this.selected.getDate().toString(),
        year: this.selected.getFullYear().toString(),
      }
      this.changeDay.emit(newDate);
    }
  }
}
