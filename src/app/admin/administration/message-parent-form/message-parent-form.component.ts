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
import {EleveService} from 'app/admin/services/eleve.service';
import {AlertService} from 'app/shared/services/alert.service';
import {FormComponent} from '../../../shared/components/form.component';
import {Message} from '../../models/message.model';
import {Niveau} from '../../models/niveau.model';
import {CommunicationAdministrationService} from '../../services/communication-administration.service';
import {AffectationMessageClasse} from '../../models/affectation-message-classe.model';
import {AffectationMessageUser} from '../../models/affectation-message-user.model';
import {AffectationMessageNiveau} from '../../models/affectation-message-niveau.model';

@Component({
  selector: 'app-eleve-list',
  templateUrl: './message-parent-form.component.html',
  styleUrls: ['./message-parent-form.component.css'],
  // todo: Mohcine
  host: {
    class: 'dox-content-panel',
  }
})
export class MessageParentFormComponent extends FormComponent<Message> implements OnInit {

  classes: Classe[];
  error: string;

  niveauAppellation: any[];

  selectedStudent: Eleve[];
  affectationNiveaux: AffectationNiveau[];
  selectedAffectationNiveau: AffectationNiveau = new AffectationNiveau();
  selectedClasse: Classe;

  emptyDestination=true;
  destinationsTouched=false;



  public editorConfig = {
    'minHeight': '300',
    'toolbar': [
      ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
      ['fontName', 'fontSize', 'color'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
      ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
      ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
      ['link', 'unlink']
    ]
  }

  cycleSelected = false;
  public items = [];

  public treeViewConfig = {
    decoupleChildFromParent: true,
    hasCollapseExpand : true,
    hasFilter: true
  };

  constructor(private fb: FormBuilder,
              public eleveService: EleveService,
              public classeService: ClasseService,
              private alert: AlertService,
              private router: Router,
              private affectationCycleService: AffectationCycleService,
              private communicationService: CommunicationAdministrationService) {
    super();
  }

  eleves: Eleve[];

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

            this.selectedAffectationNiveau = this.affectationNiveaux[0];
            this.classes = this.selectedAffectationNiveau.classes;

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

    this.createForm();
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
        selecteds.push(item);
      } else {
        if (item.children) {
          item.children.forEach(child => {
            if (child.checked) {
              this.destinationsTouched = true;
              selecteds.push(child);
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
      'niveaux':  [message.niveaux],
      'classes':  [message.classes],
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
      if ( item.type === TreeViewItemType.NIVEAU) {
        if (!message.niveaux) {
          message.niveaux = [];
        }
        const obj = new AffectationMessageNiveau();
        obj.niveau = item.value as Niveau;
        message.niveaux.push(obj);
      } else if ( item.type === TreeViewItemType.CLASS) {
        if (!message.classes) {
          message.classes = [];
        }
        message.classes.push({classe: item.value as Classe} as AffectationMessageClasse);
      } else if ( item.type === TreeViewItemType.ELEVE) {
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
      this.markAllInputAsTouched();

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

}
export class TreeViewItem {

  text: string;
  value: Classe | Niveau | Eleve;
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
}
