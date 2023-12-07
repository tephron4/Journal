import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { HeaderComponent } from './header/header.component';
import { TodoData } from './todo-item/todo-item.component';

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
  showDay = false;
  date?: DateType;

  username = '';
  password = '';
  loggedIn = false;

  todoItems: TodoData[] = [];

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

  signUp(info: {username: string, password: string}) {
    this.username = info.username;
    this.password = info.password;
    this.loggedIn = true;
    console.log('Username: ', this.username);
    console.log('Password: ', this.password);
  }

  logIn(info: {username: string, password: string}) {
    this.username = info.username;
    this.password = info.password;
    this.loggedIn = true;
    console.log('Username: ', this.username);
    console.log('Password: ', this.password);
  }

  logOut() {
    this.username = '';
    this.password = '';
    this.loggedIn = false;
    console.log('Logged Out');
  }

  addTodoItem() {
    this.todoItems.push({done: false, description: ''});
  }

  deleteTodoItem(index: number) {
    this.todoItems.splice(index, 1);
  }

  updateTodoItem(item: {index: number, data: TodoData}) {
    this.todoItems.splice(item.index, 1, item.data);
  }
}
