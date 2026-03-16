import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { environment } from '@env/environment';

import type { Task } from '../models/task.model';
import type { NewTask } from '../models/new-task.model';
import type { TaskPosition } from '../models/task-reorder.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private tasks = signal<Task[]>([]);

  public getUserTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`).pipe(
      tap((tasks) => this.tasks.set(tasks)),
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
    return this.http.put<Task>(`${environment.apiUrl}/tasks/${task.id}`, task).pipe(
      tap((updatedTask: Task) => {
        this.tasks.update((allTasks) =>
          allTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        );
      }),
    );
  }

  public deleteTask(task: Task): Observable<string> {
    return this.http
      .delete(`${environment.apiUrl}/tasks/${task.id}`, { responseType: 'text' })
      .pipe(
        tap(() => {
          this.tasks.update((tasks) => tasks.filter((t) => t.id !== task.id));
        }),
      );
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
      .sort((a, b) => {
        if (a.isDone !== b.isDone) {
          return a.isDone ? 1 : -1;
        }

        return a.priority - b.priority;
      });
  }

  public addTask(newTask: Task) {
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
  }
}
