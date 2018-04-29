import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { SessionDataService } from '../../../core/session/session-data.service';
import { FormComponent } from '../../../shared/components/form.component';
import { AlertService } from '../../../shared/services/alert.service';
import { AffectationUnite } from '../../models/affectation-unite.model';
import { Unite } from '../../models/unite.model';
import { AffectationUniteService } from '../../services/affectation-unite.service';

@Component({
  selector: 'app-affectation-unite',
  templateUrl: './affectation-unite.component.html',
  styleUrls: ['./affectation-unite.component.css']
})
export class AffectationUniteComponent extends FormComponent<Unite> implements OnInit {
  private affectations: AffectationUnite[] = [];
  error: string;

  constructor(private affectationUniteService: AffectationUniteService,
              private alert: AlertService,
              private sessionDataService: SessionDataService,
              private formGroup: FormBuilder,
              private toastyService: ToastyService) {
    super();
    this.restService = affectationUniteService;
    this.sessionDataService.sessionDataSubject.subscribe(
      res => {
        this.getAffectation(res);
      }
    );
  }

  ngOnInit(): void {
    this.getAffectation(Number(this.sessionDataService.schoolDetails.currentCycle));
  }


  private getAffectation(cycleId: number) {
    this.affectationUniteService.getAffectationsUniteByCycleId(cycleId).subscribe(
      resp => {
        this.affectations = resp;
        this.createForm();
      },
      error => this.showError(error)
    );
  }


  createForm() {
    this.entityForm = this.formGroup.group({
      'affectationsUnite': this.buildFormArrayAffectationUnite(),
    });
  }

  buildFormArrayAffectationUnite(): FormArray {
    const formArray = new FormArray([]);
    if (this.affectations) {
      this.affectations.forEach((affectation: AffectationUnite) => {
        const group = this.formGroup.group({
          'id': [affectation.id, Validators.required],
          'unite': [affectation.unite, Validators.required],
          'enabled': [affectation.enabled, Validators.required]
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
    this.affectationUniteService.updateAffectationsUnite(model.affectationsUnite).subscribe(
      resp => {
        this.submitting = false;
        this.toastyService.success('Enregistrement effectué avec succès');
      },
      error => {
        this.submitting = false;
        this.showError(error);
      }
    );

  }

  showError(error: any): any {
    this.alert.error(error);
  }

}
