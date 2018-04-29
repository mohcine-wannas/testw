import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionDataService } from 'app/core/session/session-data.service';
import { SessionTokenService } from 'app/core/session/session-token.service';
import { SessionConstants } from 'app/core/session/session.constants';
import { SessionService } from 'app/core/session/session.service';
import { UserService } from '../admin/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    SessionService,
    SessionTokenService,
    SessionDataService,
    SessionConstants,
    UserService
  ],
  exports: []
})
export class CoreModule {
}
