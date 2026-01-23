import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-nav-link',
  templateUrl: './header-nav-link.html',
  styleUrl: './header-nav-link.css',
})
export class HeaderNavLink {
  @Input() label!: string;
  @Input() href!: string;
}
