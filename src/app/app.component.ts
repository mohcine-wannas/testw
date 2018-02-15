import { Component, Inject } from '@angular/core';
import { SessionService } from 'app/core/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(@Inject('API_URL') private url: string,
              private sessionService : SessionService) {
    this.sessionService.load();
    console.log(this.url);
  }
}
