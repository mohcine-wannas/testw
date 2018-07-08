import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SessionDataService } from '../../../core/session/session-data.service';
import { AffectationProf } from '../../../prof/shared/models/affectation-prof.model';
import {
  FullNameProfComparator,
  FullNameProfFilter,
  PhoneNumberProfComparator,
  PhoneNumberProfFilter,
  Professeur
} from '../../../prof/shared/models/Professeur.model';
import { FormComponent } from '../../../shared/components/form.component';
import { AlertService } from '../../../shared/services/alert.service';
import { AffectationCycle } from '../../models/affectation-cycle.model';
import { AffectationNiveau } from '../../models/affectation-niveau.model';
import { AffectationUnite } from '../../models/affectation-unite.model';
import { GroupeAppellation } from '../../models/groupe-appellation.model';
import { AffectationCycleService } from '../../services/affectation-cycle.service';
import { ProfesseurService } from '../../services/professeur.service';

@Component({
  selector: 'app-profs-list',
  templateUrl: './profs-list.component.html',
  styleUrls: ['./profs-list.component.css']
})
export class ProfsListComponent extends FormComponent<Professeur> implements OnInit {
  private professeurs: Professeur[];
  private cycleId: number;

  private modalUniteOpned = false;

  private modalChangePasswordOpned = false;

  private modalNiveauOpned = false;

  private uniteEditForm: FormGroup;

  private niveauEditForm: FormGroup;

  formArrayAffectation: FormArray;

  private fullNameProfComparator = new FullNameProfComparator();

  private phoneNumberProfComparator = new PhoneNumberProfComparator();

  private fullNameProfFilter = new FullNameProfFilter();

  private phoneNumberProfFilter = new PhoneNumberProfFilter();

  niveauAppellation: any[];
  affectationNiveaux: AffectationNiveau[];
  selectedAffectationNiveau: AffectationNiveau;

  constructor(private profService: ProfesseurService,
              private sessionDataService: SessionDataService,
              private affectationCycleService: AffectationCycleService,
              private alert: AlertService,
              private router: Router,
              private toastyService: ToastyService,
              private formGroup: FormBuilder) {
    super();
    this.sessionDataService.sessionDataSubject.subscribe(
      res => {
        this.cycleId = res;
        this.loadProfs(this.cycleId);
      }
    );

  }

  ngOnInit() {
    this.cycleId = Number(this.sessionDataService.schoolDetails.currentCycle);
    this.loadProfs(this.cycleId);
  }

  private loadProfs(cycleId: number) {
    this.professeurs = [];
    this.profService.getAllByCycleIdAndCurrentSchoolAndCurrentAnneScolaire(this.cycleId).subscribe(
      (resp: Professeur[]) => {
        this.professeurs = resp;
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


  refreshClasses(index: number) {
    const niveau = this.formArrayAffectation.controls[index].get('niveau').value;
    if (niveau) {
      this.selectedAffectationNiveau = new AffectationNiveau();
      for (const item of this.affectationNiveaux) {
        if (item.niveau.id === niveau.id) {
          this.selectedAffectationNiveau = item;
          break;
        }
      }
      this.formArrayAffectation.controls[index].get('classes').setValue(this.selectedAffectationNiveau.classes);

      this.affectationNiveaux.forEach(e => {
        if (e.niveau.id === niveau.id) {
          this.formArrayAffectation.controls[index].get('niveau').setValue(niveau);
        }
      });
    }
  }

  public submitFormNiveau($ev) {
    const prof = this.niveauEditForm.value as Professeur;
    if (!this.validateAffectationNiveauClasse(prof)) {
      return;
    }
    for (const c in this.formArrayAffectation.controls) {
      this.formArrayAffectation.controls[c].markAsTouched();
    }
    if (!this.niveauEditForm.valid) {
      return;
    }
    this.profService.updateProfNivauxClasses(prof).subscribe(
      resp => {
        this.modalNiveauOpned = false;
        this.toastyService.success('Modification effectué avec succès');
        for (const item of this.professeurs) {
          if (prof.id === item.id) {
            item.affectationsNiveauClasseProf = prof.affectationsNiveauClasseProf;
          }
        }
      },
      error => {
        this.showError(error);
      }
    );
  }


  private validateAffectationNiveauClasse(prof: Professeur): boolean {
    if (prof.affectationsNiveauClasseProf.length === 0) {
      this.toastyService.error('Merci de choisir au minimum un niveau et une classe');
      return false;
    }

    if (!this.validateAffectationNiveauClasseRequiredValue(prof)) {
      this.toastyService.error('Un ou plusieurs champs obligatoires sont manquants');
      return false;
    }
    let count;
    for (const affectation of prof.affectationsNiveauClasseProf) {
      count = 0;
      for (const affectation2 of prof.affectationsNiveauClasseProf) {
        if (affectation.niveau && affectation.niveau.id === affectation2.niveau.id && affectation.classe.id === affectation2.classe.id) {
          count++;
        }
      }
      if (count > 1) {
        this.toastyService.error('Un où plusieurs affactations sont dupliquée');
        return false;
      }
    }
    return true;
  }

  private validateAffectationNiveauClasseRequiredValue(prof: Professeur): boolean {
    for (const affectation of prof.affectationsNiveauClasseProf) {
      if (!affectation.niveau || !affectation.niveau.id || !affectation.classe || !affectation.classe.id) {
        return false;
      }
    }
    return true;
  }

  public submitFormUnite($ev) {
    if (!this.uniteEditForm.valid) {
      return;
    }
    const prof = this.uniteEditForm.value as Professeur;

    this.profService.updateProfUnites(prof).subscribe(
      resp => {
        this.modalUniteOpned = false;
        this.toastyService.success('Modification effectué avec succès');
        for (const item of this.professeurs) {
          if (prof.id === item.id) {
            item.affectationsUniteProf = prof.affectationsUniteProf;
          }
        }

      },
      error => {
        this.showError(error);
      }
    );
  }

  goToModalAffectationUnite(prof: Professeur) {
    this.modalUniteOpned = true;
    this.uniteEditForm = this.formGroup.group({
      'id': [prof.id],
      'affectationsUniteProf': this.buildFormArrayAffectationUnite(prof),
    });
  }

  goToModalAffectationNiveauClasse(prof: Professeur) {
    this.affectationCycleService.getAffectationCycleBySchoolCodeAndByCycleId(this.sessionDataService.getCurrentSchool().code, this.cycleId)
      .subscribe(
        (resp: AffectationCycle) => {
          this.affectationNiveaux = resp.affectationNiveaux;
          this.getNiveauAppellationMap(resp.groupeAppellation);
          this.modalNiveauOpned = true;
          this.niveauEditForm = this.formGroup.group({
            'id': [prof.id],
            'affectationsNiveauClasseProf': this.buildFormArrayAffectationProf(prof),
          });
        },
        error => this.showError(error)
      );
  }

  buildFormArrayAffectationUnite(prof: Professeur): FormArray {
    const formArray = new FormArray([]);
    prof.affectationsUniteProf.forEach((affectation: AffectationUnite) => {
      const group = this.formGroup.group({
        'id': [affectation.id],
        'unite': [affectation.unite, Validators.required],
        'enabled': [affectation.enabled, Validators.required]
      });
      formArray.push(group);
    });
    return formArray;
  }

  buildFormArrayAffectationProf(prof: Professeur): FormArray {
    this.formArrayAffectation = new FormArray([]);
    prof.affectationsNiveauClasseProf.forEach((affectation: AffectationProf, indice) => {
      const group = this.formGroup.group({
        'id': [affectation.id],
        'niveau': [affectation.niveau, Validators.required],
        'classe': [affectation.classe, Validators.required],
        'classes': [affectation.classes]
      });
      this.formArrayAffectation.push(group);
      this.refreshClasses(indice);
    });
    return this.formArrayAffectation;
  }

  popLine(ind) {
    this.formArrayAffectation.removeAt(ind);
  }

  addNewLine() {
    const affectation = new AffectationProf();
    const group = this.formGroup.group({
      'niveau': [affectation.niveau, Validators.required],
      'classe': [affectation.classe, Validators.required],
      'classes': [affectation.classes]
    });
    this.formArrayAffectation.push(group);
  }

  deleteProf(prof: Professeur) {


    this.alert.confirmSubmit('Voulez-vous vraiment supprimer cet professeur ?').then((res) => {
        if (res.value) {
          this.profService.delete(prof.id).subscribe(
            resp => {
              this.toastyService.success('Suppression effectuée avec succès');
              this.loadProfs(this.cycleId);
            },
            error => this.showError(error)
          );
        } else if (res.dismiss.toString() === 'cancel') {
        }
      },
      error => this.alert.error()
    );
  }


  enableProf(prof: Professeur) {
    this.profService.enableProf(prof.id, prof.enabled).subscribe(
      resp => {
        this.toastyService.success('Operation effectuée avec succès');
      },
      error => this.showError(error)
    );
  }

  autoSendProf(prof: Professeur) {
    this.profService.autoSendProf(prof.id, prof.autoSend).subscribe(
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
          this.profService.enableAll(enable).subscribe(
            resp => {
              this.toastyService.success('Operation effectuée avec succès');
              this.loadProfs(this.cycleId);
            },
            error => this.showError(error)
          );
        } else if (res.dismiss.toString() === 'cancel') {
        }
      },
      error => this.alert.error()
    );
  }

  public resetPassword($ev) {
    this.markAllInputAsTouched();
    if (!this.entityForm.valid) {
      return;
    }

    this.submitting = true;
    this.profService.passewordChange(this.entityForm.value.id, this.entityForm.value).subscribe(
      resp => {
        this.submitting = false;
        this.toastyService.success('Mote de passe modifié avec succès');
        this.modalChangePasswordOpned = false;
      },
      error => {
        this.submitting = false;
        this.showError(error);
      }
    );
  }

  updatePassword(prof: Professeur) {
    this.modalChangePasswordOpned = true;
    this.createForm(prof);
  }

  createForm(prof: Professeur) {
    this.entityForm = this.formGroup.group({
      'id': [prof.id, Validators.required],
      'oldPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmation': ['', Validators.required],
    }, { validator: this.validatePassword });
  }

  public validatePassword(group: any): { [s: string]: boolean } {
    if (group.get('newPassword').value && group.get('confirmation').value) {
      if (group.get('newPassword').value !== group.get('confirmation').value) {
        return {
          unmatch: true
        };
      }

    }
    return null;
  }

  isNotValidConfirmation() {
    return this.entityForm.hasError('unmatch');
  }

  isNotValidRequired(control: any) {
    return control.hasError('required') && (control.dirty || control.touched);
  }

  showError(error: any): any {
    this.alert.error(error);
  }

}
