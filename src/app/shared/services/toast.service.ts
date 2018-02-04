import { Injectable } from '@angular/core';

import { default as swal, SweetAlertType, SweetAlertOptions } from 'sweetalert2';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Injectable()
export class ToastService {


  constructor(public toastyService : ToastyService) { }

  showClose : boolean = true;
  timeout : number = 3000;

  show(text = '') {
    this.toastyService.default(text);
  }

  error(text = 'Une erreur est survenue, Merci de réessayer plus tard', title='erreur') {
    let toastOptions:ToastOptions = {
      title: title,
      msg: text,
      showClose: this.showClose,
      timeout: this.timeout,
    };
    this.toastyService.error(toastOptions);
  }

  success(text = "L\'operation est éfectuée avec succés",title = 'Succes') {
    let toastOptions:ToastOptions = {
      title: title,
      msg: text,
      showClose: this.showClose,
      timeout: this.timeout,
    };
    this.toastyService.success(toastOptions);
  }

  warning(text,title = 'Attention') {
    let toastOptions:ToastOptions = {
      title: title,
      msg: text,
      showClose: this.showClose,
      timeout: this.timeout,
    };
    this.toastyService.warning(toastOptions);
  }

  info(text,title = 'Info') {
    let toastOptions:ToastOptions = {
      title: title,
      msg: text,
      showClose: this.showClose,
      timeout: this.timeout,
    };
    this.toastyService.info(toastOptions);
  }

  wait(text= 'Merci de patienter SVP' ,title = 'Chargement') {
    let toastOptions:ToastOptions = {
      title: title,
      msg: text,
      showClose: this.showClose,
      timeout: this.timeout,
    };
    this.toastyService.wait(toastOptions);
  }
    
}
