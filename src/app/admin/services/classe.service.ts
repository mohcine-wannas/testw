import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Eleve } from 'app/admin/models/eleve.model';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ClasseService extends RestService<Eleve> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('classes');
  }

  getAllEleves(id: number): Observable<Eleve[]> {
    return this.http.get(this.getFullUrl('/' + id + '/eleves/'))
      .map((res: Eleve[]) => {
        return res;
      })
      .catch(this.handleError);
  }

}
