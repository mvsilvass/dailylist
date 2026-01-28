import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router } from '@angular/router';
import { NavLinkComponent } from './components/nav-link/nav-link.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, NavLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navLinks = [
    { label: 'Recursos', href: '#' },
    { label: 'Preços', href: '#' },
    { label: 'Contato', href: '#' },
  ];

  public navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
