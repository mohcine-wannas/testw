import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { RestService } from 'app/shared/services/rest.service';
import { Eleve } from 'app/admin/models/eleve.model';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class EleveService extends RestService<Eleve>{

  constructor(@Inject('API_URL') protected baseUrl: string,protected http: HttpClient) {
    super(baseUrl,http);
    super.setResource('eleves');
 }

 enableParent(id : number, enabled : boolean): Observable<void> {
  return this.http.put(this.getFullUrl('/'+ id +'/enable'),enabled)
    .map((res) => {
      return;
    })
    .catch(super.handleError);
  }

}
