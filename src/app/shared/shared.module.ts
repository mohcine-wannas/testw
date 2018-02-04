import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { ToastService } from 'app/shared/services/toast.service';
import { AlertService } from 'app/shared/services/alert.service';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    CoreModule
  ],
  providers : [ 
    AlertService,
    ToastService
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule,
  ]
})
export class SharedModule { }
