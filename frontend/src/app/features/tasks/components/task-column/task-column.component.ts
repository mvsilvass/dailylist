import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskInputComponent } from "../task-input/task-input.component";
import { TaskItemComponent } from "../task-item/task-item.component";

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [DatePipe, TaskInputComponent, TaskItemComponent],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css',
})
export class TaskColumnComponent {
  @Input({ required: true }) date!: Date;
  @Input({ required: true }) tasks!: Task[];

}
