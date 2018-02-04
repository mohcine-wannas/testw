import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { ToastService } from 'app/shared/services/toast.service';
import { AlertService } from 'app/shared/services/alert.service';
import { SessionService } from 'app/core/session/session.service';
import { SessionTokenService } from 'app/core/session/session-token.service';
import { SessionDataService } from 'app/core/session/session-data.service';
import { RouterModule } from '@angular/router';
import { SessionConstants } from 'app/core/session/session.constants';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers : [ 
    SessionService,
    SessionTokenService,
    SessionDataService,
    SessionConstants
  ],
  exports: [
  ]
})
export class CoreModule { }
