import { Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionTokenService } from 'app/core/session/session-token.service';
import { SessionDataService } from 'app/core/session/session-data.service';

@Injectable()
export class HttpInterceptorImpl implements HttpInterceptor {
    constructor(private sessionTokenService: SessionTokenService,
                private sessionDataService: SessionDataService) { }
    
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            console.log(JSON.stringify(req));
    
            const token: string = this.sessionTokenService.token;
            let  currentCycle = '';
            if(this.sessionDataService && this.sessionDataService.schoolDetails) {
               currentCycle =this.sessionDataService.schoolDetails.currentCycle;
            }
    
            if (token) {
                req = req.clone({ headers: req.headers.set('X-Auth-Token', token) });
            }
    
            if (!req.headers.has('Content-Type')) {
                req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
            }

            if (currentCycle && !req.headers.has('x-current-cycle')) {
                req = req.clone({ headers: req.headers.set('x-current-cycle', String(currentCycle)) });
            }
    
            req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
            return next.handle(req).map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && ~((event as HttpResponse<any>).status / 100) > 3) {
                  console.info('HttpResponse::event =', event, ';');
                } else console.info('event =', event, ';');
                return event;
              })
              .catch((err: any, caught) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 403) {
                    console.info('err.error =', err.error, ';');
                  }
                  return Observable.throw(err);
                }
              });;
        }
}