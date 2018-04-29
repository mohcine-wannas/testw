import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Unite } from '../models/unite.model';


@Injectable()
export class UniteService extends RestService<Unite> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('unites');
  }

  getUnitesByCycleId(cycleId: number): Observable<Unite[]> {
    return this.http.get(this.getFullUrl('/' + cycleId + '/cycle'))
      .catch(super.handleError);
  }
}
