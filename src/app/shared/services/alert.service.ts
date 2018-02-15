import { Injectable } from '@angular/core';

import { default as swal, SweetAlertType, SweetAlertOptions } from 'sweetalert2';

@Injectable()
export class AlertService {

  constructor() { }

  error(text = 'Une erreur est survenue, Merci de réessayer plus tard',title = 'Erreur !',) {

    const option: SweetAlertOptions = {
      title: title,
      text: text,
      type: 'error',
      confirmButtonText: 'Ok !'
    };
    swal(option);

  }

  warning(text = '',title = 'Attention !',) {
    
        const option: SweetAlertOptions = {
          title: title,
          text: text,
          type: 'warning',
          confirmButtonText: 'Ok !'
        };
        swal(option);
    
      }

  success(title = 'Succes', text = '') {

    const option: SweetAlertOptions = {
      title: title,
      text: text,
      type: 'success',
      confirmButtonText: 'Ok !'
    };
    return swal(option);

  }

  serverError() {
    const option: SweetAlertOptions = {
      title: 'Une erreur serveur est survenue, Merci de réessayer plus tard',
      text: 'Un',
      type: 'error',
      confirmButtonText: 'OK !'
    };
    swal(option);
  }

  confirm(text = 'Êtes vous sûr ?', ) {
    const option: SweetAlertOptions = {
      title: 'Attention ! ',
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#62a420',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Je suis sûr !',
      cancelButtonText: 'Annulé'
    };
     return swal(option);
  }
}
