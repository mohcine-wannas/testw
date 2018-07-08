import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Eleve } from 'app/admin/models/eleve.model';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EleveService extends RestService<Eleve> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('eleves');
  }

  enableParent(id: number, enabled: boolean): Observable<void> {
    return this.http.put(this.getFullUrl('/' + id + '/enable'), enabled)
      .map((res) => {
        return;
      })
      .catch(super.handleError);
  }

  enableEleve(id: number, enabled: boolean): Observable<void> {
    return this.http.put(this.getFullUrl('/' + id + '/enable-eleve'), enabled)
      .map((res) => {
        return;
      })
      .catch(super.handleError);
  }

  enableAll(enabled: boolean): Observable<void> {
    return this.http.put(this.getFullUrl('/enable-all'), enabled)
      .map((res) => {
        return;
      })
      .catch(super.handleError);
  }
}
