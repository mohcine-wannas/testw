import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Cycle } from 'app/admin/models/cycle.model';
import { GroupeAppellation } from 'app/admin/models/groupe-appellation.model';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CycleService extends RestService<Cycle> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('cycles');
  }

  getAllGroupeAppellation(): Observable<GroupeAppellation[]> {
    return this.http.get(this.getFullUrl('/groupes-appellations/'))
      .map((res: GroupeAppellation[]) => {
        return res;
      })
      .catch(this.handleError);
  }

  getCyclesBySchoolCode(schoolCode: string): Observable<Cycle[]> {
    return this.http.get(this.getFullUrl('/' + schoolCode + '/school'))
      .map((res: Cycle[]) => {
        return res;
      })
      .catch(this.handleError);
  }

}
