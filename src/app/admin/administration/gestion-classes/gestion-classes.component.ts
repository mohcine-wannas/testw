import { Component, OnInit } from '@angular/core';
import { FormComponent } from 'app/shared/components/form.component';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { UserService } from 'app/admin/services/user.service';

import { User } from 'app/admin/models/User.model';
import { AlertService } from 'app/shared/services/alert.service';
import { Router } from '@angular/router';
import { SessionService } from 'app/core/session/session.service';
import { CycleService } from 'app/admin/services/cycle.service';
import { SessionDataService } from 'app/core/session/session-data.service';
import { AffectationCycle } from 'app/admin/models/affectation-cycle.model';
import { AffectationNiveau } from 'app/admin/models/affectation-niveau.model';
import { GroupeAppellationService } from 'app/admin/services/groupe-appellation.service';
import { AffectationCycleService } from 'app/admin/services/affectation-cycle.service';
import { GroupeAppellation } from 'app/admin/models/groupe-appellation.model';
import { ToastyService } from 'ng2-toasty';
import { ToastService } from 'app/shared/services/toast.service';

@Component({
  selector: 'app-gestion-classes',
  templateUrl: './gestion-classes.component.html',
  styleUrls: ['./gestion-classes.component.css']
})
export class GestionClassesComponent extends FormComponent<AffectationCycle> implements OnInit {
  niveauAppellation: any;
  groupeAppelations: GroupeAppellation[];
  currentCycle: any;
  error:string;

   affectationCycle : AffectationCycle;

  constructor(private fb: FormBuilder,
              private affectationCycleService : AffectationCycleService,
              private cycleService : CycleService,
              private sessionDataService: SessionDataService,
              private toastyService : ToastyService) {
                
    super();
    this.restService = affectationCycleService;
    this.currentCycle = this.sessionDataService.getCurrentCycle();
  }

  ngOnInit() {
    this.affectationCycleService.getCurrentAffectationCycle().subscribe(
      resp => { 
        this.affectationCycle = resp
        this.createForm()
      },
      error => this.showError(error)
    );
    this.cycleService.getAllGroupeAppellation().subscribe(
      resp => { 
        this.groupeAppelations = resp;
        if(!this.groupeAppelations || this.groupeAppelations.length == 0) {
          this.error = "Problème de configuration ! Merci de contacter votre administrateur";
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

    this.entityForm.get("groupeAppellation").valueChanges.subscribe((c ) => {
      if(c && c.appellations) { 
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
    let formArray = new FormArray([]);
    if(this.affectationCycle) {
      this.affectationCycle.affectationNiveaux.forEach((element : AffectationNiveau) => {
        let group= this.fb.group({
          'id': [element.id, Validators.required],
          'nombreDeClasse': [element.nombreDeClasse, this.validateNombreDeClasse],
          'niveau': [element.niveau, Validators.required]});
          formArray.push(group);
        });
    }
    return formArray;
  }

  public submitForm($ev, model: any) {
    this.markAllInputAsTouched();
    if(!this.entityForm.valid) return;
    
    this.submitting = true;
    this.affectationCycleService.save(model).subscribe(
      resp => {
        this.submitting = false;
        this.toastyService.success("Parfait !");
      },
      error => {
        this.submitting = false;
        this.showError(error);
      }
    );
  }
  getNiveauAppellation(element : FormGroup) {
    if(this.niveauAppellation) {
      return this.niveauAppellation[element.get('niveau').value.id]
    }
  }
    validateNombreDeClasse(control: any): { [s: string]: boolean }{
      if(!(control.value || control.value ==0) || control.value < 0) {
         return {
           valid: false
         }
      }
      return null;
    }
  
}


