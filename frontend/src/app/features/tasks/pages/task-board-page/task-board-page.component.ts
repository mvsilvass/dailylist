import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@core/services/session.service';
import { IconButtonComponent } from 'app/shared/components/icon-button/icon-button.component';
import { TaskService } from '../../services/task.service';
import { type Task } from '../../models/task.model';
import { TitleCasePipe } from '@angular/common';
import { TaskColumnComponent } from '../../components/task-column/task-column.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board-page.component.html',
  styleUrl: './task-board-page.component.css',
  imports: [IconButtonComponent, TitleCasePipe, TaskColumnComponent],
})
export class TaskBoardPageComponent {
  constructor(
    private sessionService: SessionService,
    private taskService: TaskService,
    private router: Router,
  ) {}

  private referenceDate = signal(new Date());
  private tasks = signal<Task[]>([]);

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.taskService.getUserTasks().subscribe({
      next: (response: Task[]) => this.tasks.set(response),
      error: (error) => console.error(error),
    });
  }

  private getMonday(date: Date): Date {
    const daysToSubtract = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToSubtract);
  }

  private generateWeek(date: Date): Date[] {
    const monday = this.getMonday(date);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      return day;
    });
  }

  public weekDays = computed<Date[]>(() => this.generateWeek(this.referenceDate()));

  public getTasksForDate(date: Date): Task[] {
    return this.tasks().filter((task) => {
      return new Date(task.createdAt).getDate() === date.getDate();
    });
  }

  public get currentWeek(): Date {
    return this.referenceDate();
  }

  public get currentMonth(): string {
    return this.referenceDate().toLocaleString('pt-BR', { month: 'long' });
  }

  public get currentYear(): number {
    return this.referenceDate().getFullYear();
  }

  public goToNextWeek() {
    this.referenceDate.update((currentWeek) => {
      const nextWeek = new Date(currentWeek);
      nextWeek.setDate(currentWeek.getDate() + 7);
      return nextWeek;
    });
  }

  public goTopreviousWeek() {
    this.referenceDate.update((currentWeek) => {
      const previousWeek = new Date(currentWeek);
      previousWeek.setDate(currentWeek.getDate() - 7);
      return previousWeek;
    });
  }

  public doLogout() {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}
