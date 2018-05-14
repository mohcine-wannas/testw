import { Injectable } from '@angular/core';
import { School } from 'app/admin/models/school.model';
import { Subject } from 'rxjs/Subject';
import { SessionConstants } from './session.constants';

@Injectable()
export class SessionDataService {

  data: any;
  permissions: any;
  role: any;
  operations: any;
  schoolDetails: any;
  currentCycle: any;

  sessionDataSubject: Subject<number> = new Subject<number>();


  constructor(public sessionConstants: SessionConstants) {
  }

  create(data: any) {
    if (data) {
      this.data = data;
      this.schoolDetails = this.data.user.school;

      if (this.schoolDetails) {
        this.schoolDetails.cycles.forEach(element => {
          if (element.id === Number(this.schoolDetails.currentCycle)) {
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
  }

  getRoleLabel() {
    return this.role ? this.role.label : '';
  }

  getUserDetails() {
    return this.data.user.details;
  }

  getDefaultPage() {
    const page = 'home';
    return page;
  }

  getCurrentSchool(): School {
    return (this.schoolDetails.school) as School;
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

  getCurrentName() {
    return this.currentCycle;
  }

  getSchoolName(): string {
    const school: School = this.getCurrentSchool();
    return school.nom + ' : ' + school.code;
  }

  getUser() {
    return this.data.user;
  }

  updateSchool(school: School): any {
    this.schoolDetails.school.tel = school.tel;
    this.schoolDetails.school.tel2 = school.tel2;
    this.schoolDetails.school.email = school.email;
    this.schoolDetails.school.siteWeb = school.siteWeb;
  }
}

