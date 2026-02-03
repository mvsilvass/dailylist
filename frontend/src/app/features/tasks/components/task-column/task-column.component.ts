import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskInputComponent } from '../task-input/task-input.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [DatePipe, TitleCasePipe, TaskInputComponent, TaskItemComponent],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css',
})
export class TaskColumnComponent {
  @Input({ required: true }) date!: Date;
  @Input({ required: true }) tasks!: Task[];

  private taskService = inject(TaskService);

  public handleTaskDrag(task: Task) {
    this.taskService.setTaskInTransit(task);
  }

  public handleTaskDrop() {
    const task = this.taskService.getTaskInTransit();

    if (task) {
      task.targetDate = this.date.getTime();
      this.taskService.updateTask(task).subscribe({
        next: (response) => {
          this.taskService.setTaskInTransit(null);
        },
      });
    }
  }
}
