import { Component, OnInit } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { FormComponent } from 'app/shared/components/form.component';
import { Ville } from 'app/shared/models/ville.model';
import { School } from 'app/admin/models/school.model';
import { Pays } from 'app/shared/models/PAys.model';
import { SessionDataService } from 'app/core/session/session-data.service';
import { RestService } from 'app/shared/services/rest.service';
import { Cycle } from 'app/admin/models/cycle.model';
import { BaseModel } from 'app/shared/models/base-model.model';
import { SchoolService } from 'app/admin/services/school.service';
import { CycleService } from 'app/admin/services/cycle.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './school-info.component.html',
  styleUrls: ['./school-info.component.css']
})
export class SchoolInfoComponent extends FormComponent<School> implements OnInit {
  private savedSchool: School;
  private savedCycles: Cycle[];
  private  cycles: Cycle[];
  private errorCycles: boolean = false;

  constructor(private fb: FormBuilder,
              private sessionData: SessionDataService,
              private cycleService : CycleService,
              private schoolService : SchoolService) {

    super();
    this.restService = schoolService;
  }

  ngOnInit() {
    let school = this.sessionData.getCurrentSchool();
    this.getAllCycles();
    this.id = school.id;
    this.modeEdit = true;
    this.createForm(school);
  }

  createForm(school?: School) {
    if (!school) {
      school = new School();
    }
    this.entityForm = this.fb.group({
      'id': [{ value: school.id, disabled: true }],
      'nom': [{ value: school.nom, disabled: true }, Validators.required],
      'adresse': [{ value: school.adresse, disabled: true }],
      'code': [{ value: school.code, disabled: true }, Validators.required],
      'ville': [{ value: school.ville, disabled: true }, Validators.required],
      'codeMassar': [{ value: school.codeMassar, disabled: true }, Validators.required],
      'pays': [{ value: school.pays, disabled: true }],
      'tel': [school.tel, Validators.required],
      'email': [school.email, Validators.required],
      'tel2': [school.tel2],
      'siteWeb': [school.siteWeb],
      'villeName': [{ value: school.ville.libelle + ', ' + school.pays.name, disabled: true }, Validators.required],
      'cycles' : new FormArray([]),
    });
  }

  public submitForm($ev, model: any) {
    this.errorCycles = false;
    let selectedCycles : Cycle[] = [];
    model.cycles.forEach(element => {
      if(element.selected) {
        selectedCycles.push(element.item);
      }
    });
    if(selectedCycles.length == 0) {
      this.errorCycles = true;
      return;
    }
    this.savedSchool = new School(model);
    this.savedCycles = selectedCycles;
    (this.savedSchool as any).cycles = selectedCycles;
    this.submit($ev,this.savedSchool,this.updateSessioData.bind(this));
  }

  public updateSessioData(id:string) {
    this.sessionData.updateSchool(this.savedSchool);
    this.sessionData.schoolDetails.cycles = this.savedCycles;  
    let currentCycleId= this.sessionData.schoolDetails.currentCycle;
    let found = false;
    this.sessionData.schoolDetails.cycles.forEach(element => {
      if(element.id === currentCycleId) {
        found = true;
      }
    });
    if(!found) {
      currentCycleId = undefined;
      if(this.savedCycles[this.savedCycles.length -1]) {
        currentCycleId = this.savedCycles[this.savedCycles.length -1].id;
      }
      this.sessionData.schoolDetails.currentCycle = currentCycleId;
    }
  }
  
  setCyclesFormArray(): any {
    let array = [];
    let currentCycles = this.sessionData.getCycles();
    if(this.cycles) {
      this.cycles.forEach(element => {
        let selectItem: SelectItem<Cycle> = new SelectItem<Cycle>();
        selectItem.item = element;
        selectItem.selected = false;
  
        currentCycles.forEach(affectedCycle => {
          if(affectedCycle.id === element.id)  {
            selectItem.selected = true;
          }
        });
        array.push( this.fb.group(selectItem));
      });
    }
    this.entityForm.setControl('cycles', this.fb.array(array));
  }

  private getAllCycles() {
    this.cycleService.getAll().subscribe(
      resp => {
        this.cycles = resp,
        this.setCyclesFormArray();
      },
      error => console.log(error) //TODO error
    );
  }


  
 

}
class SelectItem<T extends BaseModel> {
  selected :boolean;
  item : T;
}