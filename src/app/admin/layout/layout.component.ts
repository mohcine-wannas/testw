import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'app/core/session/session.service';
import { SessionDataService } from 'app/core/session/session-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  fullname: string;
  collapsible: boolean = true;
  collapsed: boolean = true;

  constructor(private sessionService:SessionService,
              private sessionDataService:SessionDataService) {
                
    this.fullname = sessionDataService.getName();
  }

  logout() {
    this.sessionService.logout(true);
  }

  ngOnInit() {
  }

}
