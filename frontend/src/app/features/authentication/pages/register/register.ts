import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterRequest } from '../../models/register-request';
import { AuthenticationService } from '../../services/authentication.service';
import { isValidDate } from 'rxjs/internal/util/isDate';
import { AuthenticationLayout } from '../../layout/authentication-layout/authentication-layout';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, AuthenticationLayout],
  templateUrl: './register.html',
  styleUrl: './../../authentication.css',
})
export class Register {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  successMessage: string | null = null;
  errorMessage: string | null = null;

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
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

    this.authenticationService.doRegister(request).subscribe({
      next: (RegisterResponse) => {
        this.registerForm.reset();
        this.successMessage = RegisterResponse.message;
      },
      error: (RegisterResponse) => {
        this.registerForm.reset();
        this.errorMessage = RegisterResponse.error.message;
      },
    });
  }
}
