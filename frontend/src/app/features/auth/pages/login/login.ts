import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  constructor(private authService: AuthService) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(){
    const formValue = this.loginForm.value;

    const request: LoginRequest = {
      email: formValue.email,
      password: formValue.password,
    };

    this.authService.doLogin(request).subscribe({
      next: (loginResponse) => {
        console.log('login ok', loginResponse);
      },
      error: (loginResponse) => {
        console.log('erro login', loginResponse.error);
      },
    });
  }
}
