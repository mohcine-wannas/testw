import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AffectationCycle } from 'app/admin/models/affectation-cycle.model';
import { AffectationNiveau } from 'app/admin/models/affectation-niveau.model';
import { GroupeAppellation } from 'app/admin/models/groupe-appellation.model';
import { AffectationCycleService } from 'app/admin/services/affectation-cycle.service';
import { CycleService } from 'app/admin/services/cycle.service';
import { SessionDataService } from 'app/core/session/session-data.service';
import { FormComponent } from 'app/shared/components/form.component';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-gestion-classes',
  templateUrl: './gestion-classes.component.html',
  styleUrls: ['./gestion-classes.component.css']
})
export class GestionClassesComponent extends FormComponent<AffectationCycle> implements OnInit {
  niveauAppellation: any;
  groupeAppelations: GroupeAppellation[];
  error: string;

  affectationCycle: AffectationCycle;

  constructor(private fb: FormBuilder,
              private affectationCycleService: AffectationCycleService,
              private cycleService: CycleService,
              private sessionDataService: SessionDataService,
              private toastyService: ToastyService) {

    super();
    this.restService = affectationCycleService;
    this.sessionDataService.sessionDataSubject.subscribe(
      res => {
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    this.affectationCycleService.getCurrentAffectationCycle().subscribe(
      resp => {
        this.affectationCycle = resp;
        this.createForm();
      },
      error => this.showError(error)
    );
    this.cycleService.getAllGroupeAppellation().subscribe(
      resp => {
        this.groupeAppelations = resp;
        if (!this.groupeAppelations || this.groupeAppelations.length === 0) {
          this.error = 'Problème de configuration ! Merci de contacter votre administrateur';
        }
        if (this.affectationCycle && this.affectationCycle.groupeAppellation) {
          this.getSelectedObjectFromList(this.groupeAppelations, this.affectationCycle.groupeAppellation.id, 'groupeAppellation');
        }
      },
      error => this.showError(error)
    );
  }

  createForm() {
    this.entityForm = this.fb.group({
      'id': [this.affectationCycle.id, Validators.required],
      'groupeAppellation': [this.affectationCycle.groupeAppellation, Validators.required],
      'classeNominationType': [this.affectationCycle.classeNominationType, Validators.required],
      'affectationNiveaux': this.getAffectationNiveauFormArray(),
    });

    this.entityForm.get('groupeAppellation').valueChanges.subscribe((c) => {
      if (c && c.appellations) {
        this.niveauAppellation = [];
        c.appellations.forEach(e => {
          this.niveauAppellation[e.niveau.id] = e.libelle;
        });
      }
    });

    if (this.affectationCycle && this.affectationCycle.groupeAppellation && this.groupeAppelations) {
      this.getSelectedObjectFromList(this.groupeAppelations, this.affectationCycle.groupeAppellation.id, 'groupeAppellation');
    }
  }

  getAffectationNiveauFormArray(): any {
    const formArray = new FormArray([]);
    if (this.affectationCycle) {
      this.affectationCycle.affectationNiveaux.forEach((element: AffectationNiveau) => {
        const group = this.fb.group({
          'id': [element.id, Validators.required],
          'nombreDeClasse': [element.nombreDeClasse, this.validateNombreDeClasse],
          'niveau': [element.niveau, Validators.required]
        });
        formArray.push(group);
      });
    }
    return formArray;
  }

  public submitForm($ev, model: any) {
    this.markAllInputAsTouched();
    if (!this.entityForm.valid) {
      return;
    }

    this.submitting = true;
    this.affectationCycleService.save(model).subscribe(
      resp => {
        this.submitting = false;
        this.toastyService.success('Parfait !');
      },
      error => {
        this.submitting = false;
        this.showError(error);
      }
    );
  }

  getNiveauAppellation(element: FormGroup) {
    if (this.niveauAppellation) {
      return this.niveauAppellation[element.get('niveau').value.id];
    }
  }

  validateNombreDeClasse(control: any): { [s: string]: boolean } {
    if (!(control.value || control.value === 0) || control.value < 0) {
      return {
        valid: false
      };
    }
    return null;
  }

}
