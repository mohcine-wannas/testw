import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseModel } from 'app/shared/models/base-model.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


export interface IServerResponse {
  data: string[];
  totalItems: number;
}

@Injectable()
export class RestService<T extends BaseModel> {

  public resource = '';

  constructor(@Inject('API_URL') protected baseUrl: string, protected http: HttpClient) {
  }

  setResource(resource: string) {
    this.resource = resource;
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.getFullUrl('/'))
      .map((res: T[]) => {
        return res;
      })
      .catch(this.handleError);
  }

  get(id: string): Observable<T> {
    return this.http.get(this.getFullUrl('/' + id))
      .map((res: T) => {
        return res;
      })
      .catch(this.handleError);
  }

  create(object: T): Observable<T> {

    return this.http.post(this.getFullUrl('/'), JSON.stringify(object))
      .map((res: number) => {
        return res;
      })
      .catch(this.handleError);
  }

  update(object: T): Observable<void> {
    return this.http.put(this.getFullUrl('/' + object.id), JSON.stringify(object))
      .map((res: T) => {
        return res;
      })
      .catch(this.handleError);
  }

  createOrUpdate(object: T): Observable<void> {
    return this.http.put(this.getFullUrl('/'), JSON.stringify(object))
      .map((res: any) => {
        return res;
      })
      .catch(this.handleError);
  }

  delete(id: number): Observable<void> {
    return this.http.delete(this.getFullUrl('/' + id))
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  deleteObject(object: T): Observable<void> {
    return this.delete(object.id);
  }

  list(object: any): Observable<IServerResponse> { //TODO make interface
    return this.http.post(this.getFullUrl('/list'), JSON.stringify(object))
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  getColumnDef(): Observable<any> {

    return this.http.get(this.getFullUrl('/columnDef'))
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  protected handleError(error: any) {
    /* let applicationError = error.headers.get('Application-Error');
     let serverError = error.json();
     let modelStateErrors: string = '';

     if (!serverError.type) {
       console.log(serverError);
       serverError.forEach( key => {
         if(serverError[key]){
           modelStateErrors += serverError[key] + `\n`;
         }
       });
     }

     modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

     return Observable.throw(applicationError || modelStateErrors || 'Server error');*/
    return Observable.throw(error);
  }

  protected getFullUrl(url: string): string {
    return this.baseUrl + this.resource + url;
  }


  // upload(id: String,formData:FormData): Observable<any> {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http
  //     .post(this.getFullUrl( '/' + id +"/upload") , formData, options).map((res: Response) => {
  //       return;
  //     }).catch(this.handleError);
  // }


  // exportExcel(object: any): Observable<IServerResponse> {

  //   let options = new RequestOptions();
  //   options.responseType = ResponseContentType.Blob;
  //   return this.http.post(this.getFullUrl( "/export"), JSON.stringify(object), options)
  //     .map((res: any) => {

  //       const blob = new Blob([res._body],
  //         { type: 'application/vnd.ms-excel' });
  //       const file = new File([blob], 'report.xls',
  //         { type: 'application/vnd.ms-excel' });

  //       FileSaver.saveAs(file);
  //     })
  //     .catch(this.handleError);
  // }


}
