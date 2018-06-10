import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AffectationCycle } from 'app/admin/models/affectation-cycle.model';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AffectationCycleService extends RestService<AffectationCycle> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('affectation-cycle');
  }


  getCurrentAffectationCycle(): Observable<AffectationCycle> {
    return this.http.get(this.getFullUrl('/'))
      .map((res: AffectationCycle) => {
        return res;
      })
      .catch(this.handleError);
  }

  getCurrentAffectationCycleForProf(): Observable<AffectationCycle> {
    return this.http.get(this.getFullUrl('/prof'))
      .map((res: AffectationCycle) => {
        return res;
      })
      .catch(this.handleError);
  }
  save(model: AffectationCycle): Observable<Number> {
    return this.http.put(this.getFullUrl('/'), model)
      .map((res: Number) => {
        return res;
      })
      .catch(this.handleError);
  }

  getAffectationCycleBySchoolCodeAndByCycleId(schoolCode: string, cycleId: number): Observable<AffectationCycle> {
    return this.http.get(this.getFullUrl('/' + schoolCode + '/school/' + cycleId + '/cycle'))
      .map((res: AffectationCycle) => {
        return res;
      })
      .catch(this.handleError);
  }

}
