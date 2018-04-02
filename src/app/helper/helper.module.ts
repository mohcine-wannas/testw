import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { ToThaiDatePipe } from './to-thai-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot()
  ],
  declarations: [ToThaiDatePipe],
  exports: [
    ToThaiDatePipe,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule
  ]
})
export class HelperModule2 {
}
