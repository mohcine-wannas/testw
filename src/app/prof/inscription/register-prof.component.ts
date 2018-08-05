import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AffectationCycle } from '../../admin/models/affectation-cycle.model';
import { AffectationNiveau } from '../../admin/models/affectation-niveau.model';
import { AffectationUnite } from '../../admin/models/affectation-unite.model';
import { Cycle } from '../../admin/models/cycle.model';
import { GroupeAppellation } from '../../admin/models/groupe-appellation.model';
import { FormComponent } from '../../shared/components/form.component';
import { AlertService } from '../../shared/services/alert.service';
import { ToastService } from '../../shared/services/toast.service';
import { AffectationProf } from '../shared/models/affectation-prof.model';
import { Professeur } from '../shared/models/Professeur.model';
import { RegisterService } from '../shared/services/register.service';

@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.component.html',
  styleUrls: ['./register-prof.component.css']
})
export class RegisterProfComponent extends FormComponent<Professeur> implements OnInit {

  opened = false;
  isLogging = false;
  schoolCode: string;
  isValid = false;
  professeur: Professeur;
  cycles: Cycle[] = [];

  niveauAppellation: any[];
  affectationNiveaux: AffectationNiveau[];
  selectedAffectationNiveau: AffectationNiveau;

  formArrayAffectation: FormArray;

  formArrayAffectationsUnite: FormArray;

  constructor(private router: Router,
              private formGroup: FormBuilder,
              private registerService: RegisterService,
              public toastyService: ToastService,
              private alert: AlertService) {
    super();
    this.restService = registerService;
  }

  ngOnInit() {
  }


  validateSchoolCode() {
    this.isLogging = true;
    this.registerService.validateCodeSchool(this.schoolCode).subscribe(
      resp => this.checkResponse(resp as boolean),
      error => {
        this.isValid = false;
        this.isLogging = false;
        this.showErrorRest(error);
      }
    );
  }


  checkResponse(response: boolean) {
    this.isLogging = false;
    if (response) {
      this.isValid = true;
      this.createForm();
      this.getCyclesBySchoolCode();
      this.alert.checkedSuccess();
    } else {
      this.isValid = false;
      this.alert.error('Code incorrect', 'Oops !');
    }
  }

  getCyclesBySchoolCode() {
    this.registerService.getCyclesBySchoolCode(this.schoolCode).subscribe(
      resp => this.cycles = resp,
      error => {
        this.showErrorRest(error);
      }
    );
  }

  private goToModal() {
    this.opened = true;
  }

  cycleChanged() {
    if (this.entityForm.get('cycle').value.id) {
      const length = this.formArrayAffectation.controls.length;
      const lengthAffectationsUnite = this.formArrayAffectationsUnite.controls.length;
      for (let i = 0; i < length; i++) {
        this.formArrayAffectation.removeAt(0);
      }
      for (let i = 0; i < lengthAffectationsUnite; i++) {
        this.formArrayAffectationsUnite.removeAt(0);
      }
      this.addNewLine();
      this.loadAffectationsNiveaux();
      this.loadAffectationsUnite();
    }
  }

  private loadAffectationsUnite() {
    this.registerService.getAffectationsUniteBySchoolCodeAndByCycleId(this.schoolCode, this.entityForm.get('cycle').value.id)
      .subscribe(
        (resp: AffectationUnite[]) => {
          this.professeur.affectationsUniteProf = resp;
          this.professeur.affectationsUniteProf.forEach((affectation: AffectationUnite) => {
            const group = this.formGroup.group({
              'unite': [affectation.unite, Validators.required],
              'enabled': [affectation.enabled = false, Validators.required]
            });
            this.formArrayAffectationsUnite.push(group);
          });
        },
        error => this.showErrorRest(error)
      );
  }

  private loadAffectationsNiveaux() {
    this.registerService.getAffectationCycleBySchoolCodeAndByCycleId(this.schoolCode, this.entityForm.get('cycle').value.id)
      .subscribe(
        (resp: AffectationCycle) => {
          this.affectationNiveaux = resp.affectationNiveaux;
          this.getNiveauAppellationMap(resp.groupeAppellation);
        },
        error => this.showErrorRest(error)
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
      this.affectationNiveaux.forEach(item => {
        if (item.niveau.id === niveau.id) {
          this.selectedAffectationNiveau = item;
        }
      });
      this.formArrayAffectation.controls[index].get('classes').setValue(this.selectedAffectationNiveau.classes);
      this.formArrayAffectation.controls[index].get('classe').setValue(null);
    }
  }

  codeChanged() {
    this.isValid = false;
    this.professeur = new Professeur();
    this.schoolCode = this.entityForm.get('schoolCode').value;
  }

  validatePassword(): boolean {
    if (this.entityForm.get('passwordConfirm').value && this.entityForm.get('password').value
      && this.entityForm.get('password').value !== this.entityForm.get('passwordConfirm').value) {
      return false;
    }
    return true;
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

  public submitForm($ev, model: any) {

    const prof = model as Professeur;
    if (!this.validateAffectationNiveauClasse(prof)) {
      return;
    }
    this.markAllInputAsTouched();
    if (!this.entityForm.valid) {
      return;
    }

    if (prof.password === prof.passwordConfirm) {
      if (prof.affectationsNiveauClasseProf.length !== 0 && prof.affectationsUniteProf.length !== 0) {
        this.submitting = true;
        this.registerService.create(prof).subscribe(
          resp => {
            this.submitting = false;
            this.toastyService.success('Enregistrement effectué avec succès');
            this.goToProfLogin();
          },
          error => {
            this.submitting = false;
            this.showError(error);
          }
        );
      } else {
        if (prof.affectationsNiveauClasseProf.length === 0) {
          this.toastyService.error('Merci de choisir au minimum un niveau et une classe');
        }

        if (prof.affectationsUniteProf.length === 0) {
          this.toastyService.error('Merci de sélectionner au minimum une unité');
        }
      }
    }
  }


  createForm() {
    this.professeur = new Professeur();
    this.professeur.schoolCode = this.schoolCode;
    this.professeur.affectationsNiveauClasseProf = [];
    this.professeur.affectationsUniteProf = [];
    this.professeur.affectationsNiveauClasseProf.push(new AffectationProf());
    this.entityForm = this.formGroup.group({
      'schoolCode': [this.professeur.schoolCode, Validators.required],
      'firstname': [this.professeur.firstname, Validators.required],
      'lastname': [this.professeur.lastname, Validators.required],
      'phoneNumber': [this.professeur.phoneNumber, Validators.required],
      'password': [this.professeur.password, Validators.required],
      'passwordConfirm': [this.professeur.passwordConfirm, Validators.required],
      'cycle': [this.professeur.cycle, Validators.required],
      'affectationsNiveauClasseProf': this.buildFormArrayAffectationProf(),
      'affectationsUniteProf': this.buildFormArrayAffectationUnite(),
    });
  }

  buildFormArrayAffectationUnite(): FormArray {
    this.formArrayAffectationsUnite = new FormArray([]);
    this.professeur.affectationsUniteProf.forEach((affectation: AffectationUnite) => {
      const group = this.formGroup.group({
        'unite': [affectation.unite, Validators.required],
        'enabled': [affectation.enabled, Validators.required]
      });
      this.formArrayAffectationsUnite.push(group);
    });
    return this.formArrayAffectationsUnite;
  }

  buildFormArrayAffectationProf(): FormArray {
    this.formArrayAffectation = new FormArray([]);
    this.professeur.affectationsNiveauClasseProf.forEach((affectation: AffectationProf) => {
      const group = this.formGroup.group({
        'niveau': [affectation.niveau, Validators.required],
        'classe': [affectation.classe, Validators.required],
        'classes': [affectation.classes]
      });
      this.formArrayAffectation.push(group);
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

  showErrorRest(error: any): any {
    this.alert.error(error);
  }

  goToProfLogin() {
    this.router.navigate(['login/prof']);
  }
}
