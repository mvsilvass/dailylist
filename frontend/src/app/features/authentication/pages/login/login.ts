import { Component } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';
import { AuthenticationLayout } from 'src/app/shared/layouts/authentication-layout/authentication-layout';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AuthenticationLayout],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private authenticationService: AuthenticationService,
    private storage: LocalStorageService,
    private router: Router
  ) {}

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

    this.authenticationService.doLogin(request).subscribe({
      next: (loginResponse) => {
        this.storage.set('access-token', loginResponse.accessToken);
        this.loginForm.reset();

        this.router.navigate(['/home']);
      },
      error: (loginResponse) => {
        this.storage.remove('access-token');
        this.loginForm.reset();

        this.errorMessage = loginResponse.error.message;
      },
    });
  }
}
