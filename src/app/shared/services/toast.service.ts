import { Injectable } from '@angular/core';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Injectable()
export class ToastService {

  showClose = true;
  timeout = 3000;

  constructor(public toastyService: ToastyService) {
  }

  show(text = '') {
    this.toastyService.default(text);
  }

  error(text = 'Une erreur est survenue, Merci de réessayer plus tard', title = 'erreur') {
    const toastOptions: ToastOptions = {
      title: title,
      msg: text,
      showClose: this.showClose,
      timeout: this.timeout,
    };
    this.toastyService.error(toastOptions);
  }

  success(text = 'L\'operation est éfectuée avec succés', title = 'Succes') {
    const toastOptions: ToastOptions = {
      title: title,
      msg: text,
      showClose: this.showClose,
      timeout: this.timeout,
    };
    this.toastyService.success(toastOptions);
  }

  warning(text, title = 'Attention') {
    const toastOptions: ToastOptions = {
      title: title,
      msg: text,
      showClose: this.showClose,
      timeout: this.timeout,
    };
    this.toastyService.warning(toastOptions);
  }

  info(text, title = 'Info') {
    const toastOptions: ToastOptions = {
      title: title,
      msg: text,
      showClose: this.showClose,
      timeout: this.timeout,
    };
    this.toastyService.info(toastOptions);
  }

  wait(text = 'Merci de patienter SVP', title = 'Chargement') {
    const toastOptions: ToastOptions = {
      title: title,
      msg: text,
      showClose: this.showClose,
      timeout: this.timeout,
    };
    this.toastyService.wait(toastOptions);
  }

}
