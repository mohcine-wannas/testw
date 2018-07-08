import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from 'app/shared/shared.module';
import { RegisterProfComponent } from './inscription/register-prof.component';
import { ProfHistoriqueComponent } from './prof-historique/prof-historique.component';
import { ProfLayoutComponent } from './prof-layout/prof-layout.component';
import { ProfMessageParentFormComponent } from './prof-message-parent-form/prof-message-parent-form.component';
import { ProfMessagesComponent } from './prof-messages/prof-messages.component';

import { ProfRoutingModule } from './prof-routing.module';
import { CommunicationProfesseurService } from './shared/services/communication-professeur.service';
import { RegisterService } from './shared/services/register.service';
import { TransferService } from './shared/services/transfer.service';


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
    ProfHistoriqueComponent,
    ProfMessagesComponent
  ],
  providers: [
    RegisterService,
    CommunicationProfesseurService,
    TransferService
  ]
})
export class ProfModule {
}
