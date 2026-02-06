import { Component, computed, signal } from '@angular/core';
import { SessionService } from '@core/services/session.service';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

import { TaskColumnComponent } from '../../components/task-column/task-column.component';
import { IconButtonComponent } from 'app/shared/components/icon-button/icon-button.component';

import { TaskService } from '../../services/task.service';

import type { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board-page.component.html',
  styleUrl: './task-board-page.component.css',
  imports: [IconButtonComponent, TitleCasePipe, TaskColumnComponent, CdkDropListGroup],
})
export class TaskBoardPageComponent {
  constructor(
    private sessionService: SessionService,
    private taskService: TaskService,
    private router: Router,
  ) {}

  protected selectedDate = signal(new Date());

  protected weekDays = computed(() => this.generateWeekDays(this.selectedDate()));

  protected selectedMonth = computed(() =>
    this.selectedDate().toLocaleString('pt-BR', { month: 'long' }),
  );

  protected selectedYear = computed(() => this.selectedDate().getFullYear());

  ngOnInit() {
    this.taskService.getUserTasks().subscribe({
      next: (response) => this.taskService.setTasks(response),
    });
  }

  private getFirstDayOfWeek(date: Date): Date {
    const daysToSubtract = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToSubtract);
  }

  private generateWeekDays(date: Date): Date[] {
    const monday = this.getFirstDayOfWeek(date);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      return day;
    });
  }

  public getTasksForDate(date: Date): Task[] {
    return this.taskService.getTasksForDate(date);
  }

  public isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  private updateWeek(days: number) {
    this.selectedDate.update((current) => {
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

  public goToCurrentWeek() {
    this.selectedDate.set(new Date());
  }

  public logout() {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}
