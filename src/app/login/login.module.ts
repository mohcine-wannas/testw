import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { LoginPageComponent } from './login-page/login-page.component';

import { LoginRoutingModule } from './login-routing.module';

import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    SharedModule,
    ClarityModule
  ],
  declarations: [LoginPageComponent],
  providers: [LoginService]
})
export class LoginModule {
}
