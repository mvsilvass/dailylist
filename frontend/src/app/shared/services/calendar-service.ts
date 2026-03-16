import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private referenceDate = signal(new Date());

  public readonly selectedWeekDays = computed(() => this.generateWeekDays(this.referenceDate()));
  public readonly selectedYear = computed(() => this.referenceDate().getFullYear());
  public readonly selectedMonth = computed(() =>
    this.referenceDate().toLocaleString('pt-BR', { month: 'long' }),
  );

  private getStartOfWeek(date: Date): Date {
    const daysToSubtract = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToSubtract);
  }

  private generateWeekDays(date: Date): Date[] {
    const monday = this.getStartOfWeek(date);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      return day;
    });
  }

  public isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  public addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private updateReferenceDate(days: number): void {
    this.referenceDate.update((current) => this.addDays(current, days));
  }

  public updateReferenceToNextWeek(): void {
    this.updateReferenceDate(7);
  }

  public updateReferenceToPreviousWeek(): void {
    this.updateReferenceDate(-7);
  }

  public updateReferenceToToday(): void {
    this.referenceDate.set(new Date());
  }
}
