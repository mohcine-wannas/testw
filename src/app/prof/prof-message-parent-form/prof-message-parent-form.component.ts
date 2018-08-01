import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AffectationCycle} from 'app/admin/models/affectation-cycle.model';
import {AffectationNiveau} from 'app/admin/models/affectation-niveau.model';
import {Eleve} from 'app/admin/models/eleve.model';
import {GroupeAppellation} from 'app/admin/models/groupe-appellation.model';
import {Classe} from 'app/admin/models/groupe-appellation.model.1';
import {AffectationCycleService} from 'app/admin/services/affectation-cycle.service';
import {ClasseService} from 'app/admin/services/classe.service';
import {AlertService} from 'app/shared/services/alert.service';
import { MessageModel } from '../../message-model/shared/models/message-model.model';
import {FormComponent} from '../../shared/components/form.component';
import {Message} from '../../admin/models/message.model';
import {AffectationMessageClasse} from '../../admin/models/affectation-message-classe.model';
import {Niveau} from '../../admin/models/niveau.model';
import {AffectationMessageNiveau} from '../../admin/models/affectation-message-niveau.model';
import {AffectationMessageUser} from '../../admin/models/affectation-message-user.model';
import {AffectationUniteService} from '../../admin/services/affectation-unite.service';
import {Unite} from '../../admin/models/unite.model';
import {CommunicationProfesseurService} from '../shared/services/communication-professeur.service';
import {TransferService} from '../shared/services/transfer.service';
import {Professeur} from "../shared/models/Professeur.model";

@Component({
  selector: 'app-prof-message-parent-form',
  templateUrl: './prof-message-parent-form.component.html',
  styleUrls: ['./prof-message-parent-form.component.css'],
  // todo: Mohcine
  host: {
    class: 'dox-content-panel',
  }
})
export class ProfMessageParentFormComponent extends FormComponent<Message> implements OnInit {

  message: Message;
  classes: Classe[];
  error: string;

  niveauAppellation: any[];
  unites: Unite[] = [];
  affectationNiveaux: AffectationNiveau[];
  selectedClasse: Classe;

  emptyDestination = true;
  destinationsTouched = false;

  cycleSelected = false;
  public items = [];

  public treeViewConfig = {
    decoupleChildFromParent: true,
    hasCollapseExpand: true,
    hasFilter: true
  };

  constructor(private fb: FormBuilder,
              public classeService: ClasseService,
              private alert: AlertService,
              private router: Router,
              private affectationCycleService: AffectationCycleService,
              private communicationService: CommunicationProfesseurService,
              private affectationUniteService: AffectationUniteService,
              private transferService: TransferService) {
    super();
  }

  eleves: Eleve[];

  ngOnInit() {

    this.affectationCycleService.getCurrentAffectationCycleForProf().subscribe(
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

    if (this.transferService.message) {
      this.message = new Message();
      this.message.message = this.transferService.message.message;
      this.message.unite = this.transferService.message.unite;
      this.transferService.message = null;
    }


    this.affectationUniteService.getAffectationsUnite().subscribe(
      resp => {
          resp.forEach(affectationUnite => {
            this.unites.push(affectationUnite.unite);
          });
        if (this.message.unite) {
          this.getSelectedObjectFromList(this.unites, this.message.unite.id, 'unite');
        }
      },
      error => this.showError(error));


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
    this.emptyDestination = selecteds.length === 0;
    return selecteds;
  }

  refresh() {
    if (this.selectedClasse && this.selectedClasse.id) {
      this.classeService.getAllEleves(this.selectedClasse.id).subscribe(
        resp => this.eleves = resp,
        error => this.showError(error)
      );
    } else {
      this.eleves = [];
    }
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
      'unite': [message.unite, Validators.required],
      'niveaux': [message.niveaux],
      'classes': [message.classes],
      'message': [message.message, Validators.required],
      'forDate': [message.message, Validators.required],
    });



  }

  public submitForm($ev, model: any) {
    $ev.preventDefault();

    this.markAllInputAsTouched();
    this.destinationsTouched = true;
    if (this.isInvalidDestinationControl()) {
      this.toastService.error('Le formulaire est invalide');
      return;
    }

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
        message.classes.push({classe: item.value as Classe} as AffectationMessageClasse);
      } else if (item.type === TreeViewItemType.ELEVE) {
        if (!message.recipients) {
          message.recipients = [];
        }
        const obj = new AffectationMessageUser();
        obj.user = {id: item.value.id} as any;
        message.recipients.push(obj);
      }
    });

    this.submit($ev, message);
  }

  public submit($ev, model: Message) {

    if (!this.submitting) {
      this.submitting = true;

      if (this.entityForm.valid) {
        this.model = model;
        this.communicationService.send(this.model).subscribe(
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

  private checkAllChildren(item: any) {
    item.children.forEach(child => {
      child.checked = true;
      if (child.children) {
        this.checkAllChildren(child);
      }
    });
  }

  updateMessage(msgModel: MessageModel) {
    this.entityForm.get('message').setValue(msgModel.message);
  }

}
export class TreeViewItem {

  text: string;
  value: Classe | Niveau | Eleve | Professeur | Unite;
  checked = false;
  children: TreeViewItem[];
  type: TreeViewItemType;

  constructor (text, value, type) {
    this.text = text;
    this.value = value;
    this.type = type;
  }

}

export enum TreeViewItemType {
  NIVEAU = 1,
  CLASS = 2,
  ELEVE = 3,
  PROFESSEUR = 4,
  UNITE = 5,
}
