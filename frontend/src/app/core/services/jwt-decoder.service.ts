import { inject, Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { JwtPayload } from './../models/jwt-payload';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtDecoderService {
  private storage = inject(LocalStorageService);

  public getToken(): string | null {
    return this.storage.get('access_token');
  }

  public decodeJwtPayload(): JwtPayload | null {
    const token = this.getToken();

    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      this.storage.remove('access_token');
      return null;
    }
  }
}
