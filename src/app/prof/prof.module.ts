import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from 'app/shared/shared.module';
import { RegisterProfComponent } from './inscription/register-prof.component';

import { ProfRoutingModule } from './prof-routing.module';
import { ProfLayoutComponent} from './prof-layout/prof-layout.component';
import { ProfesseurService } from './shared/services/professeur.service';
import {ProfMessageParentFormComponent} from './prof-message-parent-form/prof-message-parent-form.component';
import {CommunicationProfesseurService} from './shared/services/communication-professeur.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfRoutingModule,
    SharedModule,
    ClarityModule
  ],
  declarations: [
    RegisterProfComponent,
    ProfLayoutComponent,
    ProfMessageParentFormComponent,
  ],
  providers: [
    ProfesseurService,
    CommunicationProfesseurService
  ]
})
export class ProfModule {
}
