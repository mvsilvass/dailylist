import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css',
  imports: [MatIconModule],
})
export class IconButtonComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) ariaLabel!: string;
  @Output() clicked = new EventEmitter<void>();

  protected onClick() {
    this.clicked.emit();
  }
}
