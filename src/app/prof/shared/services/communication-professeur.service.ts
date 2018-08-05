import { Inject, Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { RestService} from '../../../shared/services/rest.service';
import { Message} from '../../../admin/models/message.model';

@Injectable()
export class CommunicationProfesseurService extends RestService<Message> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('messages/prof');
  }

  send(message: Message): Observable<void> {
    return this.http.post(this.getFullUrl('/send/'), message)
      .map(() => {
        return;
      })
      .catch(this.handleError);
  }

  getAllMessagesNotValid(): Observable<Message[]> {
    return this.http.get(this.getFullUrl('/not-validated/'))
      .map((resp) => {
        return resp;
      })
      .catch(this.handleError);
  }

  getAllValidMessages(): Observable<Message[]> {
    return this.http.get(this.getFullUrl('/validated/'))
      .map((resp) => {
        return resp;
      })
      .catch(this.handleError);
  }

  getAllRejectedMessages(): Observable<Message[]> {
    return this.http.get(this.getFullUrl('/rejected/'))
      .map((resp) => {
        return resp;
      })
      .catch(this.handleError);
  }

  getAllRecievedMessages(): Observable<Message[]> {
    return this.http.get(this.getFullUrl('/get-all/'))
      .map((resp) => {
        return resp;
      })
      .catch(this.handleError);
  }

  setToSeen(idAffectation: number): Observable<void> {
    return this.http.put(this.getFullUrl('/' + idAffectation + '/seen'),null)
      .map(() => {
        return ;
      })
      .catch(super.handleError);
  }
}

