import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from 'app/shared/shared.module';
import { RegisterProfComponent } from './inscription/register-prof.component';

import { ProfRoutingModule } from './prof-routing.module';
import { ProfesseurService } from './shared/services/professeur.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfRoutingModule,
    SharedModule,
    ClarityModule
  ],
  declarations: [RegisterProfComponent],
  providers: [ProfesseurService]
})
export class ProfModule {
}
