import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../../../shared/services/rest.service';
import { MessageModel } from '../models/message-model.model';

@Injectable()
export class MessageModelService extends RestService<MessageModel> {

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
    super(baseUrl, http);
    super.setResource('message-models');
  }

  getMessageModelsByCategorieId(id: number, profil: string): Observable<MessageModel[]> {
    return this.http.get(this.getFullUrl(`/category-${profil}/${id}`))
      .map((res: MessageModel[]) => {
        return res;
      })
      .catch(this.handleError);
  }

}
