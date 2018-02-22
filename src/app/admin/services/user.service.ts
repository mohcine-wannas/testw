import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import { Contact } from 'app/helper/models/Contact.model';
import { AuthHttp } from 'angular2-jwt';
import { RestService } from 'app/shared/services/rest.service';
import { School } from 'app/admin/models/school.model';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UserService extends RestService<School>{

  constructor(@Inject('API_URL') protected baseUrl: string,protected http: HttpClient) {
    super(baseUrl,http);
    super.setResource('users');
 }
 
 passewordChange(object: any): Observable<void> {
  return this.http.put(this.getFullUrl( '/current/password-change/'), JSON.stringify(object))
    .map((res : Number) => { 
      return res;
    })
    .catch(this.handleError);
}

}
