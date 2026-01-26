import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.css',
})
export class IconButton {
  @Input({ required: true }) icon!: string;
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
