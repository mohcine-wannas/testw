import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'app/core/session/session.service';
import { SessionDataService } from 'app/core/session/session-data.service';
import { Cycle } from 'app/admin/models/cycle.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  fullname: string;
  collapsible: boolean = true;
  collapsed: boolean = true;
  cycles : Cycle[] = [];
  currentCycle : Cycle  = new Cycle();

  constructor(private sessionService:SessionService,
              private sessionDataService:SessionDataService,
              private router :Router) {
                 
    this.fullname = sessionDataService.getSchoolName();
    this.cycles = sessionDataService.schoolDetails.cycles;

  }

  logout() {
    this.sessionService.logout(true);
  }

  goToProfile() {
    this.router.navigate(["admin/profile"]);
  }

  ngOnInit() {
  }

  currentCycleChanged(cycle:Cycle) {
    this.currentCycle = cycle;
    this.sessionDataService.schoolDetails.currentCycle = this.currentCycle.id;
  }

  getCurrentCycleLibelle() {
    this.cycles.forEach(e=>{
      if(e.id === Number(this.sessionDataService.schoolDetails.currentCycle)) {
        this.currentCycle = e;
      }
    });
    return this.currentCycle.libelle;
  }

  getSchoolName() {
    return this.sessionDataService.getSchoolName();
  }

  getCurrentAnneScolaire() {
    return this.sessionDataService.getCurrentAnneScolaire();
  }

}
