import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cycle } from 'app/admin/models/cycle.model';
import { SessionDataService } from 'app/core/session/session-data.service';
import { SessionService } from 'app/core/session/session.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  fullname: string;
  collapsible = true;
  collapsed = true;
  cycles: Cycle[] = [];
  currentCycle: Cycle = new Cycle();

  notifNumber: number;

  constructor(private sessionService: SessionService,
              private sessionDataService: SessionDataService,
              private router: Router,
              private notificationService: NotificationService) {
    this.fullname = sessionDataService.getSchoolName();
    this.cycles = sessionDataService.schoolDetails.cycles;
    this.notificationService.notificationSubject.subscribe(
      res => this.notifNumber = res
    );
  }

  ngOnInit() {
    if (this.sessionService.isAuthenticated()) {
      this.notificationService.getNotSeenNumber(this.sessionDataService.getUser().id).subscribe(
        res => {
          this.notificationService.notificationNumber = res;
        }
      );
    }
  }

  logout() {
    this.sessionService.logout(true);
  }

  goToProfile() {
    this.router.navigate(['admin/profile']);
  }

  currentCycleChanged(cycle: Cycle) {
    this.currentCycle = cycle;
    this.sessionDataService.schoolDetails.currentCycle = this.currentCycle.id;
    this.sessionDataService.sessionDataSubject.next(this.currentCycle.id);
  }

  getCurrentCycleLibelle() {
    this.cycles.forEach(e => {
      if (e.id === Number(this.sessionDataService.schoolDetails.currentCycle)) {
        this.currentCycle = e;
      }
    });
    return this.currentCycle.libelle;
  }

  getSchoolName() {
    return this.sessionDataService.getSchoolName();
  }

  getCurrentAnneScolaire() {
    return this.sessionDataService.getCurrentAnneScolaire();
  }

}
