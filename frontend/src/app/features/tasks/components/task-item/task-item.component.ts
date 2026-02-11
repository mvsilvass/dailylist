import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Task } from '../../models/task.model';

import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.component.html',
  imports: [MatCheckboxModule],
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() statusChange = new EventEmitter<Task>();

  protected onChecked() {
    this.task.isDone = !this.task.isDone;
    this.statusChange.emit(this.task);
  }
}
