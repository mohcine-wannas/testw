import { Component, OnInit } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { ToastService } from 'app/shared/services/toast.service';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private toastService:ToastService) { }
  data:string = "";
  date:Date = new Date();
  options: DatepickerOptions = {
    locale: frLocale
  };
  ngOnInit() {
    this.toastService.show('Hi there');
    this.toastService.success();
    this.toastService.warning('Hi there');
    this.toastService.error();
    this.toastService.info('Hi there');
    this.toastService.wait();
  }
}
