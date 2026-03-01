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
      const element = this.editorRef?.nativeElement;

      if (element && signalValue !== element.innerText && !this.isFocused) {
        element.innerText = signalValue;
      }
    });
  }

  ngAfterViewInit() {
    if (this.editorRef) {
      this.editorRef.nativeElement.innerText = this.text();
    }
  }

  protected onTyping(event: Event) {
    const element = event.target as HTMLElement;
    let content = element.innerText || '';

    if (content === '\n') content = '';
    if (this.text() !== content) {
      this.text.set(content);
    }
  }

  protected onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text/plain') || '';
    this.text.set(pastedText);

    if (this.editorRef) {
      this.editorRef.nativeElement.innerText = this.text();
    }
  }

  protected onFocus() {
    this.isFocused = true;
  }

  protected onBlur() {
    this.isFocused = false;
    this.text.set(this.editorRef.nativeElement.innerText);
  }
}
