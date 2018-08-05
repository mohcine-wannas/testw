import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Eleve} from '../models/eleve.model';
import {RestService} from '../../shared/services/rest.service';
import {Message} from '../models/message.model';
import {View} from "../models/view.model";

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


  getAllMessagesProfToParent(): Observable<Message[]> {
    return this.getAllMessagesByMessageDestinationType('PROFESSEUR_TO_PARENT');
  }
  getAllMessagesAdminToParent(): Observable<Message[]> {
    return this.getAllMessagesByMessageDestinationType('ADMINISTRATION_TO_PARENT');
  }
  getAllMessagesAdminToProf(): Observable<Message[]> {
    return this.getAllMessagesByMessageDestinationType('ADMINISTRATION_TO_PROF');
  }

  private getAllMessagesByMessageDestinationType(type) {
    return this.http.get(this.getFullUrl('/get-all/' + type))
      .map((resp) => {
        return resp;
      })
      .catch(this.handleError);
  }

  getViewsDetails(id: number): Observable<View[]> {
    return this.http.get(this.getFullUrl('/' + id + '/views'))
      .map((resp) => {
        return resp;
      })
      .catch(this.handleError);
  }

  reject(id: number): Observable<void> {
    return this.http.put(this.getFullUrl('/' + id + '/reject'),null)
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }
}
