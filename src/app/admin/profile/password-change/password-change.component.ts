import { Component, OnInit } from '@angular/core';
import { FormComponent } from 'app/shared/components/form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/admin/services/user.service';

import { User } from 'app/admin/models/User.model';
import { AlertService } from 'app/shared/services/alert.service';
import { Router } from '@angular/router';
import { SessionService } from 'app/core/session/session.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent extends FormComponent<User> implements OnInit {


  constructor(private fb: FormBuilder,
              private userService : UserService,
              private alertService : AlertService,
              private sessionService: SessionService) {
    super();
    this.restService = userService;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    
    this.entityForm = this.fb.group({
      'oldPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmation': ['', Validators.required],
    }, {validator: this.validatePassword});
  }

  public submitForm($ev, model: any) {
    this.markAllInputAsTouched();
    if(!this.entityForm.valid) return;
    
    this.submitting = true;
    this.userService.passewordChange(model).subscribe(
      resp => {
        this.submitting = false;
        this.alertService.success("Parfait !","Votre mot de passe et bien modifié, vous allez être renvoyer vers la page d'authentification")
          .then(() => {this.sessionService.logout(true)});
        this.sessionService.logout();
      },
      error => {
        this.submitting = false;
        this.showError(error);
      }
    );
  }

  public validatePassword(group:any): { [s: string]: boolean }{
    if(group.get("newPassword").value && group.get("confirmation").value && group.get("newPassword").value !== group.get("confirmation").value) {
      return {
        unmatch: true
      }
    }
    return null;
  };

  isNotValidConfirmation() {
    return this.entityForm.hasError('unmatch');
  }
}


