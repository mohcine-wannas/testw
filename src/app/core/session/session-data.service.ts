import {Injectable} from "@angular/core";
import {SessionConstants} from "./session.constants";
@Injectable()
export class SessionDataService {

  data: any;
  permissions: any;
 // organization: any;
  role: any;
  operations: any;

  constructor(
         //     public organizationConstants: OrganizationConstants,
              public sessionConstants: SessionConstants) {}

  create(data: any) {
    if (data) {
      this.data = data;
    }
  }

  
  clear() {
    if (localStorage) {
      this.data = null;
      localStorage.removeItem(this.sessionConstants.SESSION);
    }
  }

  getName() {
    return this.data.user.firstname + ' ' + this.data.user.lastname;
  };

  getRoleLabel() {
    return this.role ? this.role.label : "";
  };

  getUserDetails() {
    return this.data.user.details;
  };

  getDefaultPage() {
    var page = 'home';

    return page;
  };

}

