import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { AuthHttp } from 'angular2-jwt';
import { Contact } from 'app/helper/models/Contact.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ContactService {

  constructor(@Inject('API_URL') private url: string, private http: AuthHttp) {
  }

  public getAll(): Observable<Contact[]> {
    return this.http.get(`${this.url}/contacts`)
      .map((res: Response) => {
        return res.json();
      });
  }

  public get(id: number): Observable<Contact> {
    return this.http.get(`${this.url}/contacts/${id}`)
      .map((res: Response) => {
        return res.json();
      });
  }

  public create(object: Contact): Observable<string> {

    return this.http.post(`${this.url}/contacts`, JSON.stringify(object))
      .map((res: Response) => {
        return res.json();
      });
  }

  public update(object: Contact): Observable<string> {
    return this.http.put(`${this.url}/contacts/${object.id}`, JSON.stringify(object))
      .map((res: Response) => {
        return res.json();
      });
  }

  public delete(id: number): Observable<string> {
    return this.http.delete(`${this.url}/contacts/${id}`)
      .map((res: Response) => {
        return res.json();
      });
  }

}
