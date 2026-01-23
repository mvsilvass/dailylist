import { Component } from '@angular/core';
import { Button } from "../button/button";
import { Router } from '@angular/router';
import { HeaderNavLink } from './header-nav-link/header-nav-link';

@Component({
  selector: 'app-header',
  imports: [Button, HeaderNavLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
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
