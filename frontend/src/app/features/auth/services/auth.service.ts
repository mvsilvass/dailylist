import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../models/register-request';
import { RegisterResponse } from '../models/register-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  doLogin(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, request);
  }

  doRegister(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/register`, request);
  }
}
