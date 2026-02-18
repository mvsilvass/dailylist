import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';

import { TaskDetailsComponent } from '../task-details/task-details.component';
import { TaskService } from '../../services/task.service';
import type { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input({ required: true }) protected task!: Task;
  @Output() protected statusChange = new EventEmitter<Task>();

  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);

  protected onChecked() {
    this.task.isDone = !this.task.isDone;
    this.statusChange.emit(this.task);
  }

  protected openDialog() {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      disableClose: true,
      data: this.task,
      height: '25vw',
      width: '30vw',
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result !== undefined) {
        this.taskService.updateTask(result).subscribe({
          error(error) {
            console.error(error);
          },
        });
      }
    });
  }
}
