import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import { Contact } from 'app/helper/models/Contact.model';
import { AuthHttp } from 'angular2-jwt';
import { RestService } from 'app/shared/services/rest.service';
import { School } from 'app/admin/models/school.model';
import { HttpClient } from '@angular/common/http';
import { Cycle } from 'app/admin/models/cycle.model';
import { GroupeAppellation } from 'app/admin/models/groupe-appellation.model';


@Injectable()
export class CycleService extends RestService<Cycle>{
  
  constructor(@Inject('API_URL') protected baseUrl: string,protected http: HttpClient) {
    super(baseUrl,http);
    super.setResource('cycles');
 }

 getAllGroupeAppellation(): Observable<GroupeAppellation[]> {
  return this.http.get(this.getFullUrl('/groupes-appellations/'))
    .map((res: GroupeAppellation[]) => {
      return res;
    })
    .catch(this.handleError);
  }

}