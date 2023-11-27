import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TodoComponent } from '../todo/todo.component';

import { DateType } from '../app.component';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule, TodoComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent implements OnChanges {
  @Input() date?: DateType;

  ngOnChanges(changes: SimpleChanges) {
    this.date = changes['date'].currentValue;
  }

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
}
