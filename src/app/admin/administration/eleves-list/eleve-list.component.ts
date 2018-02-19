import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'app/shared/services/alert.service';
import { EleveService } from 'app/admin/services/eleve.service';
import { Eleve } from 'app/admin/models/eleve.model';
import { ClasseService } from 'app/admin/services/classe.service';

@Component({
  selector: 'app-eleve-list',
  templateUrl: './eleve-list.component.html',
  styleUrls: ['./eleve-list.component.css']
})
export class EleveListComponent implements OnInit {

  constructor(public eleveService:EleveService,
              public classeService:ClasseService,
              private alert: AlertService,
              private router: Router) { }
              
  eleves : Eleve[];
  ngOnInit() {
    this.classeService.getAllEleves(1).subscribe(
      resp => {
        this.eleves = resp
      },
      error => this.alert.error()
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
