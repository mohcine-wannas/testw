import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: 'login/:user', component: LoginPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ClarityModule
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
