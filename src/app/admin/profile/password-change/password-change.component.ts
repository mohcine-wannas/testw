import { Component, OnInit } from '@angular/core';
import { FormComponent } from 'app/shared/components/form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/admin/services/user.service';

import { User } from 'app/admin/models/User.model';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent extends FormComponent<User> implements OnInit {


  constructor(private fb: FormBuilder,
              private userService : UserService) {
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
    },this.validatePassword.bind(this));
  }

  public submitForm($ev, model: any) {
    this.submitting = true;
    this.userService.passewordChange(model).subscribe(
      resp => {
        this.submitting = false;
        this.saveSucceed();
      },
      error => {
        this.submitting = false;
        this.showError(error);
      }
    );
  }

  public validatePassword(group:any): { [s: string]: boolean }{
    if(group.get("newPassword") && group.get("confirmation").value) {
      return {
        unmatch: true
      }
    }
    return null;
  };
}


