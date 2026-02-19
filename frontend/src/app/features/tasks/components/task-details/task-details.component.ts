import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import type { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [MatDialogModule, FormsModule, DatePipe, MatIconModule, MatCheckboxModule],
  providers: [DatePipe],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent {
  protected task = inject(MAT_DIALOG_DATA);
  private taskService = inject(TaskService);

  private dialog = inject(MatDialogRef);

  protected taskTargetDate = signal(this.task.targetDate);
  protected taskDescription = signal(this.task.description);
  protected taskTitle = signal(this.task.title);
  protected taskIsDone = signal(this.task.isDone);
  protected taskLink = signal(this.task.link);

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
}
