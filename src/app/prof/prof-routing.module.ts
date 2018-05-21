import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from 'clarity-angular';
import { RegisterProfComponent } from './inscription/register-prof.component';


const routes: Routes = [
  {
    path: 'prof',
    children: [
      { path: 'register', component: RegisterProfComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ClarityModule
  ],
  exports: [RouterModule]
})
export class ProfRoutingModule {
}
