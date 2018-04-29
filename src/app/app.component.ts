import { Component, Inject } from '@angular/core';
import { SessionService } from 'app/core/session/session.service';
import { MessagingService } from './admin/services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(@Inject('API_URL') private url: string,
              private sessionService: SessionService, public messagingService: MessagingService) {
    this.messagingService.receiveMessage();
    this.sessionService.load();
    if (this.sessionService.isAuthenticated()) {
      this.messagingService.getPermissison();
      //this.messagingService.tokenRefresh();
    }
  }
}
