import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  githubUrl = 'https://github.com/mvsilvass';

  socials = [
    { name: 'Instagram', icon: 'instagram.svg', href: '#' },
    { name: 'X-Twitter', icon: 'x-twitter.svg', href: '#' },
    { name: 'Github', icon: 'github.svg', href: this.githubUrl },
    { name: 'Facebook', icon: 'facebook.svg', href: '#' },
  ];
}
