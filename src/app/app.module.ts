import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ClarityModule } from 'clarity-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToastyModule } from 'ng2-toasty';
import { SharedModule } from 'app/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorImpl } from 'app/core/interceptors/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClarityModule.forRoot(),
    AppRoutingModule,
    LoginModule,
    AdminModule,
    SharedModule
  ],
  providers: [
    AuthGuard,
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorImpl, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
