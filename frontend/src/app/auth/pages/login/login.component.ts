import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthLayoutComponent } from 'app/auth/components/auth-layout/auth-layout.component';
import { ButtonComponent } from 'app/shared/components/button/button.component';
import { AuthService } from '../../services/auth.service';

import { LoginRequest } from '../../dtos/login/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AuthLayoutComponent, ButtonComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  protected errorMessage: string | null = null;

  protected loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  private validateForm(): boolean {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente';
      this.loginForm.markAllAsTouched();
      return false;
    }

    return true;
  }

  protected onSubmit() {
    if (this.validateForm()) {
      const formValue = this.loginForm.value;

      const request: LoginRequest = {
        email: formValue.email,
        password: formValue.password,
      };

      const subscription = this.authService.doLogin(request).subscribe({
        next: () => {
          this.loginForm.reset();
          this.router.navigate(['/tasks']);
        },
        error: (loginResponse) => {
          this.loginForm.reset();
          this.errorMessage = loginResponse.error.message;
        },
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}
