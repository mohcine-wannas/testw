import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EleveListComponent } from 'app/admin/administration/eleves-list/eleve-list.component';
import { GestionClassesComponent } from 'app/admin/administration/gestion-classes/gestion-classes.component';
import { ReferentielLayoutComponent } from 'app/admin/administration/referentiel-layout/referentiel-layout.component';
import { ContactFormComponent } from 'app/admin/contact-form/contact-form.component';
import { ContactListComponent } from 'app/admin/contact-list/contact-list.component';
import { PasswordChangeComponent } from 'app/admin/profile/password-change/password-change.component';
import { ProfileLayoutComponent } from 'app/admin/profile/Profile-layout/profile-layout.component';
import { SchoolInfoComponent } from 'app/admin/profile/school-info/school-info.component';
import { AuthGuard } from '../auth-guard.service';
import { ModelesMessageListComponent } from '../message-model/modeles-message-list/modeles-message-list.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AffectationUniteComponent } from './administration/affectation-unite/affectation-unite.component';
import { MessageParentFormComponent } from './administration/message-parent-form/message-parent-form.component';
import { MessageProfesseurFormComponent } from './administration/message-prof-form/message-prof-form.component';
import { NotificationListComponent } from './administration/notification-list/notification-list.component';
import { ProfsListComponent } from './administration/profs-list/profs-list.component';
import { SendingValidationComponent } from './administration/sending-validation/sending-validation.component';
import { LayoutComponent } from './layout/layout.component';
// pages
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainPageComponent },
      { path: 'contacts/:id/:state', component: ContactFormComponent },
      { path: 'contacts/:state', component: ContactFormComponent },
      { path: 'contacts', component: ContactListComponent },
      { path: 'notifications', component: NotificationListComponent },
      { path: 'message-models/list/category/:profil/:id', component: ModelesMessageListComponent },
      {
        path: 'profile', component: ProfileLayoutComponent, children: [
          { path: '', redirectTo: 'ecole', pathMatch: 'full' },
          { path: 'ecole', component: SchoolInfoComponent },
          { path: 'password-change', component: PasswordChangeComponent },
          { path: '**', component: PageNotFoundComponent },
        ]
      },
      {
        path: 'gestion', component: ReferentielLayoutComponent, children: [
          { path: '', redirectTo: 'ecole', pathMatch: 'full' },
          { path: 'classes', component: GestionClassesComponent },
          { path: 'eleves', component: EleveListComponent },
          { path: 'unites', component: AffectationUniteComponent },
          { path: 'professeurs', component: ProfsListComponent },
          { path: '**', component: PageNotFoundComponent },
        ]
      },
      {
        path: 'communication', component: ReferentielLayoutComponent, children: [
          { path: '', redirectTo: 'main', pathMatch: 'full' },
          { path: 'send-to-parent', component: MessageParentFormComponent },
          { path: 'send-to-prof', component: MessageProfesseurFormComponent },
          { path: 'validation-envois', component: SendingValidationComponent },
          { path: '**', component: PageNotFoundComponent },
        ]
      },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
