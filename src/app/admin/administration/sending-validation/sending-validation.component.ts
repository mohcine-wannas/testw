import {Component, OnInit} from '@angular/core';
import {CommunicationAdministrationService} from "../../services/communication-administration.service";
import {Message} from "../../models/message.model";
import {AffectationCycle} from "../../models/affectation-cycle.model";
import {AffectationCycleService} from "../../services/affectation-cycle.service";
import {GroupeAppellation} from "../../models/groupe-appellation.model";
import {AffectationMessageNiveau} from "../../models/affectation-message-niveau.model";
import {ToastyService} from "ng2-toasty";

@Component({
  selector: 'app-message-list',
  templateUrl: './sending-validation.component.html',
  styleUrls: ['./sending-validation.component.css'],
  // todo: Mohcine
  host: {
    class: 'dox-content-panel',
  }
})
export class SendingValidationComponent implements OnInit {


  constructor(private messageService: CommunicationAdministrationService,
              private affectationCycleService: AffectationCycleService,
              private toastyService: ToastyService) {
  }

  messages: Message[];
  niveauAppellation: any[];

  ngOnInit() {

    this.messageService.getAllMessagesForValidation().subscribe(
      resp => this.messages = resp,
      //error => this.showError(error)
      error => console.log(error) //TODO
    );
    this.affectationCycleService.getCurrentAffectationCycle().subscribe(
      (resp: AffectationCycle) => {
        this.getNiveauAppellationMap(resp.groupeAppellation);
      },
      error => console.log(error));

  }
  getNiveauAppellationMap(groupeAppellation: GroupeAppellation) {
    if (groupeAppellation && groupeAppellation.appellations) {
      this.niveauAppellation = [];
      groupeAppellation.appellations.forEach(e => {
        this.niveauAppellation[e.niveau.id] = e.libelle;
      });
    }
  }

  getNiveauName(affectationNiveau: AffectationMessageNiveau) {
    return this.niveauAppellation[affectationNiveau.niveau.id];
  }

  deleteMessage(id) {
    return this.messageService.delete(id).subscribe(
    () => {
      this.toastyService.success('Operation effectuée avec succès');
      this.messages.splice(this.messages.findIndex(item => item.id === id), 1);
      },
        (error) => console.log(error)
    );
  }

  enableMessage(id) {
    return this.messageService.enable(id).subscribe(
      () => {
        this.toastyService.success('Operation effectuée avec succès');
        this.messages.splice(this.messages.findIndex(item => item.id === id), 1);
      },
      (error) => console.log(error)
    );
  }


  /*
    getNiveauAppellationMap(groupeAppellation: GroupeAppellation) {
      if (groupeAppellation && groupeAppellation.appellations) {
        this.niveauAppellation = [];
        groupeAppellation.appellations.forEach(e => {
          this.niveauAppellation[e.niveau.id] = e.libelle;
        });
      }
    }

    showError(error: any): any {
      this.alert.error(error);
    }

  */
}