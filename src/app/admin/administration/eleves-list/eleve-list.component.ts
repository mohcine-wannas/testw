import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AffectationCycle } from 'app/admin/models/affectation-cycle.model';
import { AffectationNiveau } from 'app/admin/models/affectation-niveau.model';
import {
  ActiveEleveComparator,
  AffectationParents,
  CodeMassarEleveComparator,
  CodeMassarEleveFilter,
  Eleve,
  FirstNameEleveComparator,
  FirstNameEleveFilter,
  LastNameEleveComparator,
  LastNameEleveFilter
} from 'app/admin/models/eleve.model';
import { GroupeAppellation } from 'app/admin/models/groupe-appellation.model';
import { Classe } from 'app/admin/models/groupe-appellation.model.1';
import { AffectationCycleService } from 'app/admin/services/affectation-cycle.service';
import { ClasseService } from 'app/admin/services/classe.service';
import { EleveService } from 'app/admin/services/eleve.service';
import { AlertService } from 'app/shared/services/alert.service';
import { ToastyService } from 'ng2-toasty';
import { Categorie } from '../../../message-model/shared/models/categorie.model';
import { Professeur } from '../../../prof/shared/models/Professeur.model';
import { FormComponent } from '../../../shared/components/form.component';
import { Niveau } from '../../models/niveau.model';

@Component({
  selector: 'app-eleve-list',
  templateUrl: './eleve-list.component.html',
  styleUrls: ['./eleve-list.component.css'],
  // todo: Mohcine
  host: {
    class: 'dox-content-panel',
  }
})
export class EleveListComponent extends FormComponent<Eleve> implements OnInit {
  niveauAppellation: any[];
  classe: Classe;
  classes: Classe[];
  error: string;
  public opened: Boolean = false;
  @ViewChild('grid') public grid;

  selectedStudent: Eleve;
  eleve: Eleve;
  public openedForm: Boolean = false;
  classesList: Classe[];

  affectationNiveaux: AffectationNiveau[];
  selectedAffectationNiveau: AffectationNiveau = new AffectationNiveau();
  selectedClasse: Classe;
  selectedAffectationNiveauForUpload: AffectationNiveau = new AffectationNiveau();
  selectedClasseForUpload: Classe;

  private firstNameEleveComparator = new FirstNameEleveComparator();
  private firstNameEleveFilter = new FirstNameEleveFilter();

  private lastNameEleveComparator = new LastNameEleveComparator();
  private lastNameEleveFilter = new LastNameEleveFilter();

  private codeMassarEleveComparator = new CodeMassarEleveComparator();
  private codeMassarEleveFilter = new CodeMassarEleveFilter();

  private activeEleveComparator = new ActiveEleveComparator();

  constructor(public eleveService: EleveService,
              public classeService: ClasseService,
              private alert: AlertService,
              private router: Router,
              private affectationCycleService: AffectationCycleService,
              private toastyService: ToastyService,
              private fb: FormBuilder) {
    super();
    this.restService = this.eleveService;
  }

  eleves: Eleve[];

  ngOnInit() {

    this.affectationCycleService.getCurrentAffectationCycle().subscribe(
      (resp: AffectationCycle) => {
        this.affectationNiveaux = resp.affectationNiveaux;
        this.getNiveauAppellationMap(resp.groupeAppellation);
        if (this.affectationNiveaux && this.affectationNiveaux.length > 0) {
          this.selectedAffectationNiveau = this.affectationNiveaux[0];
          this.classes = this.selectedAffectationNiveau.classes;
          if (this.classes && this.classes.length > 0) {
            this.selectedClasse = this.classes[0];
          }
          this.refresh();
        } else {
          this.error = 'Merci de créer des classes';
        }
      },
      error => this.showError(error)
    );
  }

  getNiveauAppellationMap(groupeAppellation: GroupeAppellation) {
    if (groupeAppellation && groupeAppellation.appellations) {
      this.niveauAppellation = [];
      groupeAppellation.appellations.forEach(e => {
        this.niveauAppellation[e.niveau.id] = e.libelle;
      });
    }
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

  refreshClasses() {
    if (this.selectedAffectationNiveau) {
      this.classes = this.selectedAffectationNiveau.classes;
      if (this.classes && this.classes.length > 0) {
        this.selectedClasse = this.classes[0];
      } else {
        this.selectedClasse = null;
      }
    }
    this.refresh();
  }

  niveauChanged() {
    const niveau = this.entityForm.get('niveau').value;
    this.entityForm.get('classe').setValue(null);
    this.classesList = [];
    if (niveau) {
      for (const item of this.affectationNiveaux) {
        if (item.niveau.id === niveau.id) {
          this.classesList = item.classes;
          break;
        }
      }
    }
  }

  showError(error: any): any {
    this.alert.error(error);
  }

  enableParent(affectation: AffectationParents, eleve: Eleve) {
    this.eleveService.enableParent(affectation.id, affectation.enabled).subscribe(
      resp => {
        this.toastyService.success('Operation effectuée avec succès');

        let allEnabled = true;
        eleve.affectationParents.forEach((aff) => {
          if (aff.enabled === undefined) {
            allEnabled = false;
          }
        });
        if (allEnabled) {
          eleve.hasToBeEnabled = false;
        }
      },
      error => this.showError(error)
    );
  }

  openParentDialog(eleve: Eleve) {
    this.selectedStudent = eleve;
    this.opened = true;
  }

  fileToUpload: File = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileMassar() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.classeService.postMassarFile(this.selectedClasseForUpload.id, formData).subscribe(data => {
      this.alert.success('Succes', data + ' élève(s) ont été importé(s)');
    }, error => {
      console.log(error);
    });
  }

  createForm(model?: Eleve) {
    this.eleve = null;
    if (model) {
      this.modeEdit = true;
      this.eleve = model;
      this.id = model.id;
      this.eleve.niveau = this.selectedAffectationNiveau.niveau;
      this.eleve.classe = this.selectedClasse;
      this.classesList = [];
      for (const item of this.affectationNiveaux) {
        if (item.niveau.id === this.eleve.niveau.id) {
          this.classesList = item.classes;
          break;
        }
      }
    } else {
      this.modeEdit = false;
      this.eleve = new Eleve();
    }

    this.entityForm = this.fb.group({
      'id': [this.eleve.id],
      'codeMassar': [this.eleve.codeMassar, Validators.required],
      'firstname': [this.eleve.firstname, Validators.required],
      'lastname': [this.eleve.lastname, Validators.required],
      'remarque': [this.eleve.remarque],
      'etatSante': [this.eleve.etatSante],
      'niveau': [this.eleve.niveau, Validators.required],
      'classe': [this.eleve.classe, Validators.required],
    });
  }

  addNewStudent() {
    this.openedForm = true;
    this.createForm();
  }

  updateStudent(model: Eleve) {
    this.openedForm = true;
    this.createForm(model);
  }

  submitStudent(event) {
    this.submitForm(event, this.entityForm.value as Eleve);
  }

  public submitForm($ev, model: Eleve, callback?: (param: any) => void) {
    $ev.preventDefault();
    if (!this.submitting) {
      this.submitting = true;
      this.markAllInputAsTouched();

      if (this.entityForm.valid) {
        this.model = model;
        this.model.id = this.isOnEditMode() ? this.id : null;
        if (!this.isOnEditMode()) {
          this.eleveService.create(this.model).subscribe(
            resp => {
              this.submitting = false;
              this.toastService.success('Enregistrement effectué avec succès');
              this.openedForm = false;
              this.eleve = null;
              this.modeEdit = false;
              this.refresh();
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
          this.eleveService.update(this.model).subscribe(
            resp => {
              this.submitting = false;
              this.toastService.success('Modification effectué avec succès');
              this.openedForm = false;
              this.refresh();
              this.eleve = null;
              this.modeEdit = false;
              if (callback) {
                callback(resp);
              }
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

  deleteEeleve(eleve: Eleve) {
    this.alert.confirmSubmit('Voulez-vous vraiment supprimer cet élève ?').then((res) => {
        if (res.value) {
          this.eleveService.delete(eleve.id).subscribe(
            resp => {
              this.toastyService.success('Suppression effectuée avec succès');
              this.refresh();
            },
            error => this.showError(error)
          );
        } else if (res.dismiss.toString() === 'cancel') {
        }
      },
      error => this.alert.error()
    );
  }

  enableProf(eleve: Eleve) {
    this.eleveService.enableEleve(eleve.id, eleve.enabled).subscribe(
      resp => {
        this.toastyService.success('Operation effectuée avec succès');
      },
      error => this.showError(error)
    );
  }

  enableAll(enable: boolean) {
    let message;
    if (enable) {
      message = 'Êtes vous sûre de vouloir valider tous les professeurs ?';
    } else {
      message = 'Êtes vous sûre de vouloir suspendre tous les professeurs ?';
    }

    this.alert.confirmSubmit(message).then((res) => {
        if (res.value) {
          this.eleveService.enableAll(enable).subscribe(
            resp => {
              this.toastyService.success('Operation effectuée avec succès');
              this.refresh();
            },
            error => this.showError(error)
          );
        } else if (res.dismiss.toString() === 'cancel') {
        }
      },
      error => this.alert.error()
    );
  }

  customCompareNiveau(n1: Niveau, n2: Niveau) {
    return n1.id === n2.id;
  }

  customCompareClasse(n1: Classe, n2: Classe) {
    return n1.id === n2.id;
  }

}
