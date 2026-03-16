import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SessionService } from '@core/services/session.service';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

import { TaskColumnComponent } from '../../components/task-column/task-column.component';
import { IconButtonComponent } from 'app/shared/components/icon-button/icon-button.component';

import { CalendarService } from 'app/shared/services/calendar-service';
import { TaskService } from '../../services/task.service';

import type { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board-page.component.html',
  styleUrl: './task-board-page.component.css',
  imports: [IconButtonComponent, TitleCasePipe, TaskColumnComponent, CdkDropListGroup],
})
export class TaskBoardPageComponent implements OnInit {
  private calendarService = inject(CalendarService);
  private taskService = inject(TaskService);

  private sessionService = inject(SessionService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  public weekDays = this.calendarService.selectedWeekDays;
  public selectedMonth = this.calendarService.selectedMonth;
  public selectedYear = this.calendarService.selectedYear;

  ngOnInit() {
    const subscription = this.taskService.getUserTasks().subscribe({
      error: (error) => {
        console.error(error);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  public nextWeek() {
    this.calendarService.updateReferenceToNextWeek();
  }

  public previousWeek() {
    this.calendarService.updateReferenceToPreviousWeek();
  }

  public resetToToday() {
    this.calendarService.updateReferenceToToday();
  }

  public isWeekend(date: Date): boolean {
    return this.calendarService.isWeekend(date);
  }

  public getTasksForDate(date: Date): Task[] {
    return this.taskService.getTasksForDate(date);
  }

  public logout() {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}
