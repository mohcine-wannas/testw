import {Headers, Response, Http} from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable, Inject} from "@angular/core";
import {Router} from "@angular/router";


@Injectable()
export class LoginService {
  private loggedIn = false;
  public resource: string = 'auth/authenticate';

  constructor(@Inject('API_URL') private url: string,private http: Http,private router : Router) {
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
    let applicationError = error.headers.get('Application-Error');
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

    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }
}
