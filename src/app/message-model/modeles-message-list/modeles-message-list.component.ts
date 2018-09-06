import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Eleve } from '../../admin/models/eleve.model';
import { FormComponent } from '../../shared/components/form.component';
import { AlertService } from '../../shared/services/alert.service';
import { Categorie } from '../shared/models/categorie.model';
import { MessageModel } from '../shared/models/message-model.model';
import { CategorieService } from '../shared/services/categorie.service';
import { MessageModelService } from '../shared/services/message-model.service';

@Component({
  selector: 'app-modeles-message-list',
  templateUrl: './modeles-message-list.component.html',
  styleUrls: ['./modeles-message-list.component.css']
})
export class ModelesMessageListComponent extends FormComponent<MessageModel> implements OnInit {

  msgModels: MessageModel[] = [];
  openedForm = false;
  msgModel: MessageModel;
  private categories: Categorie[];
  private profil: string;
  private idCategory: number;

  constructor(private messageModelService: MessageModelService,
              private activatedRoute: ActivatedRoute,
              private alert: AlertService,
              private toastyService: ToastyService,
              private fb: FormBuilder,
              private categorieService: CategorieService,
              private router: Router) {
    super();
    this.restService = this.messageModelService;
  }


  ngOnInit() {

    this.activatedRoute.params.subscribe(
      params => {
        this.idCategory = Number(params['id']);
        this.profil = params['profil'];

        this.loadMessageModels(this.idCategory, this.profil);
        this.loadCategories(this.profil);
      }
    );

  }

  private loadCategories(profil: any) {
    this.categorieService.getAllCategories(profil).subscribe(
      resp => {
        this.categories = resp;
      },
      error => this.alert.error(error)
    );
  }

  private loadMessageModels(id: number, profil: any) {
    this.messageModelService.getMessageModelsByCategorieId(id, profil).subscribe(
      resp => {
        this.msgModels = resp;
      },
      error => this.alert.error(error)
    );
  }

  customCompareCategory(c1: Categorie, c2: Categorie) {
    return c1.id === c2.id;
  }


  newMsgModel() {
    this.openedForm = true;
    this.msgModel = new MessageModel();
    this.modeEdit = false;
    this.msgModel.id = null;
    this.id = null;
    this.createForm();
  }

  openForm(msgModel: MessageModel, isOnEdit: boolean) {
    this.openedForm = true;
    this.msgModel = msgModel;
    if (isOnEdit) {
      this.modeEdit = true;
      this.id = this.msgModel.id;
    } else {
      this.modeEdit = false;
      this.msgModel.id = null;
      this.id = null;
    }
    this.createForm();
  }

  createForm() {
    this.entityForm = this.fb.group({
      'id': [this.msgModel.id],
      'categorie': [this.msgModel.categorie, Validators.required],
      'titre': [this.msgModel.titre, Validators.required],
      'message': [this.msgModel.message, Validators.required],
    });
  }


  deleteMessageModel(idMsgModel: number) {
    this.alert.confirmSubmit('Voulez-vous vraiment supprimer cet modèle de message ?').then((res) => {
        if (res.value) {
          this.messageModelService.delete(idMsgModel).subscribe(
            resp => {
              this.toastyService.success('Suppression effectuée avec succès');
              this.msgModels = this.msgModels.filter(msgModel => msgModel.id !== idMsgModel);
            },
            error => this.alert.error(error)
          );
        } else if (res.dismiss.toString() === 'cancel') {
        }
      },
      error => this.alert.error()
    );
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
        this.model.id = this.isOnEditMode() ? this.id : null;
        if (!this.isOnEditMode()) {
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
          this.messageModelService.update(this.model).subscribe(
            resp => {
              this.toastService.success('Modification effectué avec succès');
              this.handleResponse(callback, resp);
            },
            error => {
              this.submitting = false;
              this.showError(error);
            }
          );
        }
      } else {
        this.toastService.error('Le formulaire est invalide');
        this.submitting = false;
      }
    }
  }

  private handleResponse(callback: (param: any) => void, resp) {
    this.submitting = false;
    this.openedForm = false;
    this.modeEdit = false;
    if (this.idCategory !== this.model.categorie.id) {
      this.router.navigate([this.profil, 'message-models', 'list', 'category', this.profil, this.model.categorie.id]);
    } else {
      this.loadMessageModels(this.idCategory, this.profil);
    }
    this.msgModel = null;
    if (callback) {
      callback(resp);
    }
  }
}
