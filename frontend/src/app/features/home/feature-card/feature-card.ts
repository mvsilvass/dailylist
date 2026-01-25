import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.css',
})
export class FeatureCard {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) alt!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
}
