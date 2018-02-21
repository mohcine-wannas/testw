import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'app/shared/services/alert.service';
import { EleveService } from 'app/admin/services/eleve.service';
import { Eleve } from 'app/admin/models/eleve.model';
import { ClasseService } from 'app/admin/services/classe.service';
import { AffectationCycle } from 'app/admin/models/affectation-cycle.model';
import { AffectationCycleService } from 'app/admin/services/affectation-cycle.service';
import { AffectationNiveau } from 'app/admin/models/affectation-niveau.model';
import { Classe } from 'app/admin/models/groupe-appellation.model.1';
import { GroupeAppellation } from 'app/admin/models/groupe-appellation.model';

@Component({
  selector: 'app-eleve-list',
  templateUrl: './eleve-list.component.html',
  styleUrls: ['./eleve-list.component.css'],
    host: {
      class:'dox-content-panel'
  }
})
export class EleveListComponent implements OnInit {
  niveauAppellation: any[];
  classe: Classe;
  classes: Classe[];

  affectationNiveaux: AffectationNiveau[];
  selectedAffectationNiveau: AffectationNiveau = new AffectationNiveau();
  selectedClasse: Classe;

  constructor(public eleveService:EleveService,
              public classeService:ClasseService,
              private alert: AlertService,
              private router: Router,
              private affectationCycleService : AffectationCycleService) { }
              
  eleves : Eleve[];
  ngOnInit() {

    this.affectationCycleService.getCurrentAffectationCycle().subscribe(
      (resp : AffectationCycle) => { 
        this.affectationNiveaux = resp.affectationNiveaux;
        this.getNiveauAppellationMap(resp.groupeAppellation);
        if(this.affectationNiveaux && this.affectationNiveaux.length >0 ) {
          this.selectedAffectationNiveau = this.affectationNiveaux[0];
          this.classes = this.selectedAffectationNiveau.classes;
          if(this.classes && this.classes.length >0) {
            this.selectedClasse = this.classes[0];
          }
          this.refresh();
        }
      },
      error => this.showError(error)
    );
  }
  getNiveauAppellationMap(groupeAppellation : GroupeAppellation) {
    if(groupeAppellation && groupeAppellation.appellations) { 
      this.niveauAppellation = [];
      groupeAppellation.appellations.forEach(e => {
        this.niveauAppellation[e.niveau.id] = e.libelle;
      });
    }
  }
  refresh() {
    if(this.selectedClasse && this.selectedClasse.id) {
      this.classeService.getAllEleves(this.selectedClasse.id).subscribe(
        resp =>  this.eleves = resp,
        error => this.showError(error)
      );
    }
  }
  refreshClasses() {
    if(this.selectedAffectationNiveau ) {
      this.classes = this.selectedAffectationNiveau.classes;
      if(this.classes && this.classes.length >0) {
        this.selectedClasse = this.classes[0];
      }
      this.refresh();
    }
  }

  showError(error: any): any {
    this.alert.error(error);
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
