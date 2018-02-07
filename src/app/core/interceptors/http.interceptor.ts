import { Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionTokenService } from 'app/core/session/session-token.service';

@Injectable()
export class HttpInterceptorImpl implements HttpInterceptor {
    constructor(private sessionTokenService: SessionTokenService) { }
    
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            console.log(JSON.stringify(req));
    
            const token: string = this.sessionTokenService.token;
    
            if (token) {
                req = req.clone({ headers: req.headers.set('X-Auth-Token', token) });
            }
    
            if (!req.headers.has('Content-Type')) {
                req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
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