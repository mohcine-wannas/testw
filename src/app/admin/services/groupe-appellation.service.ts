import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GroupeAppellation } from 'app/admin/models/groupe-appellation.model';
import { RestService } from 'app/shared/services/rest.service';
import 'rxjs/add/operator/map';


@Injectable()
export class GroupeAppellationService extends RestService<GroupeAppellation> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('groupe-appellation');
  }
}
