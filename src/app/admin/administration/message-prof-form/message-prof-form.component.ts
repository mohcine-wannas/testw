import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AffectationCycle } from 'app/admin/models/affectation-cycle.model';
import { AffectationNiveau } from 'app/admin/models/affectation-niveau.model';
import { GroupeAppellation } from 'app/admin/models/groupe-appellation.model';
import { Classe } from 'app/admin/models/groupe-appellation.model.1';
import { AffectationCycleService } from 'app/admin/services/affectation-cycle.service';
import { AlertService } from 'app/shared/services/alert.service';
import { FormComponent } from '../../../shared/components/form.component';
import { Message } from '../../models/message.model';
import { Niveau } from '../../models/niveau.model';
import { CommunicationAdministrationService } from '../../services/communication-administration.service';
import { AffectationMessageClasse } from '../../models/affectation-message-classe.model';
import { AffectationMessageUser } from '../../models/affectation-message-user.model';
import { AffectationMessageNiveau } from '../../models/affectation-message-niveau.model';
import { AffectationUnite } from '../../models/affectation-unite.model';
import { AffectationUniteService } from '../../services/affectation-unite.service';
import { SessionDataService } from '../../../core/session/session-data.service';
import {
  TreeViewItem,
  TreeViewItemType
} from '../../../prof/prof-message-parent-form/prof-message-parent-form.component';
import { AffectationMessageUnite } from '../../models/affectation-message-unite.model';
import { Unite } from '../../models/unite.model';
import {TransferService} from "../../../prof/shared/services/transfer.service";
import {MessageModel} from "../../../message-model/shared/models/message-model.model";

@Component({
  selector: 'app-message-prof-form',
  templateUrl: './message-prof-form.component.html',
  styleUrls: ['./message-prof-form.component.css'],
  // todo: Mohcine
  host: {
    class: 'dox-content-panel',
  }
})
export class MessageProfesseurFormComponent extends FormComponent<Message> implements OnInit {

  message: Message;
  classes: Classe[];
  error: string;

  niveauAppellation: any[];

  affectationNiveaux: AffectationNiveau[];
  affectationUnites: AffectationUnite[];

  emptyDestination = true;
  destinationsTouched = false;


  cycleSelected = false;
  public items = [];
  uniteItems = [];

  constructor(private fb: FormBuilder,
              private alert: AlertService,
              private router: Router,
              private affectationCycleService: AffectationCycleService,
              private affectationUniteServices: AffectationUniteService,
              private communicationService: CommunicationAdministrationService,
              private sessionDataService: SessionDataService,
              private transferService: TransferService) {
    super();
  }


  ngOnInit() {

    this.affectationCycleService.getCurrentAffectationCycle().subscribe(
      (resp: AffectationCycle) => {
        this.affectationNiveaux = resp.affectationNiveaux;
        this.getNiveauAppellationMap(resp.groupeAppellation);
        this.items = [];
        if (this.affectationNiveaux && this.affectationNiveaux.length > 0) {
          this.affectationNiveaux.forEach((affectationNiveau) => {
            const item = new TreeViewItem(this.niveauAppellation[affectationNiveau.niveau.id],
              affectationNiveau.niveau,
              TreeViewItemType.NIVEAU);

            this.classes = affectationNiveau.classes;

            if (this.classes && this.classes.length > 0) {
              const childrens = [];
              this.classes.forEach((classe) => {
                const classeItem = new TreeViewItem(classe.libelle, classe, TreeViewItemType.CLASS);
                classeItem.children = [];
                childrens.push(classeItem);
              });
              item.children = childrens;
            }
            this.items.push(item);
          });
        } else {
          this.error = 'Merci de créer des classes';
        }
      },
      error => this.showError(error)
    );


    this.affectationUniteServices.getAffectationsUniteByCycleId(this.sessionDataService.getCurrentCycle().id).subscribe(
      (resp: AffectationUnite[]) => {
        this.affectationUnites = resp;
        this.uniteItems = [];
        if (this.affectationUnites && this.affectationUnites.length > 0) {
          this.affectationUnites.forEach((affectationUnite) => {
            const item = new TreeViewItem(affectationUnite.unite.libelle,
              affectationUnite.unite,
              TreeViewItemType.UNITE);
            item.children = [];

            this.uniteItems.push(item);
          });
        }
      },
      error => this.showError(error)
    );

    if (this.transferService.message) {
      this.message = new Message();
      this.message.message = this.transferService.message.message;
      this.transferService.message = null;
    }

    this.createForm(this.message);
  }

  getNiveauAppellationMap(groupeAppellation: GroupeAppellation) {
    if (groupeAppellation && groupeAppellation.appellations) {
      this.niveauAppellation = [];
      groupeAppellation.appellations.forEach(e => {
        this.niveauAppellation[e.niveau.id] = e.libelle;
      });
    }
  }

  getSelected(): TreeViewItem[] {
    const selecteds: TreeViewItem[] = [];
    this.items.forEach(item => {
      if (item.checked) {
        this.destinationsTouched = true;
        //this.checkAllChildren(item);
        selecteds.push(item);
      } else {
        if (item.children) {
          item.children.forEach(child => {
            if (child.checked) {
              this.destinationsTouched = true;
              selecteds.push(child);
              //this.checkAllChildren(item);
            } else {
              if (child.children) {
                child.children.forEach(student => {
                  if (student.checked) {
                    this.destinationsTouched = true;
                    selecteds.push(student);
                  }
                });
              }
            }
          });
        }
      }
    });
    this.uniteItems.forEach(item => {
      if (item.checked) {
        this.destinationsTouched = true;
        selecteds.push(item);
      } else {
        if (item.children) {
          item.children.forEach(child => {
            if (child.checked) {
              this.destinationsTouched = true;
              selecteds.push(child);
            }
          });
        }
      }
    });
    this.emptyDestination = selecteds.length === 0;
    return selecteds;
  }

  showError(error: any): any {
    this.alert.error(error);
  }

  createForm(message?: Message) {
    if (!message) {
      message = new Message();
    }
    this.entityForm = this.fb.group({
      'recipients': [message.recipients],
      'niveaux': [message.niveaux],
      'classes': [message.classes],
      'unites': [message.unites],
      'message': [message.message, Validators.required],
      'forDate': [message.message, Validators.required],
    });
  }

  public submitForm($ev, model: any) {
    $ev.preventDefault();
    const message = new Message(model);

    message.forDate = new Date(message.forDate);

    const selected = this.getSelected();

    selected.forEach(item => {
      if (item.type === TreeViewItemType.NIVEAU) {
        if (!message.niveaux) {
          message.niveaux = [];
        }
        const obj = new AffectationMessageNiveau();
        obj.niveau = item.value as Niveau;
        message.niveaux.push(obj);
      } else if (item.type === TreeViewItemType.CLASS) {
        if (!message.classes) {
          message.classes = [];
        }
        message.classes.push({ classe: item.value as Classe } as AffectationMessageClasse);
      } else if (item.type === TreeViewItemType.UNITE) {
        if (!message.unites) {
          message.unites = [];
        }
        message.unites.push({ unite: item.value as Unite } as AffectationMessageUnite);
      } else if (item.type === TreeViewItemType.PROFESSEUR) {
        if (!message.recipients) {
          message.recipients = [];
        }
        const obj = new AffectationMessageUser();
        obj.user = { id: item.value.id } as any;
        message.recipients.push(obj);
      }
    });

    this.submit($ev, message);
  }

  public submit($ev, model: Message) {

    if (!this.submitting) {
      this.submitting = true;
      this.markAllInputAsTouched();

      if (this.entityForm.valid) {
        this.model = model;
        this.communicationService.sendToProf(this.model).subscribe(
          resp => {
            this.submitting = false;
            this.saveSucceed();
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

  isInvalidDestinationControl(): boolean {
    return this.emptyDestination && this.destinationsTouched;
  }

  updateMessage(msgModel: MessageModel) {
    this.entityForm.get('message').setValue(msgModel.message);
  }

}
