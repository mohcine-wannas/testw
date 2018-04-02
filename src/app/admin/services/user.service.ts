import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from 'app/admin/models/User.model';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService extends RestService<User> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('users');
  }

  passewordChange(object: any): Observable<void> {
    return this.http.put(this.getFullUrl('/current/password-change/'), JSON.stringify(object))
      .map((res: Number) => {
        return res;
      })
      .catch(this.handleError);
  }

}
