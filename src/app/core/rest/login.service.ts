import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LoginService {
  private loggedIn = false;
  public resource = 'auth/authenticate';

  constructor(@Inject('API_URL') private url: string, private http: Http, private router: Router) {
    this.loggedIn = !!localStorage.getItem('token');
  }

  login(credentials: any) {
    return this.http.post(this.url + this.resource, JSON.stringify(credentials))
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    const serverError = error.json();
    let modelStateErrors = '';

    if (!serverError.type) {
      //console.log(serverError);
      serverError.forEach(key => {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + `\n`;
        }
      });
    }

    modelStateErrors = modelStateErrors === '' ? null : modelStateErrors;

    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }
}
