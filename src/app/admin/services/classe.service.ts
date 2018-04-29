import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
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

  postMassarFile(id: number, formData: FormData): Observable<number> {
    const headers = new HttpHeaders().set('Content-Type', '');
    return this.http
      .post(this.getFullUrl('/' + id + '/upload'), formData, { headers: headers }).map((res: Response) => {
        return res;
      }).catch(this.handleError);
  }
}
