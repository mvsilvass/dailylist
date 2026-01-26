import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@core/services/session.service';
import { IconButton } from "app/shared/components/icon-button/icon-button";
import { capitalize } from 'app/shared/utils/string.utils';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
  imports: [IconButton],
})
export class TaskBoard {
  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {}

  currentDate = new Date();

  get currentMonth(): string {
    return capitalize(this.currentDate.toLocaleString('pt-BR', { month: 'long' }));
  }

  get currentYear(): number {
    return this.currentDate.getFullYear();
  }

  nextWeek() {
    this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + 7));
  }

  previousWeek() {
    this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 7));
  }

  doLogout() {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}
