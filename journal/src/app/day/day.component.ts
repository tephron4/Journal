import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { TodoComponent } from '../todo/todo.component';

import { DateType } from '../app.component';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDatepickerModule, MatIconModule, MatNativeDateModule, TodoComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
  @Input() date?: DateType;
  @Output() changeDay = new EventEmitter<DateType>();

  todoText: string = '';

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
}
