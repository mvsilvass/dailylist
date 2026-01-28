import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component..html',
  styleUrl: './icon-button.component.css',
})
export class IconButtonComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) ariaLabel!: string;
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
