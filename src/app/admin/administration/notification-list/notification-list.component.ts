import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SessionDataService } from '../../../core/session/session-data.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Notification } from '../../models/Notification.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit, OnDestroy {

  notifications: Notification[];
  isLoading = false;
  @ViewChild('grid') public grid;

  constructor(public notificationService: NotificationService,
              private alert: AlertService,
              private sessionDataService: SessionDataService) {

    this.notificationService.notificationListSubject.subscribe(
      res => {
        this.getNotifications();
      }
    );
  }

  ngOnInit() {
    this.getNotifications();
  }

  ngOnDestroy(): void {
    this.markAllSeen();
  }

  private getNotifications() {
    this.isLoading = true;
    this.notificationService.getAllOfUser(this.sessionDataService.getUser().id).subscribe(
      (resp: Notification[]) => {
        this.notifications = resp;
        this.isLoading = false;
        this.notificationService.notificationNumber = 0;
      },
      error => this.showError(error)
    );
  }

  private markAllSeen() {
    this.notificationService.markAllSeen(this.sessionDataService.getUser().id).subscribe(
      (resp) => {
      },
      error => this.showError(error)
    );
  }

  showError(error: any): any {
    this.alert.error(error);
  }
}
