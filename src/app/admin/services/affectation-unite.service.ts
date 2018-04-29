import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AffectationUnite } from '../models/affectation-unite.model';


@Injectable()
export class AffectationUniteService extends RestService<AffectationUnite> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('affectations-unite');
  }

  getAffectationsUniteByCycleId(cycleId: number): Observable<AffectationUnite[]> {
    return this.http.get(this.getFullUrl('/' + cycleId + '/cycle'))
      .catch(super.handleError);
  }


  updateAffectationsUnite(affectations: AffectationUnite[]): Observable<AffectationUnite[]> {
    return this.http.post(this.getFullUrl('/'), affectations)
      .catch(super.handleError);
  }
}
