import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { RestService } from '../../shared/services/rest.service';
import { Notification } from '../models/Notification.model';

@Injectable()
export class NotificationService extends RestService<Notification> {

  notificationSubject: Subject<number> = new Subject<number>();
  _notificationNumber: number;

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('notifications');
  }

  get notificationNumber() {
    return this._notificationNumber;
  }

  set notificationNumber(value: number) {
    this.notificationSubject.next(value);
    this._notificationNumber = value;
  }

  getNotSeenNumber(id): Observable<any> {
    return this.http.get(this.getFullUrl('/' + id + '/number'))
      .catch(super.handleError);
  }

  getAllOfUser(id): Observable<Notification[]> {
    return this.http.get(this.getFullUrl('/' + id))
      .catch(super.handleError);
  }

  markAllSeen(id): Observable<any> {
    return this.http.get(this.getFullUrl('/' + id + '/seen/all'))
      .catch(super.handleError);
  }

  markAsSeen(id): Observable<any> {
    return this.http.get(this.getFullUrl('/' + id + '/seen'))
      .catch(super.handleError);
  }

}
