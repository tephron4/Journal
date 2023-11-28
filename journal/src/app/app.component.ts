import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { HeaderComponent } from './header/header.component';

export interface DateType {
  month: Number;
  day: Number;
  year: Number;
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

  constructor(private ref: ChangeDetectorRef) {}

  changeDay(newDate: DateType) {
    this.toggleDayView(false);
    this.ref.detectChanges();
    this.date = newDate;
    this.toggleDayView(true);
    console.log('Changed the date to: ', newDate);
  }

  toggleDayView(show: boolean) {
    this.showDay = show;
    if(!show) this.date = undefined;
  }
}
