import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { AuthGuard } from '../auth-guard.service';
import { ModelesMessageListComponent } from '../message-model/modeles-message-list/modeles-message-list.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ProfHistoriqueComponent } from './prof-historique/prof-historique.component';
import { ProfLayoutComponent } from './prof-layout/prof-layout.component';
import { ProfMessageParentFormComponent } from './prof-message-parent-form/prof-message-parent-form.component';
import { ProfMessagesComponent } from './prof-messages/prof-messages.component';


const routes: Routes = [
  {
    path: 'prof',
    component: ProfLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'message-models/list/category/:profil/:id', component: ModelesMessageListComponent },
      {
        path: 'communication', children: [
          { path: '', redirectTo: 'main', pathMatch: 'full' },
          { path: 'send-to-parent', component: ProfMessageParentFormComponent },
          { path: 'history', component: ProfHistoriqueComponent },
          { path: 'inbox', component: ProfMessagesComponent },
          { path: '**', component: PageNotFoundComponent },
        ]
      },
      { path: '**', component: PageNotFoundComponent },
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
