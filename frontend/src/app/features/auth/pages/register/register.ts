import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLayout } from "src/app/shared/layouts/auth-layout/auth-layout";
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import { RegisterRequest } from '../../models/register-request';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, AuthLayout],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private authService: AuthService, private router: Router) {}

  successMessage: string | null = null;
  errorMessage: string | null = null;

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  private validateForm(): boolean {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente';
      this.registerForm.markAllAsTouched();
      return true;
    }

    return false;
  }

  onSubmit() {
    if (this.validateForm()) return;
    const formValue = this.registerForm.value;

    const request: RegisterRequest = {
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
    };

    this.authService.doRegister(request).subscribe({
      next: (RegisterResponse) => {
        this.errorMessage = null;

        this.successMessage = RegisterResponse.message;

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
        
      },
      error: (RegisterResponse) => {
        this.successMessage = null;
        this.errorMessage = RegisterResponse.error.message;
      },
    });
  }
}
