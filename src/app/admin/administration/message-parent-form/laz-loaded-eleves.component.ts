import {Component, Input, OnInit} from '@angular/core';
import {Classe} from '../../models/groupe-appellation.model.1';
import {ClasseService} from '../../services/classe.service';
import {Eleve} from '../../models/eleve.model';
import {TreeViewItem, TreeViewItemType} from './message-parent-form.component';

@Component({
  selector: 'app-lazy-loaded-students',
  template: `
        <ng-container [clrLoading]="loading">
            <clr-tree-node *ngFor="let student of students"  [(clrSelected)]="student.checked">
                {{student.text}}
            </clr-tree-node>
        </ng-container>
    `
})
export class LazLoadedElevesComponent implements OnInit {
  @Input() classe: Classe;
  @Input('childrenReference') students: TreeViewItem[] = [];
  loading: boolean;

  constructor(public classeService: ClasseService) {
  }

  ngOnInit() {
    this.loading = true;

    if (this.classe && this.classe.id) {
      this.classeService.getAllEleves(this.classe.id).subscribe(
        resp => {
          const eleves = resp as Eleve[];
          this.students.length = 0; // clear all students
          eleves.forEach((eleve) => {
            this.students.push(new TreeViewItem(eleve.lastname + ' ' + eleve.firstname, eleve, TreeViewItemType.ELEVE))
          });
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
    } else {
      this.students = [];
      this.loading = false;
    }
  }
}
