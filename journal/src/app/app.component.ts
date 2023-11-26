import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { HeaderComponent } from './header/header.component';

export interface DateType {
  month: string;
  day: string;
  year: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CalendarComponent, 
    CommonModule, 
    DayComponent, 
    HeaderComponent, 
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'journal';

  showDay = false;
  date?: DateType;

  changeDay(newDate: DateType) {
    this.date = newDate;
    this.toggleDayView(true);
  }

  toggleDayView(show: boolean) {
    this.showDay = show;
  }
}
