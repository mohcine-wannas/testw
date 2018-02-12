import {Injectable} from "@angular/core";
import {SessionConstants} from "./session.constants";
import { School } from "app/admin/models/school.model";
@Injectable()
export class SessionDataService {

  data: any;
  permissions: any;
  role: any;
  operations: any;
  schoolDetails: any;
  currentCycle : any;
  
  constructor(public sessionConstants: SessionConstants) {}

  create(data: any) {
    if (data) {
      this.data = data;
      this.schoolDetails = this.data.user.school;
      
      if(this.schoolDetails) {
          this.schoolDetails.cycles.forEach(element => {
            if(element.id === Number(this.schoolDetails.currentCycle)) {
              this.currentCycle = element;
            }
          });
      }
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

  getCurrentSchool() : School {
    return  <School>(this.schoolDetails.school);
  }

  getCurrentAnneScolaire() {
    return this.schoolDetails.anneeScolaire;
  }

  getCycles() {
    return this.schoolDetails.cycles;
  }

  getCurrentCycle() {
    return this.currentCycle;
  }

  getSchoolName() : string {
    let school :School = this.getCurrentSchool();
    return school.nom + ' : ' + school.codeMassar;
  }
}

