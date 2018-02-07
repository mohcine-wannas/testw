import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthModule } from '../auth/auth.module';

import { MainService } from './main.service';
import { LayoutComponent } from './layout/layout.component';
import { ContactService } from 'app/admin/contact.service';
import { ContactListComponent } from 'app/admin/contact-list/contact-list.component';
import { ContactFormComponent } from 'app/admin/contact-form/contact-form.component';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileMainComponent } from 'app/admin/profile/profile-main/profile-main.component';
import { ProfileLayoutComponent } from 'app/admin/profile/Profil-layout/profile-layout.component';
import { SchoolInfoComponent } from 'app/admin/profile/school-info/school-info.component';
import { PasswordChangeComponent } from 'app/admin/profile/password-change/password-change.component';
import { ProfileRoutingModule } from 'app/admin/profile/profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ClarityModule,
    AuthModule,
    SharedModule
  ],
  declarations: [
    ProfileMainComponent,
    ProfileLayoutComponent,
    SchoolInfoComponent,
    PasswordChangeComponent],
  providers: [
    MainService,
    ContactService
  ]
})
export class AdminModule { }
