import {
  Component,
  ElementRef,
  input,
  model,
  ViewChild,
  effect,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css',
})
export class TextEditorComponent implements AfterViewInit {
  public text = model.required<string>();
  public placeholder = input.required<string>();
  protected isFocused = false;

  @ViewChild('editor') editorRef!: ElementRef<HTMLDivElement>;

  constructor() {
    effect(() => {
      const signalValue = this.text();
      const domValue = this.editorRef?.nativeElement.textContent ?? '';

      if (this.editorRef && signalValue !== domValue) {
        this.editorRef.nativeElement.textContent = signalValue;
      }
    });
  }

  ngAfterViewInit() {
    if (this.editorRef) {
      this.editorRef.nativeElement.textContent = this.text();
    }
  }

  protected onTyping(event: Event) {
    const element = event.target as HTMLElement;
    const content = element.textContent || '';

    if (this.text() !== content) {
      this.text.set(content);
    }
  }

  protected onFocus() {
    this.isFocused = true;
  }

  protected onBlur() {
    this.isFocused = false;
  }
}
