import { Component, OnInit } from '@angular/core';
import { ToastService } from 'app/shared/services/toast.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private toastService: ToastService) {
  }

  // date:Date = new Date();
  // options: DatepickerOptions = {
  //   locale: frLocale
  // };
  ngOnInit() {

  }
}
