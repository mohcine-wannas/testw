import {Injectable} from "@angular/core";
import {SessionConstants} from "./session.constants";
import {Router} from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { AlertService } from "app/shared/services/alert.service";
@Injectable()
export class SessionTokenService {
  token: string;
  timeout: any; 

  constructor(private router : Router,
         public sessionConstants: SessionConstants,
         public alertService : AlertService) {}

  // create token
  create(token: any) {
    if (token !== this.token) {
      // cancel previous timer and delete the old token
      this.clear();

      // and renew
      this.token = token;
      if (this.isValid()) {
        localStorage.setItem(this.sessionConstants.TOKEN, token);
        let self = this;

        this.timeout = setInterval(function () {
          this.alertService.warning("Votre session est expiré");
          this.router.navigate(['/login']);
          this.clear();
        }, this.getExpirationTimestamp());
      }
      return true;
    }
    return false;
  };


  clear() {
    if (this.timeout) {
      clearInterval(this.timeout);
      this.timeout = null;
      if (localStorage) {
        localStorage.removeItem(this.sessionConstants.TOKEN);
      }
    }
  };

  get() {
    return this.token;
  };

  getExpirationTimestamp() {
    return this.getTimestamp(this.token) - (new Date()).getTime();
  };

  getTimestamp(token: any) {
    if (token) {
      let parts = token.split(':');
      if (parts.length === 3) {
        return parseInt(parts[1]);
      }
    }
    return NaN;
  }

  isValid() {
    let ts = this.getTimestamp(this.token);
    if (!isNaN(ts)) {
      let now = (new Date()).getTime();
      if (now < ts) {
        return true;
      }
    }
    return false;
  };

}


