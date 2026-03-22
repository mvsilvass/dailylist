import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, DestroyRef, inject } from '@angular/core';

import { AuthLayoutComponent } from 'app/auth/components/auth-layout/auth-layout.component';
import { ButtonComponent } from 'app/shared/components/button/button.component';
import { AuthService } from 'app/auth/services/auth.service';

import { RegisterRequest } from 'app/auth/dtos/register/register-request';
import { RegisterResponse } from 'app/auth/dtos/register/register-response';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, AuthLayoutComponent, ButtonComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  protected successMessage: string | null = null;
  protected errorMessage: string | null = null;

  protected registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  private clearMessages() {
    this.successMessage = null;
    this.errorMessage = null;
  }

  private validateForm(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente';
      this.registerForm.markAllAsTouched();
      return false;
    }

    if (password !== confirmPassword) {
      this.errorMessage = 'As senhas não coincidem';
      this.registerForm.markAllAsTouched();
      return false;
    }

    return true;
  }

  protected onSubmit() {
    this.clearMessages();

    if (this.validateForm()) {
      const formValue = this.registerForm.value;

      const request: RegisterRequest = {
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
      };

      const subscription = this.authService.doRegister(request).subscribe({
        next: (response: RegisterResponse) => {
          this.successMessage = response.message;
          this.registerForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        },
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}
