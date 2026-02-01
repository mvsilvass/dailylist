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

  public weekDays = computed(() => this.generateWeek(this.referenceDate()));

  public currentMonth = computed(() =>
    this.referenceDate().toLocaleString('pt-BR', { month: 'long' }),
  );
  
  public currentYear = computed(() => this.referenceDate().getFullYear());

  ngOnInit() {
    this.taskService.getUserTasks().subscribe({
      next: (response) => this.taskService.setTasks(response),
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
  };

  public getTasksForDate(date: Date): Task[] {
    return this.taskService.getTasksForDate(date);
  }

  public updateWeek(days: number) {
    this.referenceDate.update((current) => {
      const nextWeek = new Date(current);
      nextWeek.setDate(current.getDate() + days);
      return nextWeek;
    });
  }

  public goToNextWeek() {
    this.updateWeek(7);
  }

  public goTopreviousWeek() {
    this.updateWeek(-7);
  }

  public doLogout() {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}
