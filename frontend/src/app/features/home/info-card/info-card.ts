import { Component, Input } from '@angular/core';
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.html',
  styleUrl: './info-card.css',
})
export class InfoCard {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) alt!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
}
