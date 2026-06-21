import { LocalStorageService } from '@core/services/local-storage.service';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { RegisterResponse } from '../dtos/register/register-response';
import { RegisterRequest } from '../dtos/register/register-request';
import { LoginResponse } from '../dtos/login/login-response';
import { LoginRequest } from '../dtos/login/login-request';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storage = inject(LocalStorageService);
  private http = inject(HttpClient);

  public doLogin(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, request).pipe(
      tap((response) => {
        if (response.accessToken) {
          this.storage.set('access_token', response.accessToken);
        }
      }),
      catchError((error) => {
        this.storage.remove('access-token');
        return throwError(() => error);
      }),
    );
  }

  public doRegister(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/register`, request);
  }
}
