import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../../../shared/services/rest.service';
import { Categorie } from '../models/categorie.model';

@Injectable()
export class CategorieService extends RestService<Categorie> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('categories');
  }

  getAllCategories(profil: string): Observable<Categorie[]> {
    return this.http.get(this.getFullUrl(`/${profil}`))
      .map((res: Categorie[]) => {
        return res;
      })
      .catch(this.handleError);
  }
}
