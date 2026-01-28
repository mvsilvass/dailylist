import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@core/services/session.service';
import { IconButton } from 'app/shared/components/icon-button/icon-button';
import { capitalize } from 'app/shared/utils/string.utils';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
  imports: [IconButton],
})
export class TaskBoard {
  constructor(
    private sessionService: SessionService,
    private taskService: TaskService,
    private router: Router,
  ) {}

  tasks! : Task[];

  ngOnInit() {
    this.taskService.getUserTasks().subscribe({
      next: (response : Task[]) => {
        this.tasks = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private getMonday(date: Date = new Date()): Date {
    const daysToSubtract = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToSubtract);
  }

  currentWeek = this.getMonday();

  get currentMonth(): string {
    return capitalize(this.currentWeek.toLocaleString('pt-BR', { month: 'long' }));
  }

  get currentYear(): number {
    return this.currentWeek.getFullYear();
  }

  nextWeek() {
    this.currentWeek = new Date(this.currentWeek.setDate(this.currentWeek.getDate() + 7));
  }

  previousWeek() {
    this.currentWeek = new Date(this.currentWeek.setDate(this.currentWeek.getDate() - 7));
  }

  doLogout() {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}
