import { Inject, Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { Eleve} from '../models/eleve.model';
import { RestService} from '../../shared/services/rest.service';
import {Message} from '../models/message.model';

@Injectable()
export class CommunicationAdministrationService extends RestService<Eleve> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('messages/admin');
  }

  send(message: Message): Observable<void> {
    return this.http.post(this.getFullUrl('/send/'), message)
      .map(() => {
        return;
      })
      .catch(this.handleError);
  }


}
