import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { AffectationCycle} from 'app/admin/models/affectation-cycle.model';
import { GroupeAppellation} from 'app/admin/models/groupe-appellation.model';
import { AffectationCycleService} from 'app/admin/services/affectation-cycle.service';
import { Message} from "../../admin/models/message.model";
import { AffectationMessageNiveau} from "../../admin/models/affectation-message-niveau.model";

import {CommunicationProfesseurService} from "../shared/services/communication-professeur.service";
import {ToastyService} from "ng2-toasty";
import {TransferService} from "../shared/services/transfer.service";

@Component({
  selector: 'app-prof-message-parent-form',
  templateUrl: './prof-messages.component.html',
  styleUrls: ['./prof-messages.component.css'],
  // todo: Mohcine
  host: {
    class: 'dox-content-panel',
  }
})
export class ProfMessagesComponent implements OnInit {


  messages: Message[];
  messageToShow: Message;

  niveauAppellation: any[];

  opened = false;

  constructor(private messageService: CommunicationProfesseurService,
              private affectationCycleService: AffectationCycleService,
              private toastyService: ToastyService,
              private transferService: TransferService,
              private router: Router) {
  }

  ngOnInit() {

    this.messageService.getAllRecievedMessages().subscribe(
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

  getShortMessage(message: string) {
    const escapedMassage = message.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ');
    const treeDots = escapedMassage.length > 50 ? '...' : '';
    return escapedMassage.substring(0, 50) + treeDots;
  }

  openMessage(message) {
    if (message && !message.seen && message.recipientMessageId) {
      this.messageService.setToSeen(message.recipientMessageId).subscribe(() => {
        message.seen = true;
      });
    }
    this.messageToShow = message;
    this.opened = true;
  }

}
