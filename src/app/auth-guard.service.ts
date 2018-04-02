import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from 'app/core/session/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private sessionService: SessionService) {
  }

  canActivate() {
    if (this.sessionService.isAuthenticated()) {
      return true;
    }
    this.sessionService.logout(true);
    return false;
  }
}
