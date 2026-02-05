import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { TaskInputComponent } from '../task-input/task-input.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';

import type { Task } from '../../models/task.model';
import type { TaskPosition } from '../../models/task-reorder.model';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [DatePipe, TitleCasePipe, TaskInputComponent, TaskItemComponent, CdkDropList, CdkDrag],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css',
})
export class TaskColumnComponent {
  @Input({ required: true }) date!: Date;
  @Input({ required: true }) tasks!: Task[];

  private taskService = inject(TaskService);

  private reorderTaskInSameColumn(event: CdkDragDrop<Task[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  private moveTaskToNewColumn(event: CdkDragDrop<Task[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    const movedTask = event.container.data[event.currentIndex];
    movedTask.targetDate = this.date.getTime();
  }

  private reorderTasks(tasks: Task[]) {
    const updateTasks: TaskPosition[] = tasks.map((task, index) => {
      const newPriority = index + 1;
      task.priority = newPriority;

      return {
        id: task.id,
        priority: newPriority,
        targetDate: task.targetDate,
      };
    });

    this.taskService.reorderTasks(updateTasks).subscribe();
  }

  protected drop(event: CdkDragDrop<Task[]>) {
    const currentColumn = event.container;
    const previousColumn = event.previousContainer;

    if (currentColumn === previousColumn) {
      this.reorderTaskInSameColumn(event);
    } else {
      this.moveTaskToNewColumn(event);
      this.reorderTasks(previousColumn.data);
    }

    this.reorderTasks(currentColumn.data);
  }
}
