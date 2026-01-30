import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@core/services/session.service';
import { IconButtonComponent } from 'app/shared/components/icon-button/icon-button.component';
import { TaskService } from '../../services/task.service';
import { type Task } from '../../models/task.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TaskInputComponent } from '../../components/task-input/task-input.component';
import { TaskItemComponent } from "../../components/task-item/task-item.component";
import { TaskColumnComponent } from '../../components/task-column/task-column.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board-page.component.html',
  styleUrl: './task-board-page.component.css',
  imports: [
    IconButtonComponent,
    TitleCasePipe,
    // TaskInputComponent,
    DatePipe,
    // TaskItemComponent,
    TaskColumnComponent,
  ],
})
export class TaskBoardPageComponent {
  constructor(
    private sessionService: SessionService,
    private taskService: TaskService,
    private router: Router,
  ) {}

  private referenceDate = signal(new Date());
  tasks = signal<Task[]>([]);

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.taskService.getUserTasks().subscribe({
      next: (response: Task[]) => this.tasks.set(response),
      error: (error) => console.error(error),
    });
  }

  private getMonday(date: Date): Date {
    const daysToSubtract = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToSubtract);
  }

  private generateWeek(date: Date): Date[] {
    const monday = this.getMonday(date);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      return day;
    });
  }

  weekDays = computed<Date[]>(() => this.generateWeek(this.referenceDate()));

  get currentWeek(): Date {
    return this.referenceDate();
  }

  get currentMonth(): string {
    return this.referenceDate().toLocaleString('pt-BR', { month: 'long' });
  }

  get currentYear(): number {
    return this.referenceDate().getFullYear();
  }

  goToNextWeek() {
    this.referenceDate.update((currentWeek) => {
      const nextWeek = new Date(currentWeek);
      nextWeek.setDate(currentWeek.getDate() + 7);
      return nextWeek;
    });
  }

  goTopreviousWeek() {
    this.referenceDate.update((currentWeek) => {
      const previousWeek = new Date(currentWeek);
      previousWeek.setDate(currentWeek.getDate() - 7);
      return previousWeek;
    });
  }

  doLogout() {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }

  onNewTask(newTask: Task) {
    this.tasks.update((prevTasks) => [...prevTasks, newTask]);
  }
}
