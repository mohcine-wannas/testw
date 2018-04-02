import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { School } from 'app/admin/models/school.model';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';


@Injectable()
export class SchoolService extends RestService<School> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('ecoles');
  }
}
