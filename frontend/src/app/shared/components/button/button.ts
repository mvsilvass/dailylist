import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) type!: string;
  @Output() clicked = new EventEmitter<void>();

  public onClick() {
    this.clicked.emit();
  }
}
