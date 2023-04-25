import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private lastActivityTime: number;

  constructor() {
    this.lastActivityTime = Date.now();
  }

  public updateLastActivityTime(): void {
    this.lastActivityTime = Date.now();
  }

  public isUserInactive(): boolean {
    return Date.now() - this.lastActivityTime > 30000;
  }


}
