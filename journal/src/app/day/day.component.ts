import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DateType } from '../app.component';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent implements OnChanges {
  @Input() date?: DateType;
  @Output() toggleDayView = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    this.date = changes['date'].currentValue;
  }

  displayDate(): string {
    return this.date?.month + '/' +
      this.date?.day + '/' +
      this.date?.year;
  }

  back() {
    this.toggleDayView.emit(false);
  }
}
