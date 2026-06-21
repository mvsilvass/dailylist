import { Component, inject, model, signal } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { IconButtonComponent } from "app/shared/components/icon-button/icon-button.component";

@Component({
  selector: 'app-format-bar',
  standalone: true,
  templateUrl: './format-bar.component.html',
  styleUrl: './format-bar.component.css',
  imports: [FormsModule, MatIcon, IconButtonComponent],
})
export class FormatBarComponent {
  private clipboard = inject(Clipboard);

  public bold = model.required<boolean>();
  public italic = model.required<boolean>();
  public link = model.required<string>();

  protected isEditingLink = signal<boolean>(false);

  protected copyLink() {
    const currentLink = this.link();

    if (currentLink) {
      this.clipboard.copy(currentLink);
      console.log(currentLink);
    }
  }

  protected toggleLinkMode() {
    this.isEditingLink.update((state) => !state);
  }

  protected toggleBold() {
    this.bold.update((state) => !state);
  }

  protected toggleItalic() {
    this.italic.update((state) => !state);
  }

  protected clearFormatting() {
    this.bold.set(false);
    this.italic.set(false);
  }
}
