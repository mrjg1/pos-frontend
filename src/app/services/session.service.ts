import { Injectable, Inject } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
@Injectable()
export class SessionService {

  constructor(private session: SessionStorageService) { }

  setSessionAttribute(key: string, val: any): void {
    this.session.set(key, val);
  }
  getSessionAttribute(key: string): any {
    return this.session.get(key);
  }
  removeSessionAttribute(key: string): void {
    this.session.remove(key);
  }
  clearSession(): void {
    this.session.clear();
  }
}
