import { Component, computed, DestroyRef, inject, input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatDialogRef } from '@angular/material/dialog';

import { CalendarService } from 'app/shared/services/calendar-service';
import { TaskService } from 'app/features/tasks/services/task.service';

import type { NewTask } from 'app/features/tasks/models/new-task.model';
import type { Task } from 'app/features/tasks/models/task.model';

@Component({
  selector: 'app-actions-menu',
  standalone: true,
  templateUrl: './actions-menu.component.html',
  styleUrl: './actions-menu.component.css',
  imports: [MatMenuModule, MatIconModule],
})
export class ActionsMenuComponent {
  @ViewChild(MatMenu) instance!: MatMenu;

  private calendarService = inject(CalendarService);
  private taskService = inject(TaskService);
  private dialogRef = inject(MatDialogRef);
  private destroyRef = inject(DestroyRef);

  public task = input.required<Task>();

  private targetDate = computed(() => new Date(this.task().targetDate));

  protected onReschedule(newDate: Date) {
    const updateTask: Task = {
      ...this.task(),
      targetDate: newDate.getTime(),
    };

    this.dialogRef.close(updateTask);
  }

  protected onDuplicate() {
    const targetDate = new Date(this.task().targetDate);

    const newTask: NewTask = {
      title: this.task().title,
      description: this.task().description,
      link: this.task().link,
      targetDate: targetDate.getTime(),
    };

    const subscription = this.taskService.createTask(newTask).subscribe({
      next: (response: Task) => {
        this.taskService.addTask(response);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.dialogRef.close();
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  private calculateNewDate(days: number): Date {
    return this.calendarService.addDays(this.targetDate(), days);
  }

  protected get tomorrow() {
    return this.calculateNewDate(1);
  }

  protected get nextWeek() {
    return this.calculateNewDate(7);
  }
}
