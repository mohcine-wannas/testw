import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '../../shared/components/form.component';
import { AlertService } from '../../shared/services/alert.service';
import { Categorie } from '../shared/models/categorie.model';
import { MessageModel } from '../shared/models/message-model.model';
import { CategorieService } from '../shared/services/categorie.service';
import { MessageModelService } from '../shared/services/message-model.service';

@Component({
  selector: 'app-create-from-send-message',
  templateUrl: './create-from-send-message.component.html',
  styleUrls: ['./create-from-send-message.component.css']
})
export class CreateFromSendMessageComponent extends FormComponent<MessageModel> implements OnInit {

  @Input() profil: string;
  @Input() message: string;

  private categories: Categorie[];
  private enabled = false;
  private openeModal = false;
  private msgModel: MessageModel;

  constructor(private categorieService: CategorieService,
              private alert: AlertService,
              private messageModelService: MessageModelService,
              private fb: FormBuilder) {
    super();
    this.restService = this.messageModelService;
  }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.categorieService.getAllCategories(this.profil).subscribe(
      resp => {
        this.categories = resp;
      },
      error => this.alert.error(error)
    );
  }

  enabledChange() {
    this.msgModel = new MessageModel();
    this.msgModel.message = this.message;
    if (this.enabled) {
      this.openeModal = true;
      this.modeEdit = false;
      this.msgModel.id = null;
      this.id = null;
      this.createForm();
    }
  }

  createForm() {
    this.enabled = !this.enabled;
    this.entityForm = this.fb.group({
      'id': [this.msgModel.id],
      'categorie': [this.msgModel.categorie, Validators.required],
      'titre': [this.msgModel.titre, Validators.required],
      'message': [this.msgModel.message, Validators.required],
    });
  }

  submitMsgModel(event) {
    this.submitForm(event, this.entityForm.value as MessageModel);
  }

  public submitForm($ev, model: MessageModel, callback?: (param: any) => void) {
    $ev.preventDefault();
    if (!this.submitting) {
      this.submitting = true;
      this.markAllInputAsTouched();

      if (this.entityForm.valid) {
        this.model = model;
        this.messageModelService.create(this.model).subscribe(
          resp => {
            this.toastService.success('Enregistrement effectué avec succès');
            this.handleResponse(callback, resp);
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

  private handleResponse(callback: (param: any) => void, resp) {
    this.submitting = false;
    this.openeModal = false;
    this.modeEdit = false;
    this.msgModel = null;
    if (callback) {
      callback(resp);
    }
  }

}
