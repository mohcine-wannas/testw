import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { RestService } from 'app/shared/services/rest.service';
import { Eleve } from 'app/admin/models/eleve.model';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ClasseService extends RestService<Eleve>{

  constructor(@Inject('API_URL') protected baseUrl: string,protected http: HttpClient) {
    super(baseUrl,http);
    super.setResource('classes');
 }

 getAllEleves(id : number): Observable<Eleve[]> {
  return this.http.get(this.getFullUrl('/'+ id +'/eleves/'))
    .map((res: Eleve[]) => {
      return res;
    })
    .catch(this.handleError);
  }

}
