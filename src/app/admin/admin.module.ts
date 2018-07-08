import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { EleveListComponent } from 'app/admin/administration/eleves-list/eleve-list.component';
import { GestionClassesComponent } from 'app/admin/administration/gestion-classes/gestion-classes.component';
import { ReferentielLayoutComponent } from 'app/admin/administration/referentiel-layout/referentiel-layout.component';
import { ContactFormComponent } from 'app/admin/contact-form/contact-form.component';
import { ContactListComponent } from 'app/admin/contact-list/contact-list.component';
import { ContactService } from 'app/admin/contact.service';
import { PasswordChangeComponent } from 'app/admin/profile/password-change/password-change.component';
import { ProfileMainComponent } from 'app/admin/profile/profile-main/profile-main.component';
import { SchoolInfoComponent } from 'app/admin/profile/school-info/school-info.component';
import { ProfileLayoutComponent } from 'app/admin/profile/Profile-layout/profile-layout.component';
import { AffectationCycleService } from 'app/admin/services/affectation-cycle.service';
import { ClasseService } from 'app/admin/services/classe.service';
import { CycleService } from 'app/admin/services/cycle.service';
import { EleveService } from 'app/admin/services/eleve.service';
import { SchoolService } from 'app/admin/services/school.service';
import { UserService } from 'app/admin/services/user.service';
import { SharedModule } from 'app/shared/shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { TreeviewModule } from 'ngx-treeview';
import { AdminRoutingModule } from './admin-routing.module';
import { AffectationUniteComponent } from './administration/affectation-unite/affectation-unite.component';
import { LazLoadedElevesComponent } from './administration/message-parent-form/laz-loaded-eleves.component';
import { MessageParentFormComponent } from './administration/message-parent-form/message-parent-form.component';
import { NotificationListComponent } from './administration/notification-list/notification-list.component';
import { ProfsListComponent } from './administration/profs-list/profs-list.component';
import { LayoutComponent } from './layout/layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainService } from './main.service';
import { AffectationUniteService } from './services/affectation-unite.service';
import { CommunicationAdministrationService } from './services/communication-administration.service';
import { NotificationService } from './services/notification.service';
import { ProfesseurService } from './services/professeur.service';
import { UniteService } from './services/unite.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ClarityModule,
    SharedModule,
    NgxEditorModule,
    TreeviewModule.forRoot(),
  ],
  declarations: [
    MainPageComponent,
    LayoutComponent,
    ContactListComponent,
    ContactFormComponent,
    LayoutComponent,
    ProfileMainComponent,
    ProfileLayoutComponent,
    SchoolInfoComponent,
    PasswordChangeComponent,
    GestionClassesComponent,
    ReferentielLayoutComponent,
    EleveListComponent,
    NotificationListComponent,
    AffectationUniteComponent,
    MessageParentFormComponent,
    LazLoadedElevesComponent,
    ProfsListComponent
  ],
  providers: [
    MainService,
    ContactService,
    SchoolService,
    CycleService,
    UserService,
    AffectationCycleService,
    UserService,
    EleveService,
    ClasseService,
    NotificationService,
    UniteService,
    AffectationUniteService,
    CommunicationAdministrationService,
    ProfesseurService
  ]
})
export class AdminModule {
}
