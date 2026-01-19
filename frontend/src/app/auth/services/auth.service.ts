import { Injectable } from '@angular/core';
import { LoginRequest } from '../dtos/login/login-request';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../dtos/login/login-response';
import { environment } from '@env/environment';
import { LocalStorageService } from '@core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
  ) {}

  doLogin(request: LoginRequest): Observable<LoginResponse> {
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
}
