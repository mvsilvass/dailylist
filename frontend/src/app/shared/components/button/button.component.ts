import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent{
  @Input({ required: true }) label!: string;
  @Input({ required: true }) type!: string;
  @Output() clicked = new EventEmitter<void>();

  public onClick() {
    this.clicked.emit();
  }
}
