import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { ToastService } from 'app/shared/services/toast.service';
import { AlertService } from 'app/shared/services/alert.service';
import { CoreModule } from 'app/core/core.module';
import { NgDatepickerModule } from 'ng2-datepicker';
import { RestService } from 'app/shared/services/rest.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    CoreModule,
    NgDatepickerModule,
    BrowserAnimationsModule
  ],
  providers : [ 
    AlertService,
    ToastService,
    RestService
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule,
    NgDatepickerModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
