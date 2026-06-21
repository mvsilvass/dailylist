import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: 'app-title-input',
  standalone: true,
  templateUrl: './title-input.component.html',
  styleUrl: './title-input.component.css',
  imports: [FormsModule, MatCheckbox],
})
export class TitleInputComponent {
  public title = model.required<string>();
  public completed = model.required<boolean>();

  protected onChecked() {
    this.completed.update((state) => !state);
  }
}
