import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@core/services/session.service';
import { IconButtonComponent } from 'app/shared/components/icon-button/icon-button.component';
import { TaskService } from '../../services/task.service';
import { type Task } from '../../models/task.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TaskInputComponent } from '../../components/task-input/task-input.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board-page.component.html',
  styleUrl: './task-board-page.component.css',
  imports: [IconButtonComponent, TitleCasePipe, TaskInputComponent, DatePipe],
})
export class TaskBoardPageComponent {
  constructor(
    private sessionService: SessionService,
    private taskService: TaskService,
    private router: Router,
  ) {}

  tasks = signal<Task[]>([]);

  ngOnInit() {
    this.taskService.getUserTasks().subscribe({
      next: (response: Task[]) => {
        this.tasks.set(response);
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
    return this.currentWeek.toLocaleString('pt-BR', { month: 'long' });
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

  onNewTask(newTask: Task) {
    this.tasks.update((prevTasks) => [...prevTasks, newTask]);
  }
}
