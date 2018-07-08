import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Professeur } from '../../prof/shared/models/Professeur.model';
import { User } from '../models/User.model';


@Injectable()
export class ProfesseurService extends RestService<User> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('professeurs');
  }

  passewordChange(id: number, object: any): Observable<void> {
    return this.http.put(this.getFullUrl('/' + id + '/password-change/'), JSON.stringify(object))
      .map((res: Number) => {
        return res;
      })
      .catch(this.handleError);
  }

  updateProfUnites(prof: Professeur): Observable<void> {
    return this.http.put(this.getFullUrl('/' + prof.id + '/unites'), JSON.stringify(prof))
      .map((res: number) => {
        return res;
      })
      .catch(this.handleError);
  }


  updateProfNivauxClasses(prof: Professeur): Observable<void> {
    return this.http.put(this.getFullUrl('/' + prof.id + '/niveaux-classes'), JSON.stringify(prof))
      .map((res: number) => {
        return res;
      })
      .catch(this.handleError);
  }

  getAllByCycleIdAndCurrentSchoolAndCurrentAnneScolaire(cycleId: number): Observable<Professeur[]> {
    return this.http.get(this.getFullUrl('/' + cycleId + '/cycle'))
      .map((res: Professeur[]) => {
        return res;
      })
      .catch(this.handleError);
  }
  enableAll(enabled: boolean): Observable<void> {
    return this.http.put(this.getFullUrl('/enable-all'), enabled)
      .map((res) => {
        return;
      })
      .catch(super.handleError);
  }

  enableProf(id: number, enabled: boolean): Observable<void> {
    return this.http.put(this.getFullUrl('/' + id + '/enable'), enabled)
      .map((res) => {
        return;
      })
      .catch(super.handleError);
  }

  autoSendProf(id: number, autoSend: boolean): Observable<void> {
    return this.http.put(this.getFullUrl('/' + id + '/auto-send'), autoSend)
      .map((res) => {
        return;
      })
      .catch(super.handleError);
  }
}
