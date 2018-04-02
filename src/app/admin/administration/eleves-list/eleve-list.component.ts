import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AffectationCycle } from 'app/admin/models/affectation-cycle.model';
import { AffectationNiveau } from 'app/admin/models/affectation-niveau.model';
import { Eleve } from 'app/admin/models/eleve.model';
import { GroupeAppellation } from 'app/admin/models/groupe-appellation.model';
import { Classe } from 'app/admin/models/groupe-appellation.model.1';
import { AffectationCycleService } from 'app/admin/services/affectation-cycle.service';
import { ClasseService } from 'app/admin/services/classe.service';
import { EleveService } from 'app/admin/services/eleve.service';
import { AlertService } from 'app/shared/services/alert.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-eleve-list',
  templateUrl: './eleve-list.component.html',
  styleUrls: ['./eleve-list.component.css'],
  // todo: Mohcine
  host: {
    class: 'dox-content-panel',
  }
})
export class EleveListComponent implements OnInit {
  niveauAppellation: any[];
  classe: Classe;
  classes: Classe[];
  error: string;
  @ViewChild('grid') public grid;


  affectationNiveaux: AffectationNiveau[];
  selectedAffectationNiveau: AffectationNiveau = new AffectationNiveau();
  selectedClasse: Classe;

  constructor(public eleveService: EleveService,
              public classeService: ClasseService,
              private alert: AlertService,
              private router: Router,
              private affectationCycleService: AffectationCycleService,
              private toastyService: ToastyService) {
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

  showError(error: any): any {
    this.alert.error(error);
  }

  enableParent(eleve: Eleve) {
    this.eleveService.enableParent(eleve.id, eleve.enabledAffectations).subscribe(
      resp => {
        this.toastyService.success('Operation effectuée avec succès');
        eleve.hasToBeEnabled = false;
      },
      error => this.showError(error)
    );
  }

  // goToForm(id?:number) {
  //   if(!id) {
  //     this.router.navigate(["admin/eleves/add"]);
  //   }else{
  //     this.router.navigate(["admin/eleves/"+id+"/edit"]);
  //   }
  // }

  // delete(id:number) {
  //   if(id) {
  //     this.alert.confirm("Êtes vous sûr de vouloir supprimer ce eleve ?").then((res)=> {
  //       if (res.value) {
  //         this.alert.success("La suppression est effectuée avec succès");
  //         this.eleves = this.eleves.filter(obj => obj.id!=id);
  //       // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
  //       } else if (res.dismiss === 'cancel') {
  //       }
  //     },
  //         error => this.alert.error()
  //     );
  //   }
  // }

}
