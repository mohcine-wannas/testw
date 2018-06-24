import {Component, Input, OnInit} from '@angular/core';
import {Unite} from '../../models/unite.model';
import { TreeViewItem, TreeViewItemType} from '../../../prof/prof-message-parent-form/prof-message-parent-form.component';
import {Professeur} from '../../../prof/shared/models/Professeur.model';
import {UniteService} from '../../services/unite.service';

@Component({
  selector: 'app-lazy-loaded-profs',
  template: `
        <ng-container [clrLoading]="loading">
            <clr-tree-node *ngFor="let prof of profs"  [(clrSelected)]="prof.checked">
                {{prof.text}}
            </clr-tree-node>
        </ng-container>
    `
})
export class LazyLoadedProfesseursComponent implements OnInit {
  @Input('unite') unite: Unite;
  @Input('childrenReference') profs: TreeViewItem[] = [];
  loading: boolean;
  private static cacheProfesseurs = new Map<number, Professeur[]>();

  constructor(public uniteService: UniteService) {
    console.log('tozzz');
  }

  ngOnInit() {
    this.loading = true;
    if (this.unite && this.unite.id) {
      if (LazyLoadedProfesseursComponent.cacheProfesseurs.has(this.unite.id)) {
        this.fillProf(LazyLoadedProfesseursComponent.cacheProfesseurs.get(this.unite.id));
        this.loading = false;
      } else {
        this.uniteService.getAllProfesseurs(this.unite.id).subscribe(
          resp => {
            const professeurs = resp as Professeur[];
            LazyLoadedProfesseursComponent.cacheProfesseurs.set(this.unite.id, professeurs);
            this.fillProf(professeurs);
            this.loading = false;
          },
          error => {
            console.log(error);
            this.loading = false;
          }
        );
      }
    } else {
      this.profs = [];
      this.loading = false;
    }
  }


  private fillProf(professeurs: Professeur[]) {
    this.profs.length = 0; // clear all profs
    professeurs.forEach((professeur) => {
      this.profs.push(new TreeViewItem(professeur.lastname + ' ' + professeur.firstname, professeur, TreeViewItemType.PROFESSEUR));
    });
  }


}
