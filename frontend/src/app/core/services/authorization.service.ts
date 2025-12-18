import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private storage: LocalStorageService) {}

  isAuthenticated(): boolean {
    return !!this.storage.get('access-token');
  }

  // to do hasRole()/isAuthorized

}
