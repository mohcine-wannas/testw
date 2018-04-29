import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { SessionDataService } from '../../core/session/session-data.service';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';

@Injectable()
export class MessagingService {

  messaging;

  constructor(@Inject(FirebaseApp) private af, private userService: UserService,
              private sessionDataService: SessionDataService,
              private notificationService: NotificationService) {
    this.messaging = firebase.messaging(af);
  }

  updateToken(token) {
    this.userService.setFcmToken(this.sessionDataService.getUser().id, { token: token }).subscribe(
      res => {
      },
      err => console.log(err)
    );
  }

  getPermissison() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  tokenRefresh() {
    this.messaging.onTokenRefresh(
      this.messaging.getToken().then(token => {
        if (token) {
          this.updateToken(token);
        }
      })
    );
  }

  receiveMessage() {
    console.log('Setting listener');
    this.messaging.onMessage((payload) => {
      this.notificationService.notificationNumber++;
      console.log(payload);
    });
  }
}
