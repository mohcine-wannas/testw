import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from '../../shared/services/alert.service';
import { Categorie } from '../shared/models/categorie.model';
import { MessageModel } from '../shared/models/message-model.model';
import { CategorieService } from '../shared/services/categorie.service';
import { MessageModelService } from '../shared/services/message-model.service';

@Component({
  selector: 'app-upload-model-message',
  templateUrl: './upload-model-message.component.html',
  styleUrls: ['./upload-model-message.component.css']
})
export class UploadModelMessageComponent implements OnInit {

  @Input() profil: string;
  @Output() msgModel = new EventEmitter<MessageModel>();

  private categories: Categorie[];
  private category: Categorie;
  private modalOpned = false;
  private msgModels: MessageModel[] = [];

  constructor(private categorieService: CategorieService,
              private alert: AlertService,
              private messageModelService: MessageModelService) {
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

  private loadMessageModels(id: number) {
    this.messageModelService.getMessageModelsByCategorieId(id, this.profil).subscribe(
      resp => {
        this.msgModels = resp;
      },
      error => this.alert.error(error)
    );
  }

  openModal() {
    this.modalOpned = true;
    this.category = undefined;
    this.msgModels = [];
  }

  categoryChanged() {
    this.loadMessageModels(this.category.id);
  }

  setMessageModel(msgModel: MessageModel) {
    this.modalOpned = false;
    this.msgModel.emit(msgModel);
  }

}
