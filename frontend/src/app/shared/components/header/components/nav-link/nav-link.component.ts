import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.css',
})
export class NavLinkComponent {
  @Input() label!: string;
  @Input() path!: string;
}
