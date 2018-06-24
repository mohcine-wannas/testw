import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Eleve} from '../models/eleve.model';
import {RestService} from '../../shared/services/rest.service';
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

  sendToProf(message: Message): Observable<void> {
    return this.http.post(this.getFullUrl('/sendToProf/'), message)
      .map(() => {
        return;
      })
      .catch(this.handleError);
  }

  getAllMessagesForValidation(): Observable<Message[]> {
    return this.http.get(this.getFullUrl('/not-validated/'))
      .map((resp) => {
        return resp;
      })
      .catch(this.handleError);
  }

  enable(id: number): Observable<void> {
    return this.http.put(this.getFullUrl('/' + id + '/enable/'), null)
      .map(() => {
        return;
      })
      .catch(this.handleError);
  }


}
