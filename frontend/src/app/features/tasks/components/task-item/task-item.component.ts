import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

import { type NewTask } from '../../models/new-task.model';
import { type Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  private taskService = inject(TaskService);

  taskTitle = signal('');

  createTask(): void {
    if (!this.taskTitle().trim()) return;

    const newTask: NewTask = {
      title: this.taskTitle(),
      description: null,
      link: null,
      image: null,
    };

    this.taskService.createTask(newTask).subscribe({
      next: (response: Task) => {
        this.taskAdded.emit(response);
        this.taskTitle.set('');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
