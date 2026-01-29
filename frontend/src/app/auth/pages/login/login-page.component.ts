import { Component } from '@angular/core';
import { LoginRequest } from '../../dtos/login/login-request';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from "app/auth/components/auth-layout/auth-layout.component";
import { ButtonComponent } from "app/shared/components/button/button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AuthLayoutComponent, ButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
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
    if (this.validateForm()) return;
    const formValue = this.loginForm.value;

    const request: LoginRequest = {
      email: formValue.email,
      password: formValue.password,
    };

    this.authService.doLogin(request).subscribe({
      next: () => {
        this.loginForm.reset();
        this.router.navigate(['/tasks']);
      },
      error: (loginResponse) => {
        this.loginForm.reset();
        this.errorMessage = loginResponse.error.message;
      },
    });
  }
}
