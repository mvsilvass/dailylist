import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { environment } from 'src/environments/environment';
import { RegisterResponse } from '../models/register-response';
import { RegisterRequest } from '../models/register-request';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  doLogin(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, request).pipe(
      tap((response) => {
        if (response.accessToken) {
          this.storage.set('access-token', response.accessToken);
        }
      }),
      catchError((error) => {
        this.storage.remove('access-token');
        return throwError(() => error);
      })
    );
  }

  doRegister(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/register`, request);
  }

  doLogout(): void {
    this.storage.remove('access-token');
  }
}
