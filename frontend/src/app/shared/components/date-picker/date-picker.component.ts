import { DatePipe } from '@angular/common';
import { Component, model, signal } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  imports: [MatDatepickerModule, DatePipe],
})
export class DatePickerComponent {
  protected isCalendarOpen = signal<boolean>(false);
  public date = model.required<Date>();

  protected onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;

    if (selectedDate) {
      this.date.set(selectedDate);
    }
  }

  protected openCalendar() {
    this.isCalendarOpen.set(true);
  }

  protected closeCalendar() {
    this.isCalendarOpen.set(false);
  }
}
