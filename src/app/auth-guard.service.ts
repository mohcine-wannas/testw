import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { SessionService } from 'app/core/session/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public token: string;
  public jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router,
              private sessionService:SessionService) {}

  canActivate() {
    if(this.sessionService.isAuthenticated())
      return true;

    this.sessionService.logout(true);
      return false;
  }
}
