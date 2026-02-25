import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

import { IconButtonComponent } from 'app/shared/components/icon-button/icon-button.component';
import { TaskService } from '../../services/task.service';
import type { Task } from '../../models/task.model';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    DatePipe,
    MatCheckboxModule,
    IconButtonComponent,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [DatePipe],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent {
  protected task = inject(MAT_DIALOG_DATA);
  private taskService = inject(TaskService);

  private dialog = inject(MatDialogRef);

  protected taskTargetDate = signal<Date>(this.task.targetDate);
  protected taskDescription = signal<string>(this.task.description);
  protected taskTitle = signal<string>(this.task.title);
  protected taskIsDone = signal<boolean>(this.task.isDone);
  protected taskLink = signal<string>(this.task.link);

  constructor() {
    this.dialog.backdropClick().subscribe(() => {
      this.closeDialog();
    });
  }

  private isDirty = computed(() => {
    return (
      this.taskTitle() !== this.task.title ||
      this.taskDescription() !== this.task.description ||
      this.taskTargetDate() !== this.task.targetDate ||
      this.taskIsDone() !== this.task.isDone ||
      this.taskLink() !== this.task.link
    );
  });

  private closeDialog() {
    if (!this.isDirty()) {
      this.dialog.close();
      return;
    }

    const updateTask: Task = {
      ...this.task,
      title: this.taskTitle(),
      targetDate: this.taskTargetDate(),
      isDone: this.taskIsDone(),
      description: this.taskDescription(),
      link: this.taskLink(),
    };

    this.dialog.close(updateTask);
  }

  protected onChecked() {
    this.taskIsDone.update((current) => !current);
  }

  protected onDelete() {
    this.taskService.deleteTask(this.task).subscribe({
      error: (error) => {
        console.log(error);
      },
    });
  }

  private updateTaskDate(days: number) {
    const newDate = new Date(this.taskTargetDate());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  protected get tomorrow() {
    return this.updateTaskDate(1);
  }

  protected get nextWeek() {
    return this.updateTaskDate(7);
  }

  protected rescheduleTask(newDate: Date) {
    const updateTask: Task = {
      ...this.task,
      title: this.taskTitle(),
      targetDate: newDate,
      isDone: this.taskIsDone(),
      description: this.taskDescription(),
      link: this.taskLink(),
    };

    this.dialog.close(updateTask);
  }
}
