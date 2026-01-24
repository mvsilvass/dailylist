import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  socials = [
    { name: 'Instagram', icon: 'instagram.svg', href: '#' },
    { name: 'X-Twitter', icon: 'x-twitter.svg', href: '#' },
    { name: 'Facebook', icon: 'facebook.svg', href: '#' },
  ];
}
