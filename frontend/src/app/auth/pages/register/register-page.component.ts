import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from 'app/auth/dtos/register/register-request';
import { RegisterResponse } from 'app/auth/dtos/register/register-response';
import { AuthService } from 'app/auth/services/auth.service';
import { AuthLayoutComponent } from "app/auth/components/auth-layout/auth-layout.component";
import { ButtonComponent } from "app/shared/components/button/button.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, AuthLayoutComponent, ButtonComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  constructor(private authService: AuthService) {}

  successMessage: string | null = null;
  errorMessage: string | null = null;

  registerForm: FormGroup = new FormGroup({
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

  onSubmit() {
    this.clearMessages();
    if (!this.validateForm()) return;
    const formValue = this.registerForm.value;

    const request: RegisterRequest = {
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
    };

    this.authService.doRegister(request).subscribe({
      next: (response: RegisterResponse) => {
        this.registerForm.reset();
        this.successMessage = response.message;
      },
      error: (error) => {
        this.registerForm.reset();
        this.errorMessage = error.error.message;
      },
    });
  }
}
