import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cycle } from 'app/admin/models/cycle.model';
import { SessionDataService } from 'app/core/session/session-data.service';
import { SessionService } from 'app/core/session/session.service';
import { NotificationService } from '../../admin/services/notification.service';

@Component({
  selector: 'app-layout',
  templateUrl: './prof-layout.component.html',
  styleUrls: ['./prof-layout.component.css']
})
export class ProfLayoutComponent implements OnInit {

  collapsible = true;
  collapsed = true;
  cycles: Cycle[] = [];
  currentCycle: Cycle = new Cycle();

  notifNumber: number;

  constructor(private sessionService: SessionService,
              private sessionDataService: SessionDataService,
              private router: Router,
              private notificationService: NotificationService) {
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
    this.router.navigate(['prof/profile']);
  }

  getName() {
    return this.sessionDataService.getName();
  }

  getCurrentAnneScolaire() {
    return this.sessionDataService.getCurrentAnneScolaire();
  }

}
