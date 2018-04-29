import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../admin/services/user.service';
import { SessionDataService } from './session-data.service';
import { SessionTokenService } from './session-token.service';
import { SessionConstants } from './session.constants';

@Injectable()
export class SessionService {

  private data: any;
  private token: any;

  constructor(public router: Router,
              public sessionDataService: SessionDataService,
              public sessionTokenService: SessionTokenService,
              public sessionConstants: SessionConstants,
              public userService: UserService) {
  }

  // create session
  create(data: any): boolean {
    this.clear();
    if (data && data.user) {
      //save data of session in localStorage
      localStorage.setItem(this.sessionConstants.SESSION, JSON.stringify(data));
      this.data = data;
      // create instance of SessionData if given data are valid
      this.sessionDataService.create(data);
      if (data.token) {
        this.token = data.token;
        this.sessionTokenService.create(data.token);
        if (this.sessionTokenService.isValid()) {
          this.router.navigate([this.sessionDataService.getDefaultPage()]);
          return true;
        }
      }
    }
    return false;
  }

  logout(goToLoginPage?: boolean) {
    this.userService.clearFcmToken(this.sessionDataService.getUser().id).subscribe(
      res => {
      },
      err => console.log(err)
    );
    this.clear();
    if (goToLoginPage) {
      this.router.navigate(['/login']);
    }
  }

  // clear timeout and removed session data
  clear() {
    this.sessionTokenService.clear();
    this.sessionDataService.clear();
  }

  load() {
    if (localStorage) {
      if (localStorage.getItem(this.sessionConstants.SESSION)) {
        this.create(JSON.parse(localStorage.getItem(this.sessionConstants.SESSION)));
      }
    }
  }

  isAuthenticated() {
    return this.data && this.token && this.sessionTokenService.isValid();
  }

}
