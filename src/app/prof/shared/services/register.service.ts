import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AffectationCycle } from '../../../admin/models/affectation-cycle.model';
import { AffectationUnite } from '../../../admin/models/affectation-unite.model';
import { Cycle } from '../../../admin/models/cycle.model';
import { User } from '../../../admin/models/User.model';


@Injectable()
export class RegisterService extends RestService<User> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('__register');
  }

  validateCodeSchool(codeSchool: string): Observable<Boolean> {
    return this.http.get(this.getFullUrl('/' + codeSchool + '/register-validate'))
      .catch(super.handleError);
  }

  getCyclesBySchoolCode(schoolCode: string): Observable<Cycle[]> {
    return this.http.get(this.getFullUrl('/cycles/' + schoolCode + '/school'))
      .map((res: Cycle[]) => {
        return res;
      })
      .catch(this.handleError);
  }

  getAffectationsUniteBySchoolCodeAndByCycleId(schoolCode: string, cycleId: number): Observable<AffectationUnite[]> {
    return this.http.get(this.getFullUrl('/unites/' + schoolCode + '/school/' + cycleId + '/cycle'))
      .map((res: AffectationUnite[]) => {
        return res;
      })
      .catch(this.handleError);
  }

  getAffectationCycleBySchoolCodeAndByCycleId(schoolCode: string, cycleId: number): Observable<AffectationCycle> {
    return this.http.get(this.getFullUrl('/affectation-cycle/' + schoolCode + '/school/' + cycleId + '/cycle'))
      .map((res: AffectationCycle) => {
        return res;
      })
      .catch(this.handleError);
  }

}
