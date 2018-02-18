import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import { Contact } from 'app/helper/models/Contact.model';
import { AuthHttp } from 'angular2-jwt';
import { RestService } from 'app/shared/services/rest.service';
import { School } from 'app/admin/models/school.model';
import { HttpClient } from '@angular/common/http';
import { AffectationCycle } from 'app/admin/models/affectation-cycle.model';



@Injectable()
export class AffectationCycleService extends RestService<AffectationCycle>{

  constructor(@Inject('API_URL') protected baseUrl: string,protected http: HttpClient) {
    super(baseUrl,http);
    super.setResource('affectation-cycle');
 }


getCurrentAffectationCycle():Observable<AffectationCycle>  {
  return this.http.get(this.getFullUrl('/'))
    .map((res: AffectationCycle) => {
      return res;
    })
    .catch(this.handleError);
}
save(model: AffectationCycle):Observable<Number> {
  return this.http.put(this.getFullUrl('/'),model)
  .map((res: Number) => {
    return res;
  })
  .catch(this.handleError);
}


}
