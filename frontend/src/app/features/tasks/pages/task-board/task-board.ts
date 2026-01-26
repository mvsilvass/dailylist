import { Component } from '@angular/core';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
})
export class TaskBoard {

  currentDate = new Date();

  get currentMonth(): string {
    return this.currentDate.toLocaleString('pt-BR', { month: 'long' });
  }

  get currentYear(): number {
    return this.currentDate.getFullYear();
  }

  nextWeek() {
    this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + 7));
  }

  previousWeek() {
    this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 7));
  }
}
