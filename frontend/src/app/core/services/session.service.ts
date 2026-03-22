import { inject, Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { JwtDecoderService } from './jwt-decoder.service';
import { JwtPayload } from './../models/jwt-payload';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private storage = inject(LocalStorageService);
  private jwtDecoderService = inject(JwtDecoderService);

  private getPayload(): JwtPayload | null {
    return this.jwtDecoderService.decodeJwtPayload();
  }

  public isTokenExpired(): boolean {
    const payload = this.getPayload();
    if (!payload?.exp) return true;

    return Date.now() > payload.exp * 1000;
  }

  public isAuthenticated(): boolean {
    const payload = this.getPayload();

    if (!payload) return false;

    if (this.isTokenExpired()) {
      this.logout();
      return false;
    }

    return true;
  }

  public hasRole(role: string): boolean {
    const payload = this.getPayload();
    if (!payload?.scope) return false;

    return payload.scope.split(' ').includes(role);
  }

  public logout(): void {
    this.storage.remove('access_token');
  }
}
