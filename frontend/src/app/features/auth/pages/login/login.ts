import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';
import { AuthLayout } from 'src/app/shared/layouts/auth-layout/auth-layout';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AuthLayout],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private authService: AuthService, private storage: LocalStorageService, private router: Router) {}

  errorMessage: string | null = null;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  private validateForm(): boolean {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente';
      this.loginForm.markAllAsTouched();
      return true;
    }

    return false;
  }

  onSubmit() {
    this.storage.remove('access-token');

    if (this.validateForm()) return;
    const formValue = this.loginForm.value;

    const request: LoginRequest = {
      email: formValue.email,
      password: formValue.password,
    };

    this.authService.doLogin(request).subscribe({
      next: (loginResponse) => {
        this.storage.set('access-token', loginResponse.accessToken);
        this.router.navigate(['/home']);
      },
      error: (loginResponse) => {
        this.storage.remove('access-token');
        this.errorMessage = loginResponse.error.message;
      },
    });
  }
}
