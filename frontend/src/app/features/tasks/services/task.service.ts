import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';

import { type Task } from '../models/task.model';
import { type NewTask } from '../models/new-task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getUserTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  createTask(newTask: NewTask): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, newTask).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
