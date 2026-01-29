import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router } from '@angular/router';
import { NavLinkComponent } from './components/nav-link/nav-link.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, NavLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navLinks = [
    { label: 'Recursos', path: '/home' },
    { label: 'Preços', path: '/home' },
    { label: 'Contato', path: '/home' },
  ];

  public navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
