import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { AngularFireModule } from 'angularfire2';
import { HttpInterceptorImpl } from 'app/core/interceptors/http.interceptor';
import { ServiceLocator } from 'app/shared/services/service-locator.service';
import { SharedModule } from 'app/shared/shared.module';


import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { MessagingService } from './admin/services/messaging.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';

import { LoginModule } from './login/login.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    AppRoutingModule,
    LoginModule,
    AdminModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    AuthGuard,
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorImpl, multi: true },
    MessagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
