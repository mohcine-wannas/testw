import "rxjs/add/operator/catch";
import { FormGroup, AbstractControl } from '@angular/forms';
import {Directive, Output, EventEmitter} from '@angular/core';
import { BaseModel } from "app/shared/models/base-model.model";
import { ToastService } from "app/shared/services/toast.service";
import { ServiceLocator } from "app/shared/services/service-locator.service";
import { RestService } from "app/shared/services/rest.service";
import { FormControl } from "@angular/forms/src/model";



export abstract class FormComponent<T extends BaseModel> { //extends BaseComponent { //TODO 


  private _opened: boolean = false;
  protected modeEdit = false;
  protected entityForm: FormGroup;
  protected form: any  = this;
  protected id: number;
  protected model: T;
  private toastService : ToastService;
  protected restService: RestService<T>;



  constructor(resourceName? : string) {
    //super();
    this.toastService = ServiceLocator.injector.get(ToastService);
    this.restService = ServiceLocator.injector.get(RestService);
    if(resourceName) {
      this.restService.setResource(resourceName);
    }
  }

  //----------- FORM ---------------------

  public isOnEditMode() {
    return this.modeEdit;
  }

  resetForm(obj : any = {}) {
    if(this.entityForm) {
      this.entityForm.reset(obj);
    }
  }

  protected saveSucceed() {
    this.toastService.success("Enregistrement effectué avec succès");
  }

  protected deleteSucceed() {
    this.toastService.info("Suppression effectué avec succès");
  }

  // public openForm(id) {
  //   if(!this._opened) {
  //     this.modeEdit=!!id;

  //     if(this.isOnEditMode()) {
  //       this.id = id;
  //       this.restService.get(id).subscribe(
  //         resp => this.createAndOpenForm(resp),
  //         error => this.showError(error));
  //     }else {
  //       this.createAndOpenForm();
  //     }
  //   }
  // }

  abstract createForm(model?: BaseModel);

  // protected createAndOpenForm(model?: BaseModel) {

  //   this.resetForm();
  //   this.createForm(model);
  //   this.openSideBar();
  // }



  public delete() {
      // this.restService.delete(this.id).subscribe(
      //   resp => this.deleteSucceed(),
      //   error => this.showError(error)
      // );
  }

  markAllInputAsTouched() {
    for (let c in this.entityForm.controls) {
      this.entityForm.controls[c].markAsTouched();
      // I added a condition for disabled status to avoid validation warning
      if (!this.entityForm.controls[c].valid && this.entityForm.controls[c].status !== 'DISABLED') {
        console.log("WARN : " + c + " is not valid");
        this.submitting = false;
      }
    }
  }

  protected submitting = false;
  public submit($ev, model: T, callback?: (param: any) => void) {
    $ev.preventDefault();
    if (!this.submitting) {
      this.submitting = true;
      this.markAllInputAsTouched();

      if (this.entityForm.valid) {
        this.model = model;
        this.model.id = this.isOnEditMode() ? this.id : null;
        console.log(this.model);
        this.restService.createOrUpdate(this.model).subscribe(
          resp => {
            this.submitting = false;
            this.saveSucceed();
            if (callback) {
              callback(resp);
            }
          },
          error => {
            this.submitting = false;
            this.showError(error);
          }
        );
      } else {
        this.toastService.error('Le formulaire est invalide');
        this.submitting = false;
      }
    }
  }

  protected getSelectedObjectFromList(list: any[], Objectid: number, formControleName: string, formGroup: FormGroup = this.entityForm) {
    list.forEach(e => {
      if (e.id === Objectid) {
        formGroup.get(formControleName).setValue(e);
      }
    });
  }

  //------------ Validators -----------------

  isNotValidRequired(control: any) {
    return control.hasError('required') && (control.dirty || control.touched)
  }
  isValidRequired(control: any) {
    return !control.hasError('required') && (control.dirty || control.touched)
  }

  isNotValidPattern(control: any) {
    return control.hasError('pattern') && (control.dirty || control.touched)
  }

  isNotValid(key: string) {
    let control = this.entityForm.controls[key];
    if (control) {
      return this.isNotValidControl(control);
    } else {
      console.log("Error : Undefined control form " + key);
    }
  }

  isNotValidControl(control : AbstractControl) {
      return control && !control.valid && (control.dirty || control.touched);
  }

  showError(arg0: any): any {
    throw this.toastService.error();
  }

}
