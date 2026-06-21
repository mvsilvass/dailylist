import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { TextEditorComponent } from 'app/shared/components/text-editor/text-editor.component';
import { DatePickerComponent } from 'app/shared/components/date-picker/date-picker.component';

import { TaskService } from '../../services/task.service';

import { IconButtonComponent } from 'app/shared/components/icon-button/icon-button.component';
import { ActionsMenuComponent } from './components/actions-menu/actions-menu.component';
import { TitleInputComponent } from './components/title-input/title-input.component';
import { FormatBarComponent } from './components/format-bar/format-bar.component';

import type { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
  imports: [
    ActionsMenuComponent,
    IconButtonComponent,
    TextEditorComponent,
    DatePickerComponent,
    FormatBarComponent,
    TitleInputComponent,
    MatDialogModule,
    MatMenuModule,
  ],
})
export class TaskDetailsComponent {
  private taskService = inject(TaskService);
  private dialog = inject(MatDialogRef);
  private destroyRef = inject(DestroyRef);

  private task = inject(MAT_DIALOG_DATA);

  protected _task = signal<Task>(this.task).asReadonly();
  protected taskDescription = signal<string>(this.task.description);
  protected taskTargetDate = signal<Date>(new Date(this.task.targetDate));
  protected taskTitle = signal<string>(this.task.title);
  protected taskIsDone = signal<boolean>(this.task.isDone);
  protected taskLink = signal<string>(this.task.link);

  protected isBold = signal<boolean>(false);
  protected isItalic = signal<boolean>(false);

  constructor() {
    const subscription = this.dialog.backdropClick().subscribe(() => {
      this.closeDialog();
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
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

  protected onDelete() {
    const subscription = this.taskService.deleteTask(this.task).subscribe({
      error: (error) => {
        console.log(error);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
