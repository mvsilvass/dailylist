import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';

import type { Task } from '../models/task.model';
import type { NewTask } from '../models/new-task.model';
import type { TaskPosition } from '../models/task-reorder.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private tasks = signal<Task[]>([]);

  public getUserTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  public getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${environment.apiUrl}/tasks/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  public updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.apiUrl}/tasks/${task.id}`, task);
  }

  public reorderTasks(updateTasks: TaskPosition[]): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/tasks/reorder`, updateTasks);
  }

  public createTask(newTask: NewTask): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, newTask).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  public getTasksForDate(date: Date): Task[] {
    return this.tasks()
      .filter((task) => {
        const taskDate = new Date(task.targetDate);
        return (
          taskDate.getFullYear() === date.getFullYear() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getDate() === date.getDate()
        );
      })

      .sort((a, b) => a.priority - b.priority);
  }

  public setTasks(tasks: Task[]) {
    this.tasks.set(tasks);
  }

  public addTask(newTask: Task) {
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
  }
}
