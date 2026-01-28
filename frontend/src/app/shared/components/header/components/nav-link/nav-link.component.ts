import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.css',
})
export class NavLinkComponent {
  @Input() label!: string;
  @Input() href!: string;
}
