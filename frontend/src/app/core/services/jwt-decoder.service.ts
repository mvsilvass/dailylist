import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from './local-storage.service';
import { JwtPayload } from './../models/jwt-payload';

@Injectable({
  providedIn: 'root',
})
export class JwtDecoderService {
  constructor(private storage: LocalStorageService) {}

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
