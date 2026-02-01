import { Component, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

import { type Task } from '../../models/task.model';
import { type NewTask } from '../../models/new-task.model';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.css',
})
export class TaskInputComponent {
  private taskService = inject(TaskService);
  public taskTitle = signal('');

  public createTask(): void {
    if (!this.taskTitle().trim()) return;

    const newTask: NewTask = {
      title: this.taskTitle(),
      description: null,
      link: null,
      image: null,
    };

    this.taskService.createTask(newTask).subscribe({
      next: (response: Task) => {
        this.taskService.addTask(response),
        this.taskTitle.set('');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
