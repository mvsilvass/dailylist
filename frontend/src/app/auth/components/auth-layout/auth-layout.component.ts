import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AuthLayoutComponent {
  @Input({ required: true }) mode!: 'login' | 'register';
  protected githubUrl = 'https://github.com/mvsilvass';

  get targetRoute(): string {
    return this.mode === 'login' ? '/auth/register' : '/auth/login';
  }

  get linkText(): string {
    return this.mode === 'login' ? 'Cadastre-se' : 'Entrar';
  }
}
